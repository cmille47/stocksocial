const fs = require('fs');
const parse = require('csv-parser');
const Parse = require('parse/node');

// Initialize Parse with your Back4App credentials
Parse.initialize(
    "CFFw5eAHjZZTRjyaBeNL5d3gPcCsMvuBABU8ihJ9", //APP_ID
    "qNxy0Yirqeh2M1XBicNvxKV9TcR3swF80PXyk9B1", // JAVASCRIPT_KEY
    "PazJuUlwi6iE2IDOFkohbXkRDynJcyaPI74O9ZJ4" // MASTER_KEY
  );
Parse.serverURL = 'https://parseapi.back4app.com/';

// Read and parse the CSV file
const stocksData = [];

fs.createReadStream('../../Desktop/constituents_csv.csv')
  .pipe(parse({ headers: ['Symbol', 'Name', 'Sector']}))
  .on('data', (row) => {
    stocksData.push(row);
  })
  .on('end', async () => {
    // Insert data into the Back4App database
    const Stock = Parse.Object.extend('Stock');

    for (const stock of stocksData) {
      const stockObject = new Stock();
      stockObject.set('ticker', stock.Symbol);
      stockObject.set('name', stock.Name);

      try {
        await stockObject.save();
        console.log('Stock saved:', stockObject.toJSON());
      } catch (error) {
        console.error('Error saving stock:', error);
      }
    }
  });
