import { 
    candleData,
} from '../other/global.js';

import { clearPurchaseMarkers } from './clearPurchaseMarkers.js';

export function drawCandleChart() { //EXPORTED
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearPurchaseMarkers();
    
    const candleWidth = canvas.width / 20;
    const priceRange = Math.max(...candleData.map(d => d.high)) - Math.min(...candleData.map(d => d.low));
    const yScale = canvas.height / priceRange;
    const minPrice = Math.min(...candleData.map(d => d.low));
    
    candleData.forEach((candle, i) => {
        const x = i * candleWidth + candleWidth / 2;
        const color = candle.close > candle.open ? '#44ff44' : '#ff4444';
        
        const candleElement = document.createElement('div');
        candleElement.className = 'candle';
        candleElement.style.left = x + 'px';
        candleElement.style.background = color;
        
        const candleHeight = Math.abs(candle.close - candle.open) * yScale;
        const top = canvas.height - Math.max(candle.close, candle.open) * yScale + minPrice * yScale;
        
        candleElement.style.height = Math.max(1, candleHeight) + 'px';
        candleElement.style.top = top + 'px';
        
        const wickElement = document.createElement('div');
        wickElement.className = 'candle-wick';
        wickElement.style.height = (candle.high - candle.low) * yScale + 'px';
        wickElement.style.top = (canvas.height - candle.high * yScale + minPrice * yScale) + 'px';
        
        chartContainer.appendChild(candleElement);
        chartContainer.appendChild(wickElement);
    });
}