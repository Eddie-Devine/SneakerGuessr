const newSneaker = () => {
    textBox.value = '';
    if(!sneakerList.length) return alert('done!'); //end game when out of sneakers
    console.log(sneakerList);
    sneaker = sneakerList[0]; //pick first sneaker out of curated sneaker list
    sneaker = sneaker.replace(/\s/g, '+'); //replace all spaces with + for http query
    fetch(`/sneaker?sneaker=${sneaker}`)
        .then(response => response.json())
        .then(data => {
            sneakerImage.src = data.thumbnail; //change image to new sneaker
            price = data.retailPrice; //change price to new sneaker
            allowGuess = true; //allow user to guess for new sneaker
        });
}

const progressBar = document.querySelector('.bar')
const sneakerImage = document.querySelector('.sneakerImage');
const textBox = document.querySelector('.textBox');
textBox.select(); //select text box for user

let sneakerPrefrence = document.cookie.split('_').slice(1, -1); //parse cookie to get array of sneakers

let sneakerList = [];
let prevRandom; //prevous random number (used to prevent repeats)
for(let i = 0; i < 10; i++){ //pick 10 sneakers out of perfered sneakers
    let random = Math.floor(Math.random() * sneakerPrefrence.length); //generate random number to use as index in sneaker prefrence
    while(random == prevRandom) random = Math.floor(Math.random() * sneakerPrefrence.length); //regenerate if number was generated last time (prevents repeats)
    prevRandom = random; //rember random number for next loop
    sneakerList.push(sneakerPrefrence[random]);
}

let allowGuess = false;
let price;
newSneaker(); //start game by pulling first sneaker data

textBox.addEventListener('keydown', event => {
    if(!allowGuess) return; //do not take guess if not ready
    if(!textBox.value) return; //do not take empty guess
    if(event.keyCode != 13) return; //only trigger from enter key

    let guess = textBox.value;

    const minGuess = price - 20;
    const maxGuess = price + 20;

    if(guess <= maxGuess && guess >= minGuess){
        alert('yes!');
        allowGuess = false; //do not take more guesses for now
        sneakerList.shift(); //remove guessed sneaker from list
        progressBar.style.width = `${(10 - sneakerList.length)*10}%`;
        newSneaker();
    }
    else alert('no!');
});