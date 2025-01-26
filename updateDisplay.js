import { 
    price, 
    shares, 
    balance, 
} from './global.js';

export function updateDisplay() {
    document.getElementById('portfolio-value').textContent = 
        `$${(shares * price).toFixed(2)}`;
    document.getElementById('shares-owned').textContent = 
        `${shares} shares`;
    document.getElementById('cash-balance').textContent = 
        `$${balance.toFixed(2)}`;
    document.getElementById('current-price').textContent = 
        `$${price.toFixed(2)}`;
}