import { 
    price, 
    shares, 
    balance, 
    purchaseMarkers,
    priceHistory,
    // Import the setter functions
    setShares,
    setBalance
} from './global.js';

import { updateDisplay } from './updateDisplay.js';

// Buy stock
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

// Sell stock
export function sellStock() {
    if (shares > 0) {
        setShares(shares - 1);
        setBalance(balance + price);
        updateDisplay();
    }
}
