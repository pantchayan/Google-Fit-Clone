let myStorage = window.localStorage;
let stepsDB = [];
let goalsDB = [];
let d = new Date();

if (myStorage.getItem("steps") != null) {
  stepsDB = JSON.parse(myStorage.getItem("steps"));
}
else{
  stepsDB.push({date: `${d.getMonth() + 1}/${(Math.floor(d.getDate()/10) == 0)? "0" + d.getDate() : d.getDate()}/${d.getFullYear()}`, steps:2800, duration:0});
}


if(myStorage.getItem("goals") != null) {
  goalsDB = JSON.parse(myStorage.getItem("goals"));
}
else{
  goalsDB.push({weight: 75, steps:10000});
}
let found = false;
stepsDB.forEach(element => {
  if(element.date === `${d.getMonth() + 1}/${(Math.floor(d.getDate()/10) == 0)? "0" + d.getDate() : d.getDate()}/${d.getFullYear()}`){
    found = true;
  }
});


if(!found){
  stepsDB.push({date: `${d.getMonth() + 1}/${(Math.floor(d.getDate()/10) == 0)? "0" + d.getDate() : d.getDate()}/${d.getFullYear()}`, steps:1800, duration:20});
  myStorage.setItem("steps", JSON.stringify(stepsDB));
}

