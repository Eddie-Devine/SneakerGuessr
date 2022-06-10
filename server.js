//node modules
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();
const express = require('express');
const path = require('path');
const fs = require('fs');

//read sneakers.json
let allowedSneakers;
fs.readFile('sneakers.json', (err, data) => {
    data = JSON.parse(data);
    allowedSneakers = data.sneakers;
    console.log('Read in sneakers.json');
});

//server setup
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//routes for files
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', res => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/name', (req, res) => res.sendFile(path.join(__dirname, 'public', 'nameGame.html')));
app.get('/price', (req, res) => res.sendFile(path.join(__dirname, 'public', 'priceGame.html')));

//request sneaker data
app.get('/sneaker', (req, res) => {
    if(!req.query.sneaker){
        return res.status(422).send('Request was missing a sneaker parameter.');
    }
    else if(!allowedSneakers.includes(req.query.sneaker)){ //if requested sneaker is not whitelisted
        return res.status(422).send(`The requested sneaker "${req.query.sneaker}" could not be verified.`);
    }
    const sneaker = req.query.sneaker + ' '; //added space to sort out non perfect matches

    sneaks.getProducts(sneaker, 10, function(err, products){
        const random = Math.floor(Math.random() * products.length);
        const selectedSneaker = products[random];
        console.log(selectedSneaker);

        res.status(200).send(JSON.stringify(selectedSneaker));
    });
});

//start listening for requests
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}.`));

// sneaks.getProducts("Jordan 1", 10, function(err, products){
//     console.log(products);
// });

// sneaks.getProductPrices("555088-108", function(err, product){
//     console.log(product);
// });