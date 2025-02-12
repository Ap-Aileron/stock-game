import { 
    price, 
    shares, 
    balance, 
    purchaseMarkers,
    priceHistory,
    setShares,
    setBalance
} from './global.js';

import { updateDisplay } from './updateDisplay.js';

export function buyStock() {
    if (balance >= price) {
        setShares(shares + 1);
        setBalance(balance - price);
        purchaseMarkers.push({
            timeIndex: priceHistory.length - 1,
            price: price
        });
        updateDisplay();
    }
}

export function sellStock() {
    if (shares > 0) {
        setShares(shares - 1);
        setBalance(balance + price);
        updateDisplay();
    }
}
