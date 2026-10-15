// Autenticação com o WakaTime por token OAuth.
// As variáveis NÃO levam VITE_: ficam só no servidor.
// O "_" no início do nome impede a Vercel de transformar o arquivo em rota.

export const WAKATIME_API = "https://wakatime.com/api/v1";
const OAUTH_TOKEN_URL = "https://wakatime.com/oauth/token";
const REFRESH_TIMEOUT_MS = 8_000;

const clean = (value) => String(value ?? "").trim();

// Token renovado nesta instância da função (null = usar o do env)
let renewedToken = null;
let renewing = null;

export const hasAccessToken = (env) => Boolean(clean(env.WAKATIME_ACCESS_TOKEN));

const currentToken = (env) => renewedToken ?? clean(env.WAKATIME_ACCESS_TOKEN);

const canRenew = (env) =>
    Boolean(
        clean(env.WAKATIME_APP_ID) &&
        clean(env.WAKATIME_APP_SECRET) &&
        clean(env.WAKATIME_REFRESH_TOKEN)
    );

// O WakaTime pode responder em JSON ou em form-urlencoded
function parseTokenResponse(text) {
    try {
        return JSON.parse(text);
    } catch {
        return Object.fromEntries(new URLSearchParams(text));
    }
    }

// Vários pedidos com 401 ao mesmo tempo: uma renovação só
function renewToken(env) {
    if (!renewing) {
        renewing = (async () => {
        const response = await fetch(OAUTH_TOKEN_URL, {
            method: "POST",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            },
            body: new URLSearchParams({
            client_id: clean(env.WAKATIME_APP_ID),
            client_secret: clean(env.WAKATIME_APP_SECRET),
            grant_type: "refresh_token",
            refresh_token: clean(env.WAKATIME_REFRESH_TOKEN),
            }),
            signal: AbortSignal.timeout(REFRESH_TIMEOUT_MS),
        });
        const text = await response.text();
        if (!response.ok) throw new Error(`WakaTime OAuth HTTP ${response.status} ao renovar o token`);

        const data = parseTokenResponse(text);
        if (!data.access_token) throw new Error("WakaTime OAuth: resposta sem access_token");

        renewedToken = data.access_token;
        console.warn("WakaTime: token OAuth renovado. Rode npm run wakatime:oauth para atualizar o .env e a Vercel.");
        })().finally(() => {
        renewing = null;
        });
    }
    return renewing;
}

// GET na API do WakaTime. Devolve o Response.
//   auth: true  → manda o token (dados da própria conta)
//   auth: false → sem autenticação (perfil público)
export async function fetchWakaTime(path, env, { auth = true, timeout = 10_000 } = {}) {
    const request = () => {
        const headers = { Accept: "application/json" };
        if (auth) headers.Authorization = `Bearer ${currentToken(env)}`;
        return fetch(`${WAKATIME_API}${path}`, { headers, signal: AbortSignal.timeout(timeout) });
    };

    const response = await request();

  // Token expirado ou revogado: renova uma vez e tenta de novo
    if (auth && response.status === 401 && canRenew(env)) {
        try {
        await renewToken(env);
        } catch (error) {
        console.error("WakaTime:", error?.message ?? error);
        return response;
        }
        return request();
    }

    return response;
}