
// Monta o caminho completo para as imagens
const projectImages = (folder, files) =>
    files.map((file) => `/imgProjects/${folder}/${file}`);

// Lista de Projetos
const projectList = [
    {
    id: "EarthFirst",
    year: 2026,
    technologies: ["HTML", "CSS", "JavaScript", "JSON Server"],
    github: "https://github.com/Nicolas-De-Almeida/EarthFirst-DIW.git",
    images: projectImages("EarthFirst", ["01.webp", "02.webp", "03.webp", "04.webp", "05.webp"]),
    pt: {
        type: "Projeto acadêmico",
        name: "EarthFirst",
        description: "O objetivo foi criar um site informativo e educativo sobre o meio ambiente, oferecendo um espaço onde as pessoas pudessem conhecer melhor as ONGs existentes e onde as próprias instituições pudessem entrar em contato e se unir para realizar mais trabalhos em conjunto.",
        tagline: "O começo foi aqui.",
    },
    en: {
        type: "Academic project",
        name: "EarthFirst",
        description: "The goal was to create an informative and educational website about the environment, providing a space where people could learn more about existing NGOs and where the organizations themselves could connect and collaborate on joint initiatives.",
        tagline: "It all started here.",
    },
    },


    {
    id: "FlappyBird",
    year: 2026,
    technologies: ["Python", "Pygame"],
    github: "https://github.com/LukasGom3s/FlappyBird-PyGame.git",
    images: projectImages("FlappyBird", ["01.webp", "02.webp", "03.webp"]), 
    pt: {
        type: "Projeto acadêmico",
        name: "FlappyBird",
        description: "Trata-se de um jogo 2D de desviar de obstáculos com progressão lateral contínua. O cenário se move constantemente da direita para a esquerda, criando a ilusão de que o personagem principal está voando para a frente. O jogador precisa desviar de obstáculos posicionados a frente dele, cuja velocidade aumenta com o tempo.",
        tagline: "Aprendendo na prática.",
    },
    en: {
        type: "Academic project",
        name: "FlappyBird",
        description: "Trata-se de um jogo 2D de desvio de obstáculos com progressão lateral contínua. O cenário se move constantemente da direita para a esquerda, criando a ilusão de que o personagem principal está voando para a frente. O jogador precisa desviar dos obstáculos à sua frente, cuja velocidade aumenta com o tempo.",
        tagline: "Learning by doing.",
    },
    },


    {
    id: "Acessi+",
    year: 2026,
    technologies: ["HTML", "CSS", "JavaScript", "BootStrap", "JSON Server", ],
    github: "https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-1-ti1-0438200-g4-1",
    images: projectImages("Acessi-plus", ["01.webp", "02.webp", "03.webp", "04.webp", "05.webp"]),
    pt: {
        type: "Projeto acadêmico",
        name: "Acessi+",
        description: "Uma plataforma web que permite aos cidadãos registrar, acompanhar e organizar denúncias relacionadas à acessibilidade urbana, contribuindo para uma comunicação mais eficiente entre a população e os responsáveis pela manutenção dos espaços públicos.",
        tagline: "Por mais acessibilidade",
    },
    en: {
        type: "Academic project",
        name: "Acessi+",
        description: "A web platform that allows citizens to submit, track, and organize reports related to urban accessibility, helping improve communication between the public and those responsible for maintaining public spaces.",
        tagline: "Towards greater accessibility",
    },
    },


    {
    id: "PUC Hospital",
    year: 2026,
    technologies: ["Java", "HTML", "CSS", "JavaScript", "Tailwind", "React", "Spring Boot"],
    github: "https://github.com/Nicolas-De-Almeida/sistema-hospitalar.git",
    images: projectImages("PUCHospital", ["01.webp", "02.webp", "03.webp", "04.webp", "05.webp", "06.webp",]),
    pt: {
        type: "Projeto acadêmico",
        name: "PUC Hospital",
        description: "Um Sistema de Informação Hospitalar para gerenciar as operações, centralizando as informações de pacientes, profissionais da saúde, consultas, internações e quartos.",
        tagline: "Feito para ajudar pessoas.",
    },
    en: {
        type: "Academic project",
        name: "PUC Hospital",
        description: "A Hospital Information System to manage operations by centralizing information about patients, healthcare professionals, appointments, hospital admissions, and rooms.",
        tagline: "Built to help people.",
    },
    },


    {
    id: "GeoSolar",
    year: 2026,
    technologies: ["HTML", "CSS", "React"],
    github: "https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-2-ti2-8243100-mentalist.git",
    images: projectImages("GeoSolar", ["01.webp"]),
    pt: {
        type: "Projeto acadêmico",
        name: "GeoSolar",
        description: "O GeoSolar é um projeto de plataforma desenvolvido para facilitar a transição energética, conectando usuários interessados em energia solar a empresas prestadoras de serviços de forma rápida e intuitiva.",
        tagline: "Energia limpa, conexões inteligentes.",
    },
    en: {
        type: "Academic project",
        name: "Project 3 Name",
        description: "GeoSolar is a platform project designed to facilitate the transition to renewable energy by quickly and intuitively connecting users interested in solar energy with service providers.",
        tagline: "Clean Energy, Smart Connections.",
    },
    },


    /*
    {
    id: "",
    year: ,
    technologies: [],
    github: "",
    images: [],
    pt: {
        type: "",
        name: "",
        description: "",
        tagline: "",
    },
    en: {
        type: "",
        name: ",
        description: "",
        tagline: "",
    },
    },
    */
];

// Garante a ordem do mais antigo ao mais recente
export const projects = [...projectList].sort((a, b) => a.year - b.year);

export const githubProfile = "https://github.com/Nicolas-De-Almeida";

export const projectsContent = {
    pt: {
        label: "02 / MEUS PROJETOS",
        title: "Alguns Bugs, Vários Aprendizados.",
        subtitle: "Do primeiro experimento ao mais recente, cada projeto me ensinou algo novo — e me tirou horas de sono.",
        githubButton: "Explorar o GitHub",
        imagePlaceholder: "Imagem do projeto em breve",
        nextProject: "Mostrar próximo projeto",
        hint: "Sempre tem mais um",
        moreOnGithub: "Se tiver interesse, tenho outros programas meio sem sentido no meu GitHub.",
        previousImage: "Imagem anterior",
        nextImage: "Próxima imagem",
    },
    en: {
        label: "02 / MY PROJECTS",
        title: "A Few Bugs, Plenty of Lessons.",
        subtitle: "From my first experiment to my latest release, every project has taught me something new — and cost me hours of sleep.",
        githubButton: "Explore GitHub",
        imagePlaceholder: "Project image coming soon",
        nextProject: "Show next project",
        hint: "There's always one more",
        moreOnGithub:"If you’re interested, I have other somewhat pointless programs on my GitHub.",
        previousImage: "Previous image",
        nextImage: "Next image",
    },
};