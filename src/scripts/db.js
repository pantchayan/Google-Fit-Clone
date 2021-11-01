let myStorage = window.localStorage;
let stepsDB = [];
let goalsDB = [];

if (myStorage.getItem("steps") != null) {
  stepsDB = JSON.parse(myStorage.getItem("steps"));
  console.log(stepsDB);
}
else{
  let d = new Date();
  stepsDB.push({date: `${d.getMonth() + 1}/${(Math.floor(d.getDate()/10) == 0)? "0" + d.getDate() : d.getDate()}/${d.getFullYear()}`, steps:2500, duration:100});
}

console.log(stepsDB);

if(myStorage.getItem("goals") != null) {
  goalsDB = JSON.parse(myStorage.getItem("goals"));
}
else{
  goalsDB.push({weight: 75, steps:10000});
}

