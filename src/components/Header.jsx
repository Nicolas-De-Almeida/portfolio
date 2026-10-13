import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const links = [
  { id: "AboutMe", label: { pt: "Sobre", en: "About" } },
  { id: "MyProjects", label: { pt: "Projetos", en: "Projects" } },
  { id: "MyExperiences", label: { pt: "Experiências", en: "Experience" } },
  { id: "ContactMe", label: { pt: "Contato", en: "Contact" } },
];

const languages = ["pt", "en"];

export default function Header({language, setLanguage}) {
  const [active, setActiveLink] = useState("AboutMe");

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    // A seção que cruza a faixa do meio da tela vira a ativa
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id)
          };
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((section) => observer.observe(section));

    // No fim da página é curta demais para cruzar a faixa
    const handleScroll = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActiveLink(links[links.length - 1].id)
      };
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Limpeza quando o componente sai da tela
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2">
      <div className="flex flex-wrap items-center justify-between gap-y-2 rounded-3xl border border-[#2a2a33] bg-[#14141e]/90 px-4 py-2 backdrop-blur-xl md:rounded-full">
        <a href="#AboutMe" className="flex items-center gap-3">
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-900 via-indigo-800 to-[#271a4a] bg-clip-text text-transparent">Nícolas De Almeida</span>
        </a>

        <nav className="order-last flex w-full items-center justify-between md:order-none md:w-auto md:justify-center md:gap-1">
          {links.map((link) => (
            <a key={link.id} href={`#${link.id}`} aria-current={active === link.id ? "true" : undefined} className={`relative rounded-full px-3 py-2 text-sm font-medium transition-colors md:px-5 md:py-2.5 ${active === link.id ? "text-white" : "text-slate-400 hover:text-white"}`}>
              {active === link.id && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-[#21212a]" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
              <span className="relative z-10">{link.label[language]}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center rounded-full border border-[#2a2a33] bg-[#0d0d16] p-1">
          {languages.map((l) => (
            <button aria-label={l === "pt" ? "Mudar para português" : "Switch to English"} key={l} onClick={() => setLanguage(l)} className={`relative cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${language === l ? "text-white" : "text-slate-400 hover:text-white"}`}>
              {language === l && <motion.span layoutId="lang-pill" className="absolute inset-0 rounded-full bg-[#271a4a] ring-1 ring-violet-400/30" transition={{ type: "spring", stiffness: 400, damping: 30 }}/>}
              <span className="relative z-10">{l.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}