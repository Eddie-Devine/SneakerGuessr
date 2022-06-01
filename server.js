//node modules
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();
const express = require('express');
const path = require('path');

const cookieParser = require('cookie-parser');

//server setup
const app = express();

//routes for files
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', res => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/name', (req, res) => res.sendFile(path.join(__dirname, 'public', 'nameGame.html')));
app.get('/price', (req, res) => res.sendFile(path.join(__dirname, 'public', 'priceGame.html')));

//start listening for requests
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}.`));

// sneaks.getProducts("Jordan 1", 10, function(err, products){
//     console.log(products);
// });

// sneaks.getProductPrices("GX9662", function(err, product){
//     console.log(product);
// });