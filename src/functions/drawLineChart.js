import { 
    price, 
    priceHistory,
    purchaseMarkers,

} from '../other/global.js';

import { clearPurchaseMarkers } from './clearPurchaseMarkers.js';

const chartContainer = document.getElementById('chart-container');
const canvas = document.getElementById('price-chart');
const ctx = canvas.getContext('2d');

// Draw line chart
export function drawLineChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw price line
    ctx.beginPath();
    ctx.strokeStyle = price > priceHistory[0] ? '#44ff44' : '#ff4444';
    ctx.lineWidth = 2;
    
    const xStep = canvas.width / (priceHistory.length - 1);
    const yScale = canvas.height / (Math.max(...priceHistory) - Math.min(...priceHistory));
    
    priceHistory.forEach((p, i) => {
        const x = i * xStep;
        const y = canvas.height - ((p - Math.min(...priceHistory)) * yScale);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw purchase markers with updated positions
    clearPurchaseMarkers();
    purchaseMarkers.forEach(marker => {
        const xPos = (marker.timeIndex / (priceHistory.length - 1)) * canvas.width;
        
        const markerElement = document.createElement('div');
        markerElement.className = 'purchase-marker';
        markerElement.style.height = canvas.height + 'px';
        markerElement.style.left = xPos + 'px';
        
        const priceLabel = document.createElement('div');
        priceLabel.className = 'purchase-price';
        priceLabel.textContent = `$${marker.price.toFixed(2)}`;
        priceLabel.style.left = xPos + 'px';
        
        chartContainer.appendChild(markerElement);
        chartContainer.appendChild(priceLabel);
    });
}