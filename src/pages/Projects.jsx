import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaStar } from "react-icons/fa6";
import Card from "../components/Cards";
import { githubProfile, projects, projectsContent } from "../data/projects";
import ImageCarousel from "../components/ImageCarousel";

export default function Projects({ language }) {
    const content = projectsContent[language];

    // Quantos projetos estão visíveis (vai começar com 1)
    const [visibleCount, setVisibleCount] = useState(1);
    const visibleProjects = projects.slice(0, visibleCount);
    const hasMoreProjects = visibleCount < projects.length;

    return (
        <section id="MyProjects" className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 pb-24">
            {/* Título */}
            <p className="text-xs font-medium tracking-widest text-violet-300">
                {content.label}
            </p>
            <h2 className="mt-4 bg-gradient-to-r from-violet-100 via-violet-300 to-sky-300 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl">
                {content.title}
            </h2>
            <p className="mt-4 max-w-xl text-slate-300">{content.subtitle}</p>

            {/* Linha do tempo */}
            <ol className="mt-12">
                {visibleProjects.map((project, index) => {
                    const isLeft = index % 2 === 0;
                    const text = project[language];

                    return (
                        <motion.li key={project.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative grid pb-16 pl-12 md:grid-cols-2 md:gap-16 md:pl-0">
                            {/* Linha vertical */}
                            <span aria-hidden="true" className="absolute bottom-0 left-4 top-0 w-px bg-violet-400/20 md:left-1/2"/>
                            {/* Estrela da linha do tempo */}
                            <span aria-hidden="true" className="absolute left-4 top-6 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border border-violet-400/50 bg-[#0d0d16] md:left-1/2">
                                <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
                            </span>

                            {/* Card do projeto (alterna esquerda/direita no desktop) */}
                            <div className={`md:row-start-1 ${isLeft ? "md:col-start-1" : "md:col-start-2"}`}>
                                <Card>
                                    {/* Imagem dos projetos */}
                                    <div className="mt-2">
                                        <ImageCarousel images={project.images} alt={text.name} placeholder={content.imagePlaceholder} previousLabel={content.previousImage} nextLabel={content.nextImage}/>
                                    </div>
                                    <div className="flex items-center justify-between text-xs pt-5">
                                        <span className="uppercase tracking-wider text-violet-300">
                                            {text.type}
                                        </span>
                                        <span className="text-slate-400">{project.year}</span>
                                    </div>

                                    <h3 className="mt-3 text-2xl font-semibold text-white">
                                        {text.name}
                                    </h3>
                                    <p className="mt-3 leading-relaxed text-slate-400">
                                        {text.description}
                                    </p>

                                    <ul className="mt-4 flex flex-wrap gap-2">
                                        {project.technologies.map((technology) => (
                                        <li key={technology} className="rounded-full border border-[#2a2a33] bg-[#0d0d16] px-3 py-1 text-xs text-slate-400">
                                            {technology}
                                        </li> ))}
                                    </ul>

                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 transition-colors hover:text-white">
                                        <FaGithub size={16} />
                                        {content.githubButton}
                                    </a>
                                </Card>
                            </div>

                            {/* Ano*/}
                            <div className={`hidden pt-3 md:row-start-1 md:flex md:flex-col ${ isLeft ? "md:col-start-2" : "md:col-start-1 md:items-end md:text-right" }`} >
                                <span className="text-4xl font-semibold text-violet-400/50">
                                    {project.year}
                                </span>
                                <span className="mt-1 text-sm text-slate-500">
                                    {text.tagline}
                                </span>
                            </div>
                        </motion.li>
                    );
                })}

                {/* Estrela clicável revelando o próximo projeto */}
                {hasMoreProjects && (
                <li className="relative h-28 pl-12 md:pl-0">
                    <motion.button type="button" onClick={() => setVisibleCount((count) => count + 1)} aria-label={content.nextProject} animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute left-4 top-2 -translate-x-1/2 cursor-pointer md:left-1/2" >
                        <motion.span animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.15, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} className="flex h-12 w-12 items-center justify-center rounded-full border border-violet-400/40 bg-[#14141e] text-violet-300 shadow-[0_0_20px_rgba(167,139,250,0.35)]">
                            <FaStar size={20} />
                        </motion.span>
                    </motion.button>

                    <p className="absolute left-16 top-5 text-sm text-slate-400 md:left-[calc(50%+2.5rem)]">
                        {content.hint}
                    </p>
                </li>
                )}
            </ol>

            {/* Quando todos os projetos já apareceram */}
            {!hasMoreProjects && (
                <a href={githubProfile} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-300 transition-colors hover:text-white">
                    <FaGithub size={16} />
                    {content.moreOnGithub}
                </a>
            )}
        </section>
    );
}