import { motion, useReducedMotion } from "framer-motion";

export default function Float({
    children,
    className = "",
    amplitude = 6, // quanto sobe, em pixels
    rotate = 0.5, // graus de inclinação
    duration = 7, // segundos por ciclo
    delay = 0,
    }) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div className={className}
            animate={ 
                reduceMotion ? undefined : { y: [0, -amplitude, 0], rotate: [0, rotate, 0, -rotate, 0] }
            }
            transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}>
            {children}
        </motion.div>
    );
}