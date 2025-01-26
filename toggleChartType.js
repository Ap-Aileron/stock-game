import { 
    isLineChart, 
    setIsLineChart 
} from './global.js';
import { drawLineChart } from './drawLineChart.js';
import { drawCandleChart } from './drawCandleChart.js';
import { getCanvasContext } from './canvasManager.js';

export function toggleChartType() {
    const { canvas, ctx } = getCanvasContext();
    setIsLineChart(!isLineChart);
    
    if (isLineChart) {
        drawLineChart(ctx, canvas);
    } else {
        drawCandleChart(ctx, canvas);
    }
}
