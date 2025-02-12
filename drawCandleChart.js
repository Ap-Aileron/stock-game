import { 
    candleData,
} from './global.js';

export function drawCandleChart(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!candleData.length) return;
    
    const chartHeight = canvas.height * 1;
    const verticalOffset = (canvas.height - chartHeight) / 2;
    
    const totalCandles = 20;
    const candleWidth = Math.floor(canvas.width / (totalCandles * 2.5));
    const widthPadding = Math.max(1, candleWidth / 7); 
    
    const highPrices = candleData.map(d => d.high);
    const lowPrices = candleData.map(d => d.low);
    const maxPrice = Math.max(...highPrices);
    const minPrice = Math.min(...lowPrices);
    const priceRange = maxPrice - minPrice;
    
    const paddingPercentage = 0.03;
    const paddedMin = minPrice - (priceRange * paddingPercentage);
    const paddedMax = maxPrice + (priceRange * paddingPercentage);
    const paddedRange = paddedMax - paddedMin;
    
    const yScale = chartHeight / paddedRange;
    
    candleData.forEach((candle, i) => {
        const x = (i * candleWidth * 1.1) + candleWidth + (canvas.width * 0.00);
        
        const open = verticalOffset + chartHeight - ((candle.open - paddedMin) * yScale);
        const close = verticalOffset + chartHeight - ((candle.close - paddedMin) * yScale);
        const high = verticalOffset + chartHeight - ((candle.high - paddedMin) * yScale);
        const low = verticalOffset + chartHeight - ((candle.low - paddedMin) * yScale);
        
        const isGreen = candle.close > candle.open;
        const color = isGreen ? '#32CD32' : '#DC143C';
        
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.shadowColor = 'rgba(0,0,0,0.1)';
        ctx.shadowBlur = 1;
        ctx.moveTo(x, high);
        ctx.lineTo(x, low);
        ctx.stroke();
        
        ctx.shadowColor = 'transparent';
        
        const candleBodyWidth = candleWidth - widthPadding;
        const candleBodyHeight = Math.abs(close - open);
        
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
        
        ctx.strokeStyle = isGreen ? '#228B22' : '#8B0000';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(
            x - candleBodyWidth / 2,
            Math.min(open, close),
            candleBodyWidth,
            Math.max(1, candleBodyHeight)
        );
    });
    
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i <= 3; i++) {
        const y = verticalOffset + (chartHeight * i / 3);
        ctx.beginPath();
        ctx.moveTo(canvas.width * 0.05, y);
        ctx.lineTo(canvas.width * 0.95, y);
        ctx.stroke();
    }
}
