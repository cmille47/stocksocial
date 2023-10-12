import Parse from 'parse';

// store stock names and ticker for rapid lookup
// and use for API calls
export const createStock = (ticker, name) => {
    const Stock = Parse.Object.extend('Stock');
    const query = new Parse.Query(Stock);
    query.equalTo('ticker', ticker);
    query.equalTo('name', name);

    const combinedQuery = Parse.Query.and(query);

    combinedQuery.first().then((existingStock) => {
        if (existingStock) {
            console.log('Stock already exists', existingStock);
        }
        else {
            const stock = new Stock();
            stock.set('ticker', ticker);
            stock.set('name', name);
            stock.save().then((stock) => {
                console.log('Stock created', stock);
            }, (error) => {
                console.log('Error creating stock', error);
            });
        };
    }, (error) => {
        console.log('Error finding stock', error);
    });
};