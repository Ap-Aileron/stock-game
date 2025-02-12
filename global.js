export let price = 100;
export let timeIndex = 0;
export let priceHistory = [];
export let purchaseMarkers = [];
export let portfolioValue = 0;
export let candleData = [];
export let isLineChart = true;
export let shares = 0;
export let balance = 1000;

export const setPrice = (newPrice) => price = newPrice;
export const setTimeIndex = (newIndex) => timeIndex = newIndex;
export const setPriceHistory = (newHistory) => priceHistory = newHistory;
export const setPurchaseMarkers = (newMarkers) => purchaseMarkers = newMarkers;
export const setPortfolioValue = (newValue) => portfolioValue = newValue;
export const setCandleData = (newData) => candleData = newData;
export const setIsLineChart = (newValue) => isLineChart = newValue;
export const setShares = (newShares) => shares = newShares;
export const setBalance = (newBalance) => balance = newBalance;
