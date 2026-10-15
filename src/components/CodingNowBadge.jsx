import { formatDuration } from "../utils/time";

export default function CodingNowBadge({ codingNow, content }) {
    if (codingNow.status !== "ready") return null;
    const { active, todaySeconds, last } = codingNow.data;

    if (active && last) {
        const details = [last.project ?? content.privateProject, last.language]
        .filter(Boolean)
        .join(" · ");

        return (
            <p className="flex items-center gap-2 text-xs text-teal-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-teal-300 motion-reduce:animate-none" />
                {content.codingNow}: {details}
            </p>
        );
    }

    return (
        <p className="flex items-center gap-2 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-slate-500" />
            {content.offline}
            {todaySeconds > 0 && ` · ${content.today}: ${formatDuration(todaySeconds)}`}
        </p>
    );
}