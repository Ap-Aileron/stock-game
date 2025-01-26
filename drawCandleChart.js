import { 
    candleData,
} from './global.js';

export function drawCandleChart(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!candleData.length) return;
    
    // Use only 60% of canvas height, centered (reduced from 80%)
    const chartHeight = canvas.height * 1;
    const verticalOffset = (canvas.height - chartHeight) / 2;
    
    // Adjust candle width and spacing for more compact display
    const totalCandles = 20;
    const candleWidth = Math.floor(canvas.width / (totalCandles * 2.5));
    const widthPadding = Math.max(1, candleWidth / 7); // Reduced padding
    

    
    // Calculate price range
    const highPrices = candleData.map(d => d.high);
    const lowPrices = candleData.map(d => d.low);
    const maxPrice = Math.max(...highPrices);
    const minPrice = Math.min(...lowPrices);
    const priceRange = maxPrice - minPrice;
    
    // Add 3% padding to price range (reduced from 5%)
    const paddingPercentage = 0.03;
    const paddedMin = minPrice - (priceRange * paddingPercentage);
    const paddedMax = maxPrice + (priceRange * paddingPercentage);
    const paddedRange = paddedMax - paddedMin;
    
    const yScale = chartHeight / paddedRange;
    
    // Draw each candle
    candleData.forEach((candle, i) => {
        // Calculate x position with 5% margins (reduced from 10%)
        const x = (i * candleWidth * 1.1) + candleWidth + (canvas.width * 0.00);
        
        // Convert prices to y coordinates
        const open = verticalOffset + chartHeight - ((candle.open - paddedMin) * yScale);
        const close = verticalOffset + chartHeight - ((candle.close - paddedMin) * yScale);
        const high = verticalOffset + chartHeight - ((candle.high - paddedMin) * yScale);
        const low = verticalOffset + chartHeight - ((candle.low - paddedMin) * yScale);
        
        const isGreen = candle.close > candle.open;
        const color = isGreen ? '#32CD32' : '#DC143C';
        
        // Draw wick with minimal shadow
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.shadowColor = 'rgba(0,0,0,0.1)';
        ctx.shadowBlur = 1;
        ctx.moveTo(x, high);
        ctx.lineTo(x, low);
        ctx.stroke();
        
        ctx.shadowColor = 'transparent';
        
        // Draw candle body
        const candleBodyWidth = candleWidth - widthPadding;
        const candleBodyHeight = Math.abs(close - open);
        
        // Simplified gradient
        const gradient = ctx.createLinearGradient(
            x - candleBodyWidth / 2,
            0,
            x + candleBodyWidth / 2,
            0
        );
        
        if (isGreen) {
            gradient.addColorStop(0, '#32CD32');
            gradient.addColorStop(1, '#228B22');
        } else {
            gradient.addColorStop(0, '#DC143C');
            gradient.addColorStop(1, '#B22222');
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(
            x - candleBodyWidth / 2,
            Math.min(open, close),
            candleBodyWidth,
            Math.max(1, candleBodyHeight)
        );
        
        // Minimal border
        ctx.strokeStyle = isGreen ? '#228B22' : '#8B0000';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(
            x - candleBodyWidth / 2,
            Math.min(open, close),
            candleBodyWidth,
            Math.max(1, candleBodyHeight)
        );
    });
    
    // Subtle grid lines (reduced number)
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 0.5;
    
    // Horizontal grid lines (reduced to 4)
    for (let i = 0; i <= 3; i++) {
        const y = verticalOffset + (chartHeight * i / 3);
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.05, y);
        ctx.lineTo(canvas.width * 0.95, y);
        ctx.stroke();
    }
}