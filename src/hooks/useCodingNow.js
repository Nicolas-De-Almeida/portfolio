import { useEffect, useState } from "react";

const REFRESH_MS = 60_000;

// Se a rota falhar (sem token, sem permissão...), o selo simplesmente some
export function useCodingNow() {
    const [state, setState] = useState({ status: "loading", data: null });

    useEffect(() => {
        let cancelled = false;
        let timer;

        async function load() {
        try {
            const response = await fetch("/api/codando");
            if (!response.ok) throw new Error(String(response.status));
            const data = await response.json();
            if (cancelled) return;
            setState({ status: "ready", data });
            timer = setTimeout(load, REFRESH_MS);
        } catch {
            if (!cancelled) setState({ status: "hidden", data: null });
        }
        }

        load();
        return () => {
        cancelled = true;
        clearTimeout(timer);
        };
    }, []);

    return state;
}