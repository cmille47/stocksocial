const SearchPositions = ({ handleSearchTermChange, matchingStocks }) => {
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
                        <li key={stock.id}>
                            {stock.get('ticker')},  {stock.get('name')}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
};

export default SearchPositions;