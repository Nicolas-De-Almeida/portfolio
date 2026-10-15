import { chartColor } from "../utils/chart";

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function DonutChart({ items, label }) {
    const total = items.reduce((sum, item) => sum + item.seconds, 0);
    if (!total) return null;

    // Onde cada fatia começa no círculo
    const segments = items.reduce((list, item, index) => {
        const length = (item.seconds / total) * CIRCUMFERENCE;
        const last = list[list.length - 1];
        const start = last ? last.start + last.length : 0;
        return [...list, { item, index, length, start }];
    }, []);

    return (
        <svg viewBox="0 0 100 100" role="img" aria-label={label} className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#1a1a26" strokeWidth="12" />
            {segments.map(({ item, index, length, start }) => (
                <circle key={item.name}
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                stroke={chartColor(index, item.others)}
                strokeWidth="12"
                strokeDasharray={`${Math.max(length - 1, 0)} ${CIRCUMFERENCE}`}
                strokeDashoffset={-start}/>
            ))}
        </svg>
    );
}