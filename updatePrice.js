import { 
    price, 
    timeIndex,
    priceHistory,
    purchaseMarkers,
    candleData,
    isLineChart,
    setPrice,
    setTimeIndex,
    setPurchaseMarkers,
    setPortfolioValue,
    shares,
} from './global.js';

import { updateDisplay } from './updateDisplay.js';
import { drawLineChart } from './drawLineChart.js';
import { drawCandleChart } from './drawCandleChart.js';
import { getCanvasContext } from './canvasManager.js';

export function updatePrice(newsImpact = 0) {
    const { canvas, ctx } = getCanvasContext();
    
    setTimeIndex(timeIndex + 1);
    const change = (Math.random() - 0.5) * 5 + newsImpact;
    setPrice(Math.max(1, price + change));
    priceHistory.push(price);
    
    if (priceHistory.length > 100) {
        priceHistory.shift();
        setPurchaseMarkers(purchaseMarkers
            .map(marker => ({
                ...marker,
                timeIndex: marker.timeIndex - 1
            }))
            .filter(marker => marker.timeIndex >= 0)
        );
    }
    
    if (priceHistory.length % 5 === 0) {
        const segment = priceHistory.slice(-5);
        candleData.push({
            open: segment[0],
            close: segment[segment.length - 1],
            high: Math.max(...segment),
            low: Math.min(...segment)
        });
        if (candleData.length > 20) candleData.shift();
    }
    
    setPortfolioValue(shares * price);
    
    updateDisplay();
    if (isLineChart) {
        drawLineChart(ctx, canvas);
    } else {
        drawCandleChart(ctx, canvas);
    }
}
