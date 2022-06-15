//add keypad of user is on mobile
const keyPadRow = document.querySelector('.keyPadRow');
if('ontouchstart' in document.documentElement) keyPadRow.classList.remove('d-none'); //if touch screen reveal touchpad 
document.addEventListener('touchstart', event => keyPadRow.classList.remove('d-none')); //if user touches screen reveal touchpad

const newSneaker = async () => {
    sneakerImage.src = '/images/Loading.gif';
    sneakerName.innerText = 'Loading...';
    textBox.value = '';
    if(!sneakerList.length) return alert('done!'); //end game when out of sneakers
    console.log(sneakerList);
    sneaker = sneakerList[0]; //pick first sneaker out of curated sneaker list
    sneaker = sneaker.replace(/\s/g, '+'); //replace all spaces with + for http query

    let response = await fetch(`/sneaker?sneaker=${sneaker}`);
    if(response.status == 200){ //server liked request
        response = await response.json();

        //update game data
        let questionObject = {
            sneakerData: {
                thumbnail: response.thumbnail,
                shoeName: response.shoeName,
                description: response.description,
                retailPrice: response.retailPrice,
                release: response.releaseDate,
                brand: response.brand,
                ID: response.styleID
            },
            time: 0,
            guesses: [],
        }

        //add store prices if given by sneaks API
        if(response.lowestResellPrice.stockX) questionObject.sneakerData.SXPrice = response.lowestResellPrice.stockX;
        if(response.lowestResellPrice.goat) questionObject.sneakerData.GPrice = response.lowestResellPrice.goat;
        if(response.lowestResellPrice.flightClub) questionObject.sneakerData.FCPrice = response.lowestResellPrice.flightClub;

        //add store links if given by sneaks API
        if(response.resellLinks.stockX) questionObject.sneakerData.SXLink = response.resellLinks.stockX;
        if(response.resellLinks.flightClub) questionObject.sneakerData.FCLink = response.resellLinks.flightClub;
        if(response.resellLinks.goat) questionObject.sneakerData.GLink = response.resellLinks.goat;
        
        gameData.questionData.push(questionObject);
        gameData.sneakerList = sneakerList;
        document.cookie = 'gameData=' + JSON.stringify(gameData);
        console.log(`Added ${gameData.questionData[gameData.questionData.length - 1].sneakerData.shoeName}`);

        time = true; //start timing user

        //update front end to display new sneaker
        sneakerImage.src = response.thumbnail; //change image to new sneaker
        sneakerName.innerText = response.shoeName; //update sneaker name
        price = response.retailPrice; //change price to new sneaker
        allowGuess = true; //allow user to guess for new sneaker
    }
    else{ //something went wrong
        Swal.fire({
            title: 'Something went wrong...',
            html: `${await response.text()}<br>(code ${response.status})`,
            icon: 'error',
            confirmButtonText: 'Try Again',
        }).then(() => window.location.href = '/');
    }
}

const checkGuess = () => {
    if(!allowGuess) return; //do not take guess if not ready
    if(!textBox.value) return; //do not take empty guess

    let guess = textBox.value;

    const minGuess = price - 20;
    const maxGuess = price + 20;

    if(guess <= maxGuess && guess >= minGuess){ //guess is in range
        allowGuess = false; //do not take more guesses for now
        time = false; //stop timer
        sneakerList.shift(); //remove guessed sneaker from list
        progressBar.style.width = `${(5 - sneakerList.length)*20}%`;
        newSneaker();
    }
    else if(guess < minGuess){ //guess it too low
        hint.innerText = 'higher';
        hint.classList.add('higher'); //trigger animation

        setTimeout(() => hint.classList.remove('higher'), 1310); //remove class after animation is finished
    }
    else{ //guess is too high
        hint.innerText = 'lower';
        hint.classList.add('lower'); //trigger animation

        setTimeout(() => hint.classList.remove('lower'), 1310); //remove class after animation is finished
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if(parts.length === 2) return parts.pop().split(';').shift();
}

const progressBar = document.querySelector('.bar')
const sneakerImage = document.querySelector('.sneakerImage');
const sneakerName = document.querySelector('.name');
const hint = document.querySelector('.hint');
const textBox = document.querySelector('.textBox');
textBox.select(); //select text box for user

let sneakerPrefrence = document.cookie.split('_').slice(1, -1); //parse cookie to get array of sneakers

let sneakerList = [];
let prevRandom; //prevous random number (used to prevent repeats)
for(let i = 0; i < 5; i++){ //pick 5 sneakers out of perfered sneakers
    let random = Math.floor(Math.random() * sneakerPrefrence.length); //generate random number to use as index in sneaker prefrence
    while(random == prevRandom) random = Math.floor(Math.random() * sneakerPrefrence.length); //regenerate if number was generated last time (prevents repeats)
    prevRandom = random; //rember random number for next loop
    sneakerList.push(sneakerPrefrence[random]);
}

let allowGuess = false;
let time = false;
let price;

//if gameData has not been set (new game)
if(!getCookie('gameData')){
    //create gameData
    var gameData = {
        sneakerList: sneakerList,
        questionData: []
    };
    newSneaker(); //start game by pulling first sneaker data
}
else { //resume game
    var gameData = JSON.parse(getCookie('gameData'));
    sneakerList = gameData.sneakerList;
    progressBar.style.width = `${(5 - sneakerList.length)*20}%`;
    
    sneakerImage.src = gameData.questionData[gameData.questionData.length - 1].sneakerData.thumbnail; //change image to new sneaker
    sneakerName.innerText = gameData.questionData[gameData.questionData.length - 1].sneakerData.shoeName; //update sneaker name
    price = gameData.questionData[gameData.questionData.length - 1].sneakerData.retailPrice; //change price to new sneaker
    allowGuess = true; //allow user to guess for new sneaker
}

window.addEventListener('keydown', event => {
    if(event.keyCode == 192) textBox.value = price;
});

textBox.addEventListener('keydown', event => {
    if(event.keyCode == 13) checkGuess();
});

document.querySelectorAll('.letter').forEach(element => {
    element.addEventListener('click', event => {
        if(event.target.innerText == '<') textBox.value = textBox.value.slice(0, -1);
        else if(event.target.innerText == 'return') checkGuess();
        else textBox.value += event.target.innerText;
    });
});

const timer = setInterval(() => {
    if(time){
        gameData.questionData[gameData.questionData.length - 1].time++; //increase the questions time by 1 every second
    }
}, 1000);