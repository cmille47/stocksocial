const getDailyChartData = async (stocksymbol) => {
    const apiKey = '942d8f501f25a9ffeacffaafbbdd8270';
    const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${stocksymbol}?apikey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
}

const test = async () => {
    result = await getDailyChartData('AAPL');
    // console.log(result);

    const extractedData = result.historical.map(item => ({
        value: item.close,
        date: item.date
    }));

    console.log(extractedData);
};

test();
