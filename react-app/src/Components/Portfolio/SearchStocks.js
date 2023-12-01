const SearchPositions = ({ handleSearchTermChange, matchingStocks, onClick }) => {
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search for stocks..."
                onChange={handleSearchTermChange}
                className="search-bar"
            />
            {matchingStocks.length > 0 && (
                <ul className="matching-stocks-list">
                    {matchingStocks.slice(0,10).map((stock) => (
                        <li key={stock.id} 
                            data-ticker={stock.get('ticker')}
                            onClick={onClick}
                        >
                            {stock.get('ticker')},  {stock.get('name')}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
};

export default SearchPositions;