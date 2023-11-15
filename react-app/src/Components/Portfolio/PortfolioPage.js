const PortfolioPage = ({ portfolio, positions, val}) => {
    return (
        <div>
            {(portfolio) &&
                <div>
                    <h2> Portfolio Name: {portfolio.get("PortfolioName")} </h2>
                    <h2> Current Value: {"$" + val} </h2>
                </div>
            }
            <h2> Positions: </h2>
            {positions.length > 0 && (
                <ul>
                    {positions.map((position) => (
                        <li key={position.id}>
                            <a href={`/Position/${encodeURIComponent(position.get('StockID'))}/${position.id}`}>
                                {position.get('stockName') + " " + position.get('stockTicker') + ", current value: $" + Math.round(position.get('EndPrice') * position.get('Shares'), 4)}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PortfolioPage;