// Busca as estatísticas do WakaTime no SERVIDOR (o token não vai para o navegador).
// Rota: GET /api/wakatime?range=last_7_days

import { fetchWakaTime, hasAccessToken } from "./_oauth.js";

export const WAKATIME_PATH = "/api/wakatime";

// Períodos aceitos (o navegador só pode pedir um destes)
export const RANGES = ["last_7_days", "last_30_days", "last_6_months", "last_year", "all_time"];

// Menos de 1 minuto não aparece na tela
const MIN_SECONDS = 60;

function send(res, status, body, cache = "no-store") {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", cache);
    res.end(JSON.stringify(body));
}

const sendError = (res, status, error, message) => send(res, status, { error, message });

const toItems = (list = [], limit = 20) =>
    list
        .filter((item) => item.total_seconds >= MIN_SECONDS)
        .slice(0, limit)
        .map(({ name, total_seconds, percent }) => ({
        name,
        seconds: Math.round(total_seconds),
        percent,
        }));

// Devolve só o que a tela usa.
// ⚠️ Não inclui a lista de projetos, de propósito (poderia vazar nomes privados).
function normalize(data, today, mode) {
    return {
        mode,
        username: data.username ?? null,
        range: data.range,
        humanRange: data.human_readable_range ?? null,
        start: data.start ?? null,
        totalSeconds: Math.round(
        data.total_seconds_including_other_language ?? data.total_seconds ?? 0
        ),
        dailyAverage: Math.round(
        data.daily_average_including_other_language ?? data.daily_average ?? 0
        ),
        activeDays: data.days_minus_holidays ?? null,
        bestDay: data.best_day?.date
        ? { date: data.best_day.date, seconds: Math.round(data.best_day.total_seconds) }
        : null,
        languages: toItems(data.languages),
        editors: toItems(data.editors, 6),
        operatingSystems: toItems(data.operating_systems, 5),
        categories: toItems(data.categories, 6),
        today,
    };
}

// "Hoje" só existe com o token
async function fetchToday(env) {
    try {
        const response = await fetchWakaTime("/users/current/status_bar/today", env);
        if (!response.ok) return null;
        const { data } = await response.json();
        const seconds = data?.grand_total?.total_seconds;
        return typeof seconds === "number" ? { seconds: Math.round(seconds) } : null;
    } catch {
        return null;
    }
}

export async function handleWakaTime(req, res, env = {}) {
    if (req.method !== "GET") {
        res.setHeader("Allow", "GET");
        return sendError(res, 405, "method_not_allowed", "Use GET.");
    }

    const url = new URL(req.url, "http://localhost");
    const askedRange = url.searchParams.get("range");
    const range = RANGES.includes(askedRange) ? askedRange : "last_7_days";

    const hasToken = hasAccessToken(env);
    const username = String(env.WAKATIME_USERNAME ?? "").trim();

    if (!hasToken && !username) {
        return sendError(res, 503, "missing_config", "Configure WAKATIME_ACCESS_TOKEN no .env ou na Vercel.");
    }

    const mode = hasToken ? "oauth" : "public";
    const user = hasToken ? "current" : encodeURIComponent(username);

    try {
        const [response, today] = await Promise.all([
        fetchWakaTime(`/users/${user}/stats/${range}`, env, { auth: hasToken }),
        hasToken ? fetchToday(env) : Promise.resolve(null),
        ]);

        // 202: o WakaTime ainda está calculando
        if (response.status === 202) {
        return sendError(res, 202, "pending", "O WakaTime ainda está calculando as estatísticas.");
        }
        if (response.status === 401) {
        return sendError(res, 401, "invalid_token", "Token OAuth do WakaTime inválido ou revogado.");
        }
        if (response.status === 402 || response.status === 403) {
        return sendError(
            res,
            403,
            "forbidden",
            mode === "public"
            ? "Perfil privado: deixe as estatísticas públicas no WakaTime ou use o token."
            : "Sem permissão: o token precisa do escopo read_stats (ou o período não está disponível na sua conta)."
        );
        }
        if (response.status === 404) {
        return sendError(res, 404, "not_found", "Usuário do WakaTime não encontrado.");
        }
        if (!response.ok) {
        return sendError(res, 502, "upstream_error", `WakaTime respondeu HTTP ${response.status}.`);
        }

        const { data } = await response.json();
        if (data?.status === "pending_update" || !Array.isArray(data?.languages)) {
        return sendError(res, 202, "pending", "O WakaTime ainda está calculando as estatísticas.");
        }

        // 10 min no cache da CDN da Vercel
        return send(
        res,
        200,
        normalize(data, today, mode),
        "public, max-age=0, s-maxage=600, stale-while-revalidate=3600"
        );
    } catch (error) {
        console.error("WakaTime:", error?.message ?? error);
        return sendError(res, 504, "timeout", "Não foi possível falar com o WakaTime agora.");
    }
}