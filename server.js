//node modules
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();
const express = require('express');
const path = require('path');

//express server setup
const app = express();
const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.listen(port, () => console.log(`Listening on port ${port}.`));

// sneaks.getProducts("vans", 10, function(err, products){
//     console.log(products);
// });

// sneaks.getProductPrices("GX9662", function(err, product){
//     console.log(product);
// });