const PortfolioPage = ({ portfolio, positions }) => {
    return (
        <div>
            {(portfolio) &&
                <div>
                    <h2> Portfolio Name: {portfolio.get("PortfolioName")} </h2>
                    <h2> Remaining Cash: {portfolio.get("RemainingCash")} </h2>
                </div>
            }
            <h2> Positions: </h2>
            {/* Still working on getting stock data using api for this part but loading in and retrieving of all data is working */}
            IN PROGRESS
            {positions.length > 0 && (
                <ul>
                    {positions.map((position) => (
                        <li key={position.id}>
                            {/* May want to change positions to record both stock name and ticker instead of the stockID thing */}
                            <a href={`/Position/${encodeURIComponent(position.get('StockID'))}/${position.id}`}>
                                {position.get('StockID')}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PortfolioPage;