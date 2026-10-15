const STAR_COUNT = 90;
const FLARE_COUNT = 25;

const random = (min, max) => Math.random() * (max - min) + min;

// Gerado uma vez só(na hora que carrega a pagina)
const stars = Array.from({ length: STAR_COUNT }, (_, id) => {
    const flare = id < FLARE_COUNT;
    return {
        id,
        flare,
        top: random(0, 100),
        left: random(0, 100),
        size: flare ? random(2, 3) : random(1, 2.5),
        duration: flare ? random(9, 16) : random(3, 7),
        delay: random(0, 10),
    };
});

export default function StarField() {
    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            {stars.map((star) => (
                <span key={star.id} className={star.flare ? "star-flare" : "star"}
                style={{
                    top: `${star.top}%`,
                    left: `${star.left}%`,
                    width: star.size,
                    height: star.size,
                    animationDuration: `${star.duration}s`,
                    animationDelay: `${star.delay}s`,
                }}/>
            ))}
        </div>
    );
}