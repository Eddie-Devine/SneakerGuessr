const gameData = JSON.parse(localStorage.getItem('gameData'));
const sneakerDiv = document.querySelector('.sneakersHere');

setTimeout(() => document.querySelector('.pyro').classList.add('fadeAway'), 2000); //fade away fireworks after 2 seconds

document.querySelector('.playButton').addEventListener('click', () => {
    localStorage.removeItem('gameData');
    location.replace('/');
});

//determine whether user in on mobile
var mobile;
if('ontouchstart' in document.documentElement) mobile = true;
else mobile = false;

gameData.questionData.forEach(question => {
    //create time text
    const minutes = Math.floor(question.time / 60);
    let seconds = question.time - minutes * 60;
    if(seconds < 10) seconds = '0' + seconds; //add 0 before single number for aesthetics
    const time = `${minutes}:${seconds}`;

    //create guesses text
    let guessesText = '';
    if(mobile && question.guesses.length);

    for(let i = 0; i < question.guesses.length; i++){
        if(i == question.guesses.length - 1) guessesText += `<span style="color: #1ceb14;">$${question.guesses[i]}</span>`; //last guess is green (correct guess)
        else guessesText += `$${question.guesses[i]}, `;
    }

    //create date text
    const date = new Date(question.sneakerData.release);
    const month = date.toLocaleString('default', { month: 'long' });
    const dateText = `${month} ${date.getDate()}, ${date.getFullYear()}`;

    sneakerDiv.innerHTML += `
    <div class="row sneakerRow">

        <div class="col-lg-3 rightBorder">
            <img src="${question.sneakerData.thumbnail}" class="sneakerImage"></img>
        </div>

        <div class="col-lg-3 rightBorder">
            <p class="sneakerName bumper">${question.sneakerData.shoeName}</p>
            <div class="sneakerDescRow bottomBorder">
                <p class="sneakerDesc">${question.sneakerData.description}</p>
            </div>
        </div>

        <div class="col-lg-3 rightBorder">
            <p class="detail bumper"><span class="bold">Time: </span>${time}</p>
            <p class="detail"><span class="bold">Tries: </span>${question.guesses.length}</p>
            <p class="detail bottomBorder"><span class="bold">Guesses: </span>${guessesText}</p>
        </div>

        <div class="col-lg-3 rightBorder">
            <p class="detail center bumper"><span class="bold">Retail: </span>$${question.sneakerData.retailPrice}</p>

            <div class="row links">
                <div class="col-lg-4 link" onclick="location.href = '${question.sneakerData.stockXLink}'">
                    <p class="detail bold center price">$${question.sneakerData.stockXPrice}</p>
                    <img class="shop" src="images/stockX-logo.png"></img>
                </div>
                <div class="col-lg-4 link" onclick="location.href = '${question.sneakerData.fightClubLink}'">
                    <p class="detail bold center price">$${question.sneakerData.fightClubPrice}</p>
                    <img class="shop" src="images/fightClub-logo.png"></img>
                </div>
                <div class="col-lg-4 link" onclick="location.href = '${question.sneakerData.goatLink}'">
                    <p class="detail bold center price">$${question.sneakerData.goatPrice}</p>
                    <img class="shop" src="images/goat-logo.png"></img>
                </div>
            </div>

            ${mobile ? '' : `<p class="detail"><span class="bold">Release: </span>${dateText}</p>`}
            ${mobile ? '' : `<p class="detail"><span class="bold">Brand: </span>${question.sneakerData.brand}</p>`}
            ${mobile ? '' : `<p class="detail"><span class="bold">ID: </span>${question.sneakerData.ID}</p>`}
        
        </div>

    </div>`;

});