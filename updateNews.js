
import { updatePrice } from "./updatePrice.js";

const newsItems = [
    { text: "Company Announces Revolutionary Product Line", impact: 15, positive: true },
    { text: "Quarterly Earnings Exceed Expectations by 50%", impact: 10, positive: true },
    { text: "Major Partnership Announced", impact: 8, positive: true },
    { text: "Company Faces Data Breach: Customer information compromised", impact: -12, positive: false },
    { text: "Company Executives in Scandal: Allegations of misconduct surface", impact: 15, positive: false },
    { text: "Company Loses Major Contract: Key client switches to a competitor", impact: -10, positive: false },
    { text: "Company Loses Major Contract: Key client switches to a Company lay people off in desperation. Stocks expected to plumet", impact: -20, positive: false },
    { text: "Company runs advertising campaign", impact: 0, positive: true },
    { text: "New technology brings new ideas to the table", impact: 1, positive: true },
    { text: "Company takes a move to get rid of Friday as a business day", impact: 0, positive: true },
    { text: "Company is near bankruptcy", impact: -30, positive: false },
    { text: "Company's rival is catching up in sales", impact: -10, positive: false },
    { text: "Company Announces Major Partnership: Collaboration with a leading tech firm", impact: 10, positive: true },
    { text: "Company Faces Legal Issues: Lawsuit filed over patent infringement claims", impact: -6, positive: false },
    { text: "Company Launches New Product Line: Innovative products excite the market.|Good", impact: 16, positive: true },
    { text: "Company Experiences Supply Chain Disruptions: Delays in production and delivery.", impact: -12, positive: false },
    { text: "Company Expands to International Markets: New opportunities for growth.|Good", impact: 17, positive: true },
    { text: "Company Wins Industry Award: Recognized for excellence in innovation.|Good", impact: 15, positive: true }

];

// Update news
export function updateNews() {
    const newsElement = document.getElementById('news-ticker');
    const newsItem = newsItems[Math.floor(Math.random() * newsItems.length)];
    newsElement.textContent = newsItem.text;
    newsElement.className = 'news ' + (newsItem.positive ? 'positive' : 'negative');
    updatePrice(newsItem.impact);
}