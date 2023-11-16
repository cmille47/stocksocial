const PortfolioPage = ({ portfolio, positions}) => {
    return (
        <div>
            {(portfolio) &&
                <div>
                    <h2> Portfolio Name: {portfolio.get("PortfolioName")} </h2>
                    <h2> Current Value: {"$" + portfolio.get("currentValue")} </h2>
                    <h2> Cash: {"$" + portfolio.get("RemainingCash")} </h2>
                </div>
            }
            <h2> Positions: </h2>
            {positions.length > 0 && (
                <ul>
                    {positions.map((position) => (
                        <li key={position.id}>
                            <a href={`/Position/${encodeURIComponent(position.get('StockID'))}/${position.id}`}>
                                {position.get('stockName') + " " + position.get('stockTicker') + ", current value: $" + (position.get('EndPrice') * position.get('Shares')).toFixed(2)}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PortfolioPage;