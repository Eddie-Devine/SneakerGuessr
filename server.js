//node modules
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');

//read sneakers.json
let allowedSneakers;
fs.readFile('sneakers.json', (err, data) => {
    data = JSON.parse(data);
    allowedSneakers = data.sneakers;
    console.log('Read in sneakers.json');
});

//server setup
const app = express();
app.use(cookieParser());

//routes for files
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', res => res.sendFile(path.join(__dirname, 'public', 'index.html')));

//summary page
app.get('/summary', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'summary.html'));
});

//price game
app.get('/price', (req, res) => {
    console.log(req.cookies.sneakers);
    //console.log((req.cookies.sneakers.match(/_/g) < 6));
    if(!req.cookies.sneakers || (req.cookies.sneakers.match(/_/g).length < 6)){ //if sneakers cookie does not exist or sneaker cookie is less than 5 sneakers

        return res.redirect('/'); //send user to start screen
    }
    res.sendFile(path.join(__dirname, 'public', 'priceGame.html'));
});

//format json file into js file for front end
app.get('/js/sneakers.js', (req, res) => {
    let sneakerStr = '';
    allowedSneakers.forEach(sneaker => sneakerStr += `'${sneaker}', `);
    res.status(200).send(`const sneakers = [${sneakerStr}];`);
});

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
        let cleanedProducts = []; //array of usable products
        products.forEach(product => { //sort out unusable products
            if(product.retailPrice) cleanedProducts.push(product);
        });
        let random = Math.floor(Math.random() * products.length); //create random number for index
        const selectedSneaker = cleanedProducts[random]; //select random product
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