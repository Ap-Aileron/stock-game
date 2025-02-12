import { 
    price,
    priceHistory,
    purchaseMarkers 
} from './global.js';

import { clearPurchaseMarkers } from './clearPurchaseMarkers.js';

const chartContainer = document.getElementById('chart-container');
const canvas = document.getElementById('price-chart');
const ctx = canvas.getContext('2d');

const hoverPrice = document.createElement('div');
hoverPrice.className = 'hover-price';
chartContainer.appendChild(hoverPrice);

let mouseX = 0;
let lastPrice = 0;

function handleHover(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    const index = Math.floor((mouseX / canvas.width) * (priceHistory.length - 1));
    
    if (index >= 0 && index < priceHistory.length) {
        const price = priceHistory[index];
        hoverPrice.style.display = 'block';
        hoverPrice.style.left = `${e.clientX - 50}px`;  
        hoverPrice.style.top = `${e.clientY - 40}px`;  
        hoverPrice.textContent = `Price: $${price.toFixed(2)}`;
        drawChart(); 
    }
}

function drawVerticalLine() {
    if (mouseX > 0) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.moveTo(mouseX, 0);
        ctx.lineTo(mouseX, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);
    }
}

function drawChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
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
    drawVerticalLine();
}

export function drawLineChart(ctx, canvas) {
    canvas.removeEventListener('mousemove', handleHover);
    canvas.removeEventListener('mouseout', () => {
        hoverPrice.style.display = 'none';
        mouseX = 0;
        drawChart();
    });
    
    canvas.addEventListener('mousemove', handleHover);
    canvas.addEventListener('mouseout', () => {
        hoverPrice.style.display = 'none';
        mouseX = 0;
        drawChart();
    });
    
    if (lastPrice !== price) {
        lastPrice = price;
        drawChart();
    }
    
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
