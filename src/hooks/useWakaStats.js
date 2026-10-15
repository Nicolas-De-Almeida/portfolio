import { useEffect, useState } from "react";

const cache = new Map(); // período -> dados (só respostas com sucesso)
const RETRY_MS = 3000;
const MAX_TRIES = 4;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function loadStats(range, signal) {
    for (let attempt = 0; attempt < MAX_TRIES; attempt += 1) {
        const response = await fetch(`/api/wakatime?range=${range}`, { signal });
        const body = await response.json().catch(() => ({}));

        // 202: o WakaTime ainda está calculando, tenta de novo
        if (response.status === 202) {
        await wait(RETRY_MS);
        continue;
        }
        if (!response.ok) return { status: "error", code: body.error ?? "unknown" };
        return { status: "ready", data: body };
    }
    return { status: "error", code: "pending" };
}

export function useWakaStats(range) {
    const [results, setResults] = useState({});
    const result = cache.has(range)
        ? { status: "ready", data: cache.get(range) }
        : (results[range] ?? { status: "loading" });

    useEffect(() => {
        if (cache.has(range)) return undefined;

        const controller = new AbortController();
        loadStats(range, controller.signal)
        .then((outcome) => {
            if (outcome.status === "ready") cache.set(range, outcome.data);
            setResults((current) => ({ ...current, [range]: outcome }));
        })
        .catch(() => {
            if (controller.signal.aborted) return;
            setResults((current) => ({ ...current, [range]: { status: "error", code: "network" } }));
        });

        return () => controller.abort();
    }, [range]);

    return result;
}