const email = import.meta.env.VITE_CONTACT_EMAIL;

export const directEmail = email;

export const contactLinks = [
    {
        id: "email",
        href: `mailto:${email}`,
        external: false,
        label: { pt: "E-mail", en: "Email" },
    },

    {
        id: "linkedin",
        href: "https://www.linkedin.com/in/nicolasdealmeida",
        external: true,
        label: { pt: "LinkedIn", en: "LinkedIn" },
    },
        {
        id: "github",
        href: "https://github.com/Nicolas-De-Almeida",
        external: true,
        label: { pt: "GitHub", en: "GitHub" },
    },

        /*
        {
        id: "",
        href: "",
        external: false,
        label: { pt: "", en: "" },
    },
    */
];


export const contactContent = {
    pt: {
        label: "04 / CONTATO",
        title: "Ideias, Oportunidades e Boas Conversas.",
        subtitle: "Tem uma ideia, uma oportunidade ou encontrou um bug interessante?",
        status: "Aberto a projetos e novas oportunidades",
        replyTime: "Não costumo demorar mais de 2 dias para responder.",
        formTitle: "Vamos conversar",
        nameLabel: "Seu nome",
        namePlaceholder: "Como devo te chamar?",
        nameError: "Digite seu nome (mínimo 2 letras).",
        emailLabel: "Seu e-mail",
        emailPlaceholder: "voce@exemplo.com",
        emailError: "Digite um e-mail válido.",
        messageLabel: "Sua mensagem",
        messagePlaceholder: "Uma ideia, um projeto ou só um olá...",
        messageError: "Escreva uma mensagem (mínimo 10 caracteres).",
        send: "Enviar mensagem",
        sending: "Enviando...",
        success: "Mensagem enviada! Obrigado, respondo em breve.",
        error: "Não foi possível enviar agora. Tente de novo ou use o e-mail ao lado.",
        privacy: "Só entre nós. Seus dados não são compartilhados.",
    },
    
    en: {
        label: "04 / CONTACT",
        title: "Ideas, Opportunities, and Good Conversations.",
        subtitle: "Got an idea, an opportunity, or found an interesting bug?",
        status: "Open to projects and new opportunities",
        replyTime: "I usually reply within 2 days at most.",
        formTitle: "Let's talk",
        nameLabel: "Your name",
        namePlaceholder: "How should I call you?",
        nameError: "Enter your name (at least 2 letters).",
        emailLabel: "Email address",
        emailPlaceholder: "you@example.com",
        emailError: "Enter a valid email address.",
        messageLabel: "Your message",
        messagePlaceholder: "An idea, a project, or just a hello...",
        messageError: "Write a message (at least 10 characters).",
        send: "Send message",
        sending: "Sending...",
        success: "Message sent! Thank you, I'll reply soon.",
        error: "Couldn't send right now. Try again or use the email on the left.",
        privacy: "Just between us. Your details are never shared.",
    },
};