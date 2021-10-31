let stepForm = document.querySelector("#steps-input"); 
let stepsBtn = document.querySelector("#steps-btn");
let overlay = document.querySelector('.overlay');
let addContainer = document.querySelector('.add-container');

let stepsData = {
    'Slow' : 1.5,
    'Paced' : 2.5,
    'Super Sayian' : 4
}


stepForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let duration = document.querySelector('#steps-time').value;
    
    let pace = document.querySelector('#steps-pace').value;
    
    let date = document.querySelector('#steps-date').value;
    console.log(duration, pace, date);

    if(isNaN(parseInt(duration))){
        let error = document.querySelector('.error');
        error.textContent = 'Please enter correct duration';
        console.log("Error");
        return;
    }

    let steps = stepsData[pace] * parseInt(duration) * 60;
    // console.log(steps);
    let data = {
        date,
        steps
    }

    updatedb(data);
    updateWheels(stepsDB);
    duration.value = '';
    pace.value = '';
    date.value = '';
    overlay.classList.add('hide');
    addContainer.classList.add('hide');
})


stepsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    overlay.classList.remove('hide');
    addContainer.classList.remove('hide');
})


overlay.addEventListener('click', (e) => {
    e.preventDefault();
    overlay.classList.add('hide');
    addContainer.classList.add('hide');
})


let updatedb =  (data) => {
    let flag = false;
    for(let i=0;i<stepsDB.length;i++){
        let item = stepsDB[i];
        if(item.date === data.date){
            flag = true;
            item.steps += data.steps;
            break; 
        }
    }

    if(!flag) stepsDB.push(data);

    myStorage.setItem('steps', JSON.stringify(stepsDB));

}