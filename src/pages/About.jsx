import { FaArrowRight } from "react-icons/fa6";
import Card from "../components/Cards";
import { aboutContent, infoCards, technologies } from "../data/about";

export default function About({language}) {
    // Aqui recebe qual idioma mostrar
    const about = aboutContent[language];

    return (
        <section id="AboutMe" className="mx-auto min-h-screen w-full max-w-7xl scroll-mt-24 px-4 pb-16 pt-32">
            {/* Título */}
            <h1 className="mt-4 bg-gradient-to-r from-violet-100 via-violet-300 to-sky-300 bg-clip-text text-5xl font-bold leading-tight text-transparent md:text-7xl">
                {about.titleLine1}
            </h1>
            <br/>
            <p className="mt-4 text-slate-300 text-lg font-bold leading-tight md:text-xl">
                {about.titleLine2}
            </p>

            {/* Card principal*/}
            <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                <Card>
                    <h2 className="text-xl font-semibold text-white">{about.greeting}</h2>
                    <p className="mt-4 leading-relaxed text-slate-300">{about.intro}</p>

                    <p className="mt-5 flex items-center gap-2 text-sm text-teal-300">
                        <span className="h-2 w-2 rounded-full bg-teal-300"/>
                        {about.status}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <a href="#MyProjects" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-300 to-indigo-400 px-5 py-3 text-sm font-semibold text-slate-900 transition-opacity hover:opacity-90">
                            {about.projectsButton}
                            <FaArrowRight size={12}/>
                        </a>
                        <a href="#ContactMe" className="inline-flex items-center gap-2 rounded-xl border border-[#2a2a33] bg-[#0d0d16] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-violet-400/40">
                            {about.contactButton}
                            <FaArrowRight size={12}/>
                        </a>
                    </div>
                </Card>

                {/* Ainda vou arrumar aqui */}
                <div className="flex min-h-72 items-center justify-center rounded-3xl border border-dashed border-[#2a2a33] text-sm text-slate-500">
                    {about.orbitPlaceholder}
                </div>
            </div>

            {/* Tecnologias */}
            <Card className="mt-6">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-violet-400">
                            {about.technologiesTitle}
                        </h2>
                    </div>
                    <ul className="flex flex-wrap gap-2 md:justify-end">
                        {technologies.map((technology) => (
                        <li key={technology} className="rounded-full border border-[#2a2a33] bg-[#0d0d16] px-4 py-2 text-sm text-slate-300">
                            {technology}
                        </li>
                        ))}
                    </ul>
                </div>
            </Card>

            {/* Formação, interesses e objetivos */}
            <Card className="mt-6">
                <div className="grid gap-6 md:grid-cols-3">
                    {infoCards.map((card) => (
                    <div key={card.id}>
                        <h3 className=" text-lg font-bold text-violet-300">
                            {card[language].title}
                        </h3>
                        <p className="mt-2 text-md leading-relaxed text-slate-300">
                            {card[language].text}
                        </p>
                    </div>
                ))}
                </div>
            </Card>
        </section>
    );
}