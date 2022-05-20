const divs = document.querySelectorAll('.checkboxes');
let currentDiv = 0;
let maxChildren;
sneakers.forEach(sneaker => {
    divs[currentDiv].innerHTML += `<label class="toggle"><input class="toggle__input" type="checkbox" name="${sneaker}"><span class="toggle__label"><span class="toggle__text">${sneaker}</span></span></label>`;
    const distance = divs[currentDiv].getBoundingClientRect().bottom;
    console.log(distance);

    if(currentDiv == 0){
        if(distance >= window.innerHeight - ((15 / 100) * window.innerHeight)){
            console.log('too far!');
            maxChildren = divs[currentDiv].childElementCount;
            currentDiv++;
        }
    }
    else{
        if(divs[currentDiv].childElementCount == maxChildren) currentDiv++;
    }
});

document.querySelector('.start').addEventListener('click', () => {
    let selectedShoes = [];
    document.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
        if(checkbox.checked) selectedShoes.push(checkbox.name);
    });
    console.log(selectedShoes);
});