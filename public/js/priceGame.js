const textBox = document.querySelector('.textBox');
textBox.select(); //select text box for user

let sneakerPrefrence = document.cookie.split('_').slice(1, -1); //parse cookie to get array of sneakers
console.log(sneakerPrefrence);

let sneakerList = [];
let prevRandom; //prevous random number (used to prevent repeats)
for(let i = 0; i < 10; i++){ //pick 10 sneakers out of perfered sneakers
    let random = Math.floor(Math.random() * sneakerPrefrence.length); //generate random number to use as index in sneaker prefrence
    while(random == prevRandom) random = Math.floor(Math.random() * sneakerPrefrence.length); //regenerate if number was generated last time (prevents repeats)
    prevRandom = random; //rember random number for next loop
    sneakerList.push(sneakerPrefrence[random]);
}

console.log(sneakerList);

textBox.addEventListener('keydown', event => {
    if(event.keyCode != 13) return; //only trigger from enter key

    let guess = textBox.value;
});