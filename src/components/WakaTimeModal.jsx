import { useEffect, useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import CodingNowBadge from "./CodingNowBadge";
import DonutChart from "./DonutChart";
import { useWakaStats } from "../hooks/useWakaStats";
import { wakatimeContent, wakatimeRanges } from "../data/wakatime";
import { buildChartItems, chartColor } from "../utils/chart";
import { formatDuration } from "../utils/time";

function Tile({ label, value }) {
    return (
        <div className="rounded-2xl border border-[#2a2a33] bg-[#14141e]/70 p-4">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-1 text-lg font-semibold text-white">{value}</p>
        </div>
    );
}

function BarList({ title, items }) {
    if (!items?.length) return null;
    const max = Math.max(...items.map((item) => item.seconds));

    return (
        <section aria-label={title}>
            <h3 className="text-sm font-semibold text-violet-300">{title}</h3>
            <ul className="mt-3 space-y-3">
                {items.map((item) => (
                <li key={item.name}>
                    <div className="flex justify-between gap-3 text-sm">
                        <span className="text-slate-200">{item.name}</span>
                        <span className="text-slate-500">{formatDuration(item.seconds)}</span>
                    </div>
                        <div className="mt-1 h-1.5 rounded-full bg-[#1a1a26]">
                        <div className="h-full rounded-full bg-gradient-to-r from-violet-300 to-sky-300" style={{ width: `${(item.seconds / max) * 100}%` }}/>
                    </div>
                </li>
                ))}
            </ul>
        </section>
    );
    }

    export default function WakaTimeModal({ language, codingNow, onClose }) {
    const content = wakatimeContent[language];
    const dialogRef = useRef(null);
    const [range, setRange] = useState("last_7_days");
    const stats = useWakaStats(range);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog.open) dialog.showModal();
        document.body.style.overflow = "hidden"; // trava a rolagem da página
        return () => {
        document.body.style.overflow = "";
        };
    }, []);

    const close = () => dialogRef.current.close(); // dispara o onClose do dialog

    const errorText =
        stats.status === "error"
        ? ({ forbidden: content.forbidden, pending: content.pending }[stats.code] ??
            content.unavailable)
        : null;

    const formatDay = (date) =>
        new Date(`${date}T12:00:00`).toLocaleDateString(language === "pt" ? "pt-BR" : "en-US", {
        day: "2-digit",
        month: "short",
        });

    const data = stats.status === "ready" ? stats.data : null;
    const languageItems = data ? buildChartItems(data.languages, 5, content.others) : [];

    return (
        <dialog ref={dialogRef} onClose={onClose} onClick={(event) => event.target === dialogRef.current && close()} aria-labelledby="wakatime-title" className="m-auto max-h-[90vh] w-[min(94vw,60rem)] overflow-y-auto rounded-3xl border border-[#2a2a33] bg-[#0d0d16] p-0 text-slate-200 backdrop:bg-black/70 backdrop:backdrop-blur-sm">
            <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 id="wakatime-title" className="text-2xl font-semibold text-white">
                            {content.cardTitle}
                        </h2>
                        <div className="mt-2">
                            <CodingNowBadge codingNow={codingNow} content={content} />
                        </div>
                    </div>
                    <button type="button" onClick={close} aria-label={content.close} className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#2a2a33] text-slate-400 transition-colors hover:text-white">
                        <FaXmark size={16} />
                    </button>
                </div>

                {/* Períodos */}
                <div role="group" aria-label={content.period} className="mt-6 flex flex-wrap gap-2">
                    {wakatimeRanges.map((option) => (
                        <button key={option.id} type="button" aria-pressed={range === option.id} onClick={() => setRange(option.id)} className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-colors ${
                            range === option.id
                            ? "border-violet-400/60 bg-[#271a4a] text-white"
                            : "border-[#2a2a33] text-slate-400 hover:text-white"
                        }`}>
                            {option.label[language]}
                        </button>
                    ))}
                </div>

                {stats.status === "loading" && (
                    <p className="mt-8 text-sm text-slate-500">{content.loading}</p>
                )}
                {errorText && 
                    <p className="mt-8 text-sm text-slate-400">{errorText}</p>}
                {data && languageItems.length === 0 && (
                    <p className="mt-8 text-sm text-slate-400">{content.empty}</p>
                )}

                {data && languageItems.length > 0 && (
                <>
                    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                        <Tile label={content.totalLabel} value={formatDuration(data.totalSeconds)} />
                        <Tile label={content.dailyAverage} value={formatDuration(data.dailyAverage)} />
                        <Tile label={content.bestDay} value={data.bestDayv? `${formatDay(data.bestDay.date)} · ${formatDuration(data.bestDay.seconds)}` : "-"}/>
                        <Tile label={content.activeDays} value={data.activeDays ?? "-"} />
                    </div>

                    <div className="mt-8 grid gap-8 md:grid-cols-2">
                        <section>
                            <h3 className="text-sm font-semibold text-violet-300">{content.languages}</h3>
                            <div className="mt-4 flex items-center gap-6">
                            <div className="h-32 w-32 shrink-0">
                                <DonutChart items={languageItems} label={content.chartLabel} />
                            </div>
                                <ul className="w-full space-y-2 text-sm">
                                    {languageItems.map((item, index) => (
                                    <li key={item.name} className="flex items-center justify-between gap-3">
                                        <span className="flex items-center gap-2 text-slate-300">
                                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: chartColor(index, item.others) }} />
                                        {item.name}
                                        </span>
                                        <span className="text-slate-500">{formatDuration(item.seconds)}</span>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        <BarList title={content.editors} items={data.editors} />
                        <BarList title={content.categories} items={data.categories} />
                        <BarList title={content.operatingSystems} items={data.operatingSystems} />
                    </div>
                    <p className="mt-8 text-xs text-slate-500">{content.source}</p>
                </>
                )}
            </div>
        </dialog>
    );
}