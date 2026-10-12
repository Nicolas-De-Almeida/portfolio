import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function ImageCarousel({ images, alt, placeholder, previousLabel, nextLabel, interval = 5000 }) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const total = images.length;

    const goTo = (position) => setIndex((position + total) % total);

    // Passagem automática (opcional): pausa no hover e respeita "reduzir movimento"
    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduceMotion) {
            return;
        } 

        const timer = setInterval(() => setIndex((current) => (current + 1) % total), interval);
        return () => clearInterval(timer);

    }, 
    [paused, total, interval, index]);

    // Se não tiver imagens vai mostrar a borda tracejada
    if (total === 0) {
        return (
        <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-[#2a2a33] text-sm text-slate-500">
            {placeholder}
        </div>
        );
    }

    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#2a2a33] bg-[#0d0d16]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <AnimatePresence initial={false}>
                <motion.img key={images[index]} src={images[index]} alt={`${alt} (${index + 1}/${total})`} loading="lazy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0 h-full w-full object-contain"/>
            </AnimatePresence>

            {total > 1 && (
                <>
                <button type="button" onClick={() => goTo(index - 1)} aria-label={previousLabel} className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#2a2a33] bg-[#14141e]/80 text-slate-200 backdrop-blur transition-colors hover:text-white">
                    <FaChevronLeft size={14} />
                </button>
                <button type="button" onClick={() => goTo(index + 1)} aria-label={nextLabel} className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#2a2a33] bg-[#14141e]/80 text-slate-200 backdrop-blur transition-colors hover:text-white" >
                    <FaChevronRight size={14} />
                </button>

                <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
                    {images.map((image, position) => (
                        <button key={image} type="button" onClick={() => goTo(position)} aria-label={`${position + 1}/${total}`} aria-current={position === index} className={`h-2 w-2 cursor-pointer rounded-full transition-colors ${ position === index ? "bg-violet-300" : "bg-slate-500/60 hover:bg-slate-300"}`}/>
                    ))}
                </div>
            </>
            )}
        </div>
    );
}