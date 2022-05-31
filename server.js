//node modules
const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();
const express = require('express');
const path = require('path');
const WebSocket = require('ws');

const cookieParser = require('cookie-parser');

//server setup
const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({
    server: server
});

//routes for files
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', res => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/name', (req, res) => res.sendFile(path.join(__dirname, 'public', 'nameGame.html')));

//start listening for requests
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Listening on port ${port}.`));

//websocket handlers
wss.on('connection', connection => {
    console.log('Connection!!!!');

    connection.on('message', message => {
        message = JSON.parse(message);

        if(message['type'] == 'sneakerPreference'){
            let sneakerPreference = message['data'].split('_');
            connection['sneakerPreference'] = sneakerPreference.filter(sneaker => {
                return sneaker != '';
            });
            console.log(connection['sneakerPreference']);

            connection.send(`{ "type": "image", "data": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Germanvegetariansausage.jpg/1200px-Germanvegetariansausage.jpg" }`);
        }

    });
});

// sneaks.getProducts("vans", 10, function(err, products){
//     console.log(products);
// });

sneaks.getProductPrices("GX9662", function(err, product){
    console.log(product);
});