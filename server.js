//node modules
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();
const express = require('express');
const path = require('path');
const req = require('express/lib/request');

//express server setup
const app = express();
const port = process.env.PORT || 5000;
//routes for files
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', res => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/name', (req, res) => res.sendFile(path.join(__dirname, 'public', 'name.html')));
//start listening for requests
app.listen(port, () => console.log(`Listening on port ${port}.`));

// sneaks.getProducts("vans", 10, function(err, products){
//     console.log(products);
// });

// sneaks.getProductPrices("GX9662", function(err, product){
//     console.log(product);
// });