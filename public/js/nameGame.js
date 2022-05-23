const socket = new WebSocket('ws://localhost:5000');

socket.addEventListener('open', event => {
    console.log('opened');
    socket.send(`{ "type": "sneakerPreference", "data": "${document.cookie}" }`);
});

socket.addEventListener('message', event => {
    console.log('message: ' + event.data);

    const message = JSON.parse(event.data);

    if(message['type'] == 'image'){
        document.querySelector('.sneakerImage').src = message['data'];
    }
});

socket.addEventListener('close', event => {
    console.log('closed: ' + event.code);
});

socket.addEventListener('error', event => {
    console.log('error: ' + event);
});

