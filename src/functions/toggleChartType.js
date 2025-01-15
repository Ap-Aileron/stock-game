import { drawCandleChart } from "./drawCandleChart.js";
import { drawLineChart } from "./drawLineChart.js";

export function toggleChartType() {
    isLineChart = !isLineChart;
    if (isLineChart) {
        drawLineChart();
    } else {
        drawCandleChart();
    }
}