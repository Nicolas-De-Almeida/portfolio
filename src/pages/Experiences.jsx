
import { motion } from "framer-motion";
import Card from "../components/Cards";
import { experiences, experiencesContent } from "../data/experiences";
import Float from "../components/Float";

// Deslocamento em "escada" no desktop repetindo a cada 3 cards
const stairs = ["md:ml-0", "md:ml-[6%]", "md:ml-[12%]"];

// Converte "2025-03" em "mar 2025" no idioma escolhido
const formatDate = (value, language) => {
    const [year, month] = value.split("-").map(Number);
    const monthName = new Intl.DateTimeFormat(
        language === "pt" ? "pt-BR" : "en-US",
        { month: "short" }
    ).format(new Date(year, month - 1, 1));

    return `${monthName.replace(".", "")} ${year}`;
};

export default function Experiences({ language }) {
    const content = experiencesContent[language];

    return (
        <section id="MyExperiences" className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 pb-24">
            {/* Título */}
            <p className="text-xs font-medium tracking-widest text-violet-300">
                {content.label}
            </p>
            <h2 className="mt-4 bg-gradient-to-r from-violet-100 via-violet-300 to-sky-300 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl lg:text-7xl">
                {content.title}
            </h2>
            <p className="mt-4 max-w-xl text-slate-300">{content.subtitle}</p>

            {/* Lista de experiências */}
            <ol className="relative mt-12 pl-12 md:pl-16">

                {/* Linha vertical */}
                <span aria-hidden="true" className="absolute bottom-0 left-4 top-0 w-px bg-violet-400/20"/>

                {experiences.map((experience, index) => {
                    const text = experience[language];
                    const isCurrent = experience.end === null;
                    const period = `${formatDate(experience.start, language)} — ${
                    isCurrent ? content.present : formatDate(experience.end, language)
                    }`;

                    return (
                        <motion.li key={experience.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="relative pb-10">

                            {/* Estrela na linha */}
                            <span aria-hidden="true" className="absolute -left-12 top-8 flex h-5 w-5 items-center justify-center rounded-full border border-violet-400/50 bg-[#0d0d16] md:-left-16" style={{ transform: "translateX(0.375rem)" }}>
                                <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
                            </span>

                            <div className={`w-full md:w-[82%] ${stairs[index % stairs.length]}`}>
                                <Float duration={7 + (index % 3)} delay={index * 0.6}>
                                    <Card>
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                {/* Empresa foto(se tiver) */}
                                                <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#2a2a33] bg-[#0d0d16] text-sm font-semibold text-violet-300">
                                                    {text.company.slice(0, 2).toUpperCase()}
                                                </span>
                                                <div>
                                                    <p className="font-semibold text-white">{text.company}</p>
                                                    <p className="text-xs text-slate-500">{text.place}</p>
                                                </div>
                                            </div>

                                            <p className={`flex items-center gap-2 text-xs capitalize ${isCurrent ? "text-teal-300" : "text-slate-400"}`}>
                                                {isCurrent && (
                                                    <span className="h-2 w-2 rounded-full bg-teal-300" />
                                                )}
                                                {period}
                                            </p>
                                        </div>

                                        <p className="mt-5 text-xs uppercase tracking-wider text-violet-300">
                                            {text.type}
                                        </p>
                                        <h3 className="mt-1 text-2xl font-semibold text-white lg:text-3xl">
                                            {text.role}
                                        </h3>
                                        <p className="mt-3 leading-relaxed text-slate-400 lg:text-lg">
                                            {text.description}
                                        </p>

                                        <ul className="mt-4 flex flex-wrap gap-2">
                                            {experience.tags.map((tag) => (
                                            <li key={tag} className="rounded-full border border-[#2a2a33] bg-[#0d0d16] px-3 py-1 text-xs text-slate-400">
                                                {tag}
                                            </li>
                                            ))}
                                        </ul>
                                    </Card>
                                </Float>
                            </div>
                        </motion.li>
                    );
                })}
            </ol>

            {/* Frase de fechamento */}
            <Card className="mt-6">
                <h3 className="text-lg font-semibold text-white">
                    {content.closingTitle}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{content.closingText}</p>
            </Card>
        </section>
    );
}