const divs = document.querySelectorAll('.checkboxes'); //each checkbox column
let currentDiv = 0; //current column being added to
let maxChildren; //max number of checkboxes a column can hold
const boost = document.querySelector('.gamemodes').offsetHeight + 50; //how much more early the column will fill to leave room for the buttons (pixels)

sneakers.forEach(sneaker => {
    divs[currentDiv].innerHTML += `<label class="toggle"><input class="toggle__input" type="checkbox" name="${sneaker}" ${!document.cookie || document.cookie.includes('_' + sneaker + '_') ? 'checked' : ''}><span class="toggle__label"><span class="toggle__text">${sneaker}</span></span></label>`;
    const distance = divs[currentDiv].getBoundingClientRect().bottom; //distance to bottom of screen

    //if on the first column measure by distance from bottom
    if(currentDiv == 0){
        if(distance >= window.innerHeight - boost){
            maxChildren = divs[currentDiv].childElementCount;
            currentDiv++;
        }
    }
    else{ //otherwise measure by number of children
        if(divs[currentDiv].childElementCount == maxChildren) currentDiv++;
    }
});

document.querySelector('.start').addEventListener('click', () => {
    let selectedShoes = [];
    document.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
        if(checkbox.checked) selectedShoes.push(checkbox.name);
    });
    //underscores added for consistancy when reading saved shoes
    document.cookie = '_' + selectedShoes.join('_') + '_';
});