let myStorage = window.localStorage;
let db = [];

// let user = [
//   {
//     name: "JavaScript Jeep",
//     age: 23,
//   },
//   {
//     name: "JavaScript Jeep",
//     age: 25,
//   },
//   {
//     name: "JavaScript Jeep",
//     age: 25,
//   },
// ];
// let userStr = JSON.stringify(user);

// myStorage.setItem("activities", userStr);

if (myStorage.getItem("steps") != null) {
  db = JSON.parse(myStorage.getItem("steps"));
  console.log(db);
}
