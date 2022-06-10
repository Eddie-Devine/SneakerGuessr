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

const startButtons = document.querySelectorAll('.start');
for(let i = 0; i < 3; i++){ //used for loop to know which link to redirect to (based off of i)
    startButtons[i].addEventListener('click', () => {
        let selectedShoes = [];
        const checkboxes = document.querySelectorAll('input[type=checkbox]')
        checkboxes.forEach(checkbox => {
            if(checkbox.checked) selectedShoes.push(checkbox.name);
        });
        if(selectedShoes.length < 5){
            Swal.fire({
                text: 'Please select more than 5 sneakers.',
                showDenyButton: true,
                denyButtonText: 'Pick for me',
            })
            .then(result => {
                if(!result.isConfirmed){ //pick for the user
                    for(let i = 0; i < (5 - selectedShoes.length);){ //loop 5 times, subtract already selected
                        const random = Math.floor(Math.random() * checkboxes.length); //generate random number to use as index in checkboxes array
                        const selectedCheckbox = checkboxes[random];
                        if(selectedCheckbox.checked) return; //if checkbox has already been selected redo loop without increasing i
                        else{
                            selectedCheckbox.checked = true;
                            i++;
                        }
                    }
                }
            });
            return;
        }
        //underscores added for consistancy when reading saved shoes
        document.cookie = 'sneakers=_' + selectedShoes.join('_') + '_';
        if(i == 1) window.location.replace('/price');
    });
}