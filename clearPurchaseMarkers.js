export function clearPurchaseMarkers() {
    const chartContainer = document.getElementById('chart-container')
    const markers = chartContainer.getElementsByClassName('purchase-marker');
    const prices = chartContainer.getElementsByClassName('purchase-price');
    while (markers.length > 0) markers[0].remove();
    while (prices.length > 0) prices[0].remove();
}
