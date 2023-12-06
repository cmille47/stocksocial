const PortfolioPage = ({ portfolio, activePositions, inactivePositions, onClick}) => {
    
    
    return (
        <div>
            {(portfolio) &&
                <div>
                    <h2> Portfolio Name: {portfolio.get("PortfolioName")} </h2>
                    
                    <h2> Current Value: {"$" + (portfolio.get("currentValue") ? portfolio.get("currentValue").toFixed(2) : 'N/A')} </h2>

                    <h2> Cash: {"$" + portfolio.get("RemainingCash").toFixed(2)} </h2>
                </div>
            }
            <h2> Active Positions: </h2>
            {activePositions.length > 0 && (
                <ul>
                    {activePositions.map((position) => (
                        <li key={position.id} 
                            data-ticker={position.get('stockTicker')} 
                            data-position={position.id}
                            onClick={onClick}
                        >
                            {position.get('stockName') + " " + position.get('stockTicker') + ", current value: $" + (position.get('EndPrice') * position.get('Shares')).toFixed(2)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PortfolioPage;