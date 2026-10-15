const COLORS = ["#c4b5fd", "#818cf8", "#7dd3fc", "#5eead4", "#f0abfc"];
const OTHERS_COLOR = "#475569";

export const chartColor = (index, isOthers) =>
    isOthers ? OTHERS_COLOR : COLORS[index % COLORS.length];

// Pega as maiores fatias e agrupa o resto em "Outras"
export function buildChartItems(list = [], max = 5, othersLabel = "...") {
    const total = list.reduce((sum, item) => sum + item.seconds, 0);
    if (!total) return [];

    const top = list
        .slice(0, max)
        .map((item) => ({ ...item, share: (item.seconds / total) * 100 }));
    const restSeconds = list.slice(max).reduce((sum, item) => sum + item.seconds, 0);

    return restSeconds > 0
        ? [...top, { name: othersLabel, seconds: restSeconds, share: (restSeconds / total) * 100, others: true }]
        : top;
}