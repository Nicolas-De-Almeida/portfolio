const WAKATIME_CONFIG = {
    CODING_NOW: {
        API_PATH: "/api/codando",
        TIMEZONE: "America/Sao_Paulo",
        ACTIVE_MINUTES: 5, // "codando agora" se o último sinal tem até 5 min
        BREAK_MINUTES: 15, // pausa maior que isso encerra a sessão
        // ⚠️ Só estes nomes de projeto aparecem no site.
        // O nome é o da pasta aberta no editor (aqui, "portfolio").
        PUBLIC_PROJECTS: ["portfolio"],
        SHOW_PRIVATE: true, // true: projeto privado aparece como "projeto privado"
    },
};

export default WAKATIME_CONFIG;