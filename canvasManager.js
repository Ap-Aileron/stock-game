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