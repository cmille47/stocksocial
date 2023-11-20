import Parse from 'parse';

export const searchForStock = async (term) => {
    const Stock = Parse.Object.extend('Stock');
    const query1 = new Parse.Query(Stock);
    const query2 = new Parse.Query(Stock);

    query1.startsWith('ticker', term.toUpperCase());
    query2.startsWith('name', term.replace(/\b\w/g, (match) => match.toUpperCase()));

    const mainQuery = Parse.Query.or(query1, query2);

    try {
        const results = await mainQuery.find();
        console.log(results)
        return results;
    } catch (error) {
        console.error('Error searching for stock:', error);
        throw error;
    }
};

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