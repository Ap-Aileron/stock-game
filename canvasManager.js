let canvas = null;
let ctx = null;

export function initCanvas() {
    canvas = document.getElementById('price-chart');
    ctx = canvas.getContext('2d');
    return { canvas, ctx };
}

export function getCanvasContext() {
    if (!ctx) {
        const { canvas: newCanvas, ctx: newContext } = initCanvas();
        canvas = newCanvas;
        ctx = newContext;
    }
    return { canvas, ctx };
}

export function setupHoverListener(canvas, priceHistory) {
    const hoverPrice = document.createElement('div');
    hoverPrice.className = 'hover-price';
    canvas.parentElement.appendChild(hoverPrice);
    
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const index = Math.floor((x / canvas.width) * (priceHistory.length - 1));
        
        if (index >= 0 && index < priceHistory.length) {
            hoverPrice.style.display = 'block';
            hoverPrice.style.left = `${e.clientX}px`;
            hoverPrice.style.top = `${e.clientY - 25}px`;
            hoverPrice.textContent = `$${priceHistory[index].toFixed(2)}`;
        }
    });

    canvas.addEventListener('mouseout', () => {
        hoverPrice.style.display = 'none';
    });
}
