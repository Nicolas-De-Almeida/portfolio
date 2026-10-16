<div align="center">

# 🌌 Portfólio Profissional

**Nícolas De Almeida**

Portfólio em página única com tema cósmico, disponível em português e inglês. Espero que você goste! 😁

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/Licença-MIT-green)

🌐 **[Acessar o portfólio](https://www.nicolasdealmeida.dev)**

</div>

---

## 📚 Índice

- [Sobre o Portfólio](#-sobre-o-portfólio)
- [Funcionalidades](#-funcionalidades)
- [Design e Protótipos](#-design-e-protótipos)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura e Decisões](#-arquitetura-e-decisões)
- [Instalação e Execução](#-instalação-e-execução)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Deploy](#-deploy)
- [Agradecimentos](#-agradecimentos)
- [Autor](#-autor)
- [Licença](#-licença)

---

## 📝 Sobre o Portfólio

Este site reúne minha trajetória, habilidades, projetos e formas de contato de maneira moderna, responsiva e acessível.

A identidade visual é escura e inspirada em constelações e órbitas: estrelas brilham ao fundo, os cards flutuam suavemente e a linha do tempo de projetos funciona como uma constelação que se revela aos poucos.

---

## ✨ Funcionalidades

- 🧭 **Navegação em página única:** menu fixo com rolagem suave e destaque automático da seção que está na tela.
- 🌐 **Português e inglês:** o botão PT | EN traduz o menu, todas as seções e o rodapé, e atualiza o idioma do documento (`lang`).
- 👤 **Sobre Mim:** apresentação, tecnologias que domino, formação, interesses e o que estou aprendendo.
- 📊 **Tempo de código (WakaTime):** card com as linguagens mais usadas nos últimos 7 dias e um modal com detalhes (total, média diária, melhor dia, editores, atividades, sistemas e períodos de até 1 ano), além do selo "Codando agora".
- 🗂️ **Projetos:** linha do tempo do mais antigo ao mais recente. Começa com um projeto, e uma estrela clicável revela o próximo. Cada projeto tem descrição, tecnologias, link do GitHub e um carrossel de imagens com troca automática a cada 5 segundos, setas e indicadores.
- 💼 **Experiências:** cards em "escada" com empresa, cargo, período (mês e ano) e descrição.
- ✉️ **Contato:** ícones clicáveis (e-mail, LinkedIn, GitHub) e formulário com validação, proteção contra robôs e envio por e-mail via EmailJS, com resposta automática ao visitante.
- ✨ **Animações:** estrelas de fundo que brilham (com clarões ocasionais) e cards com leve balanço, respeitando a preferência de movimento reduzido do sistema.
- 📱 **Design responsivo** para desktop, tablet e celular.

---

## 🎨 Design e Protótipos

O projeto começou com wireframes de média fidelidade no Figma. O site é uma **página única**, e cada wireframe representa uma seção.

### Sobre Mim
![Wireframe - Sobre Mim](docs/wireframes/sobre-mim-wireframe.webp)

### Projetos
![Wireframe - Projetos](docs/wireframes/meus-projetos-wireframe.webp)

### Experiências
![Wireframe - Experiências](docs/wireframes/minhas-experiencias-wireframe.webp)

### Contato
![Wireframe - Contato](docs/wireframes/contato-wireframe.webp)

---

## 🛠 Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| **React** | Construção da interface em componentes |
| **Vite** | Build e servidor de desenvolvimento |
| **Tailwind CSS** | Estilização utilitária e responsividade |
| **Framer Motion** | Animações (estrela, entrada de cards, menu, balanço) |
| **React Icons** | Ícones de redes e de interface |
| **EmailJS** (`@emailjs/browser`) | Envio de e-mail direto do front-end |
| **Vercel Functions** (Node.js) | Rotas de servidor que consultam a API do WakaTime sem expor o token |
| **API do WakaTime** (OAuth) | Estatísticas de tempo de código |
| **ESLint** | Padronização e verificação do código |
| **Figma** | Wireframes e protótipos |
| **Git e GitHub** | Versionamento |
| **Vercel** | Hospedagem |

As versões exatas de todas as dependências estão no arquivo [`package.json`](./package.json).

---

## 🧩 Arquitetura e Decisões

- **Página única (SPA):** todas as seções ficam na mesma página, com menu por âncoras. O destaque do item ativo usa `IntersectionObserver`.
- **Conteúdo separado da interface:** os textos ficam em `src/data/`, com versões `pt` e `en`. Os componentes só exibem esses dados, então adicionar um projeto ou uma experiência é incluir um objeto no arquivo, sem mexer no JSX.
- **Idioma compartilhado:** o estado do idioma vive no `App` e é repassado por props ao menu, às seções e ao rodapé.
- **E-mail sem back-end próprio:** o formulário usa o **EmailJS**, serviço externo que cumpre o papel do back-end. As chaves dele são públicas por natureza, e a proteção vem da restrição de domínios no painel do serviço, do limite de envios, da validação dos campos e de um campo-armadilha (*honeypot*) contra robôs.
- **Back-end leve para o WakaTime:** os dados de código são privados e exigem um token. Por isso a leitura é feita por **funções de servidor** (`api/`), executadas como Vercel Functions em produção e por um plugin do Vite em desenvolvimento. O token OAuth fica só no servidor e nunca chega ao navegador.
- **Privacidade nas rotas do WakaTime:**
  - a resposta contém só o que a tela usa (a lista de projetos e os caminhos de arquivo não saem do servidor);
  - o "Codando agora" só mostra o nome de projetos de uma lista permitida (`PUBLIC_PROJECTS`); os demais aparecem como "projeto privado";
  - as respostas ficam em cache para limitar as chamadas à API.
- **Variáveis de ambiente:** variáveis com prefixo `VITE_` vão para o código do navegador e só guardam informações públicas. Tokens e segredos não levam o prefixo e ficam apenas no servidor. O `.env` não é versionado, e o `.env.example` lista só os nomes.
- **Acessibilidade:** rótulos nos campos, erros anunciados por leitores de tela, `aria-label` nos ícones, modal baseado no elemento `<dialog>` nativo (foco, Esc e fechamento por clique fora) e animações desligadas para quem prefere movimento reduzido.

---

## 🚀 Instalação e Execução

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão LTS atual)
- [Git](https://git-scm.com/)

### Passo a passo
```bash
git clone https://github.com/Nicolas-De-Almeida/portfolio.git
cd portfolio
npm install
cp .env.example .env
npm run dev
```

O site abre em `http://localhost:5173/`. As rotas `/api/wakatime` e `/api/codando` também funcionam nesse servidor.

> O site abre mesmo sem preencher o `.env`. Sem as variáveis, o formulário mostra uma mensagem de erro ao enviar, alguns ícones de contato não aparecem e o card do WakaTime exibe "dados indisponíveis". As variáveis estão descritas na seção abaixo.

Para gerar a versão de produção: `npm run build`.

---

## 🔐 Variáveis de Ambiente

Todas são opcionais para rodar o site; sem elas, o recurso correspondente fica desativado. **O `.env` nunca é versionado.**

| Variável | Para quê | Vai ao navegador? |
|---|---|---|
| `VITE_EMAILJS_SERVICE_ID` | Serviço de e-mail do EmailJS | Sim (pública) |
| `VITE_EMAILJS_TEMPLATE_ID` | Template do aviso enviado ao dono do site | Sim (pública) |
| `VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID` | Template da resposta automática (opcional) | Sim (pública) |
| `VITE_EMAILJS_PUBLIC_KEY` | Chave pública do EmailJS | Sim (pública) |
| `VITE_CONTACT_EMAIL` | E-mail exibido na seção Contato | Sim (exibido no site) |
| `VITE_CONTACT_WHATSAPP` | WhatsApp, só dígitos com DDI e DDD (opcional) | Sim (exibido no site) |
| `WAKATIME_APP_ID` | ID do app OAuth do WakaTime | Não (servidor) |
| `WAKATIME_APP_SECRET` | Segredo do app OAuth | Não (servidor) |
| `WAKATIME_ACCESS_TOKEN` | Token de leitura dos dados | Não (servidor) |
| `WAKATIME_REFRESH_TOKEN` | Renovação automática do token | Não (servidor) |
| `WAKATIME_PUBLIC_PROJECTS` | Projetos extras liberados no "Codando agora" (opcional) | Não (servidor) |

Os tokens do WakaTime são gerados pelo script `npm run wakatime:oauth` (veja `scripts/wakatime-oauth.mjs`). Os nomes de projetos liberados para o selo "Codando agora" ficam em `src/config/wakatimeConfig.js`.

---

## 📁 Estrutura de Pastas

```
portfolio/
├── api/                      # Funções de servidor (Vercel Functions)
│   ├── _oauth.js             # Autenticação OAuth e renovação de token
│   ├── _wakatime.js          # Lógica da rota /api/wakatime
│   ├── _codando.js           # Lógica da rota /api/codando
│   ├── wakatime.js           # Rota GET /api/wakatime
│   └── codando.js            # Rota GET /api/codando
├── docs/
│   └── wireframes/           # Wireframes do Figma
├── public/
│   └── projects/             # Imagens dos projetos (uma pasta por projeto)
├── scripts/
│   └── wakatime-oauth.mjs    # Gera os tokens OAuth do WakaTime
├── src/
│   ├── components/           # Header, Footer, Cards, ImageCarousel, StarField, Float,
│   │                         # WakaTimeCard, WakaTimeModal, DonutChart, CodingNowBadge
│   ├── config/               # wakatimeConfig.js
│   ├── data/                 # Textos e dados em pt/en
│   ├── hooks/                # useWakaStats, useCodingNow
│   ├── pages/                # Seções: About, Projects, Experiences, Contact
│   ├── utils/                # time.js, chart.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example              # Nomes das variáveis de ambiente (sem valores)
├── index.html
├── package.json
└── vite.config.js            # Inclui o plugin que serve as rotas /api em desenvolvimento
```

---

## ☁️ Deploy

O site é hospedado na **Vercel**, com deploy automático a cada push na branch `main`.

Para publicar um fork próprio:

1. Importe o repositório na Vercel.
2. Em **Settings → Environment Variables**, cadastre as variáveis da seção anterior (as `WAKATIME_*` sem o prefixo `VITE_`).
3. Faça um novo deploy sempre que criar ou alterar uma variável, porque o valor é gravado na hora do build.
4. No painel do EmailJS, restrinja os domínios permitidos ao endereço do site publicado.

---

## 🙏 Agradecimentos

- **Prof. João Paulo Aramuni**, pelo código base das rotas de API do WakaTime, que adaptei ao projeto.
- Documentação do [React](https://react.dev/), [Vite](https://vite.dev/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [EmailJS](https://www.emailjs.com/) e [WakaTime](https://wakatime.com/developers).

---

## 👤 Autor

| Nome | GitHub | LinkedIn |
|------|--------|----------|
| Nícolas De Almeida | [@Nicolas-De-Almeida](https://github.com/Nicolas-De-Almeida) | [LinkedIn](https://www.linkedin.com/in/nicolasdealmeida) |

---

## 📄 Licença

Este projeto é distribuído sob a **Licença MIT**. Veja o arquivo [LICENSE](./LICENSE).