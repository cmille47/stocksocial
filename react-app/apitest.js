require('dotenv').config();

const basePath = "https://finnhub.io/api/v1";

/**
 * Searches best stock matches based on a user's query
 * @param {string} query - The user's query, e.g. 'fb'
 * @returns {Promise<Object[]>} Response array of best stock matches
 */
const searchSymbol = async (query) => {
    const url = `${basePath}/search?q=${query}&token=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
};


/**
 * Fetches the details of a given company
 * @param {string} stockSymbol - Symbol of the company, e.g. 'FB'
 * @returns {Promise<Object>} Response object
 */
const fetchStockDetails = async (stockSymbol) => {
    const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
};

/**
 * Fetches the latest quote of a given stock
 * @param {string} stockSymbol - Symbol of the company, e.g. 'FB'
 * @returns {Promise<Object>} Response object
 */
const fetchQuote = async (stockSymbol) => {
    const url = `${basePath}/quote?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
};

const fetchFinancials = async (stockSymbol) => {
    const url = `${basePath}/stock/metric?symbol=${stockSymbol}&metric=all&token=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    return await response.json();
};


const test = async () => {
    try {
        const res = await fetchFinancials('aapl');
        console.log(res);
    } catch (error) {
        console.error(error);
    }
};

test();