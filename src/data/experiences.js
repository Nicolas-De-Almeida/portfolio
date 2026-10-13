const experienceList = [
    { // null = experiência atual
        id: "We Make Software",
        start: "2026-09",
        end: "2026-09",
        tags: ["PUC Minas", "Networking", "Teamwork"],

        pt: {
        type: "Voluntário",
        company: "PUC Minas",
        role: "Bastidores",
        place: "Presencial · Belo Horizonte, MG",
        description: "Fiquei responsável por manter a organização do palco e dos convidados.",
        },

        en: {
        type: "Volunteer",
        company: "PUC Minas",
        role: "Backstage",
        place: "On-site · Belo Horizonte, Brazil",
        description: "I was responsible for helping coordinating the stage and managing the guests.",
        },
    },

    /*
    {
        id: "",
        start: "",
        end: "",
        tags: [""],

        pt: {
        type: "",
        company: "",
        role: "",
        place: "",
        description:"",
        },

        en: {
        type: "",
        company: "",
        role: "",
        place: "",
        description:"",
        },
    },
    */

];

    // Mais recente primeiro; em caso de empate, a experiência atual vem antes
    export const experiences = [...experienceList].sort(
    (a, b) =>
        b.start.localeCompare(a.start) ||
        (b.end === null) - (a.end === null)
    );

    export const experiencesContent = {
    pt: {
        label: "03 / EXPERIÊNCIAS",
        title: "Um Pouco de Tudo, Sempre Aprendendo.",
        subtitle: "Nem sempre seguindo um plano, mas sempre levando algo comigo (meu notebook).",
        present: "Atual",
        closingTitle: "O código é meu, o bug é de Todos.",
        closingText: "Escrevo código, faço perguntas, resolvo problemas e, ocasionalmente, crio outros sem querer.",
    },
    en: {
        label: "03 / EXPERIENCE",
        title: "A Bit of Everything, Always Learning.",
        subtitle: "Not always following a plan, but always taking something with me (my laptop).",
        present: "Present",
        closingTitle: "The code is mine, the bug belongs to Everyone.",
        closingText: "I write code, ask questions, solve problems, and occasionally create a few of them by accident.",
    },
};