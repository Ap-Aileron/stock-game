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
} from '../other/global.js';

import { updateDisplay } from './updateDisplay.js';
import { drawLineChart } from './drawLineChart.js';
import { drawCandleChart } from './drawCandleChart.js';

export function updatePrice(newsImpact = 0) {
    setTimeIndex(timeIndex + 1);
    const change = (Math.random() - 0.5) * 5 + newsImpact;
    setPrice(Math.max(1, price + change));
    priceHistory.push(price);
    
    // Keep only last 100 prices
    if (priceHistory.length > 100) {
        priceHistory.shift();
        // Update markers' time indices when shifting
        setPurchaseMarkers(purchaseMarkers
            .map(marker => ({
                ...marker,
                timeIndex: marker.timeIndex - 1
            }))
            .filter(marker => marker.timeIndex >= 0)
        );
    }
    
    // Update candle data
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
    
    // Update portfolio value
    setPortfolioValue(shares * price);
    
    updateDisplay();
    if (isLineChart) {
        drawLineChart();
    } else {
        drawCandleChart();
    }
}
