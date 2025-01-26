
import { updatePrice } from "./updatePrice.js";

const newsItems = [
    { text: "Company Announces Revolutionary Product Line", impact: 15, positive: true },
    { text: "Quarterly Earnings Exceed Expectations by 50%", impact: 10, positive: true },
    { text: "Major Partnership Announced", impact: 8, positive: true },
    { text: "Supply Chain Disruptions Reported", impact: -12, positive: false },
    { text: "CEO Unexpectedly Resigns", impact: -15, positive: false },
    { text: "Regulatory Investigation Announced", impact: -10, positive: false }
];

// Update news
export function updateNews() {
    const newsElement = document.getElementById('news-ticker');
    const newsItem = newsItems[Math.floor(Math.random() * newsItems.length)];
    newsElement.textContent = newsItem.text;
    newsElement.className = 'news ' + (newsItem.positive ? 'positive' : 'negative');
    newsElement.onclick = () => {
        updatePrice(newsItem.impact);
    };
}