import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import Card from "./Cards";
import Float from "./Float";
import DonutChart from "./DonutChart";
import CodingNowBadge from "./CodingNowBadge";
import WakaTimeModal from "./WakaTimeModal";
import { useCodingNow } from "../hooks/useCodingNow";
import { useWakaStats } from "../hooks/useWakaStats";
import { wakatimeContent } from "../data/wakatime";
import { buildChartItems, chartColor } from "../utils/chart";
import { formatDuration } from "../utils/time";

export default function WakaTimeCard({ language }) {
    const content = wakatimeContent[language];
    const [open, setOpen] = useState(false);
    const stats = useWakaStats("last_7_days");
    const codingNow = useCodingNow();

    const items =
        stats.status === "ready"
        ? buildChartItems(stats.data.languages, 5, content.others)
        : [];

    return (
        <>
            <Float className="h-full" amplitude={5} duration={8} delay={1}>
                <Card className="flex h-full min-h-72 flex-col">
                    <h2 className="text-lg font-semibold text-white">{content.cardTitle}</h2>
                    <p className="mt-1 text-sm text-slate-400">{content.cardSubtitle}</p>

                    <div className="mt-5 flex flex-1 items-center">
                        {stats.status === "loading" && (
                            <p className="text-sm text-slate-500">{content.loading}</p>
                        )}
                        {stats.status === "error" && (
                            <p className="text-sm text-slate-500">{content.unavailable}</p>
                        )}
                        {stats.status === "ready" && items.length === 0 && (
                            <p className="text-sm text-slate-500">{content.empty}</p>
                        )}
                        {items.length > 0 && (
                            <div className="flex w-full flex-col items-center gap-6 sm:flex-row">
                                <div className="relative h-36 w-36 shrink-0">
                                    <DonutChart items={items} label={content.chartLabel} />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                        <span className="text-lg font-semibold text-white">
                                            {formatDuration(stats.data.totalSeconds)}
                                            </span>
                                        <span className="text-xs text-slate-500">{content.total}</span>
                                    </div>
                                </div>

                                <ul className="w-full space-y-2 text-sm">
                                    {items.map((item, index) => (
                                        <li key={item.name} className="flex items-center justify-between gap-3">
                                        <span className="flex items-center gap-2 text-slate-300">
                                        <span className="h-2.5 w-2.5 rounded-full"style={{ backgroundColor: chartColor(index, item.others) }}/>
                                        {item.name}
                                        </span>
                                        <span className="text-slate-500">{Math.round(item.share)}%</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <CodingNowBadge codingNow={codingNow} content={content} />
                        {stats.status === "ready" && (
                            <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-violet-300 transition-colors hover:text-white">
                                {content.details}
                                <FaArrowRight size={12} />
                            </button>
                        )}
                    </div>
                </Card>
            </Float>

            {open && (
                <WakaTimeModal language={language} codingNow={codingNow} onClose={() => setOpen(false)} />
            )}
        </>
    );
}