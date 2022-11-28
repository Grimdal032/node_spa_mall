// modules/run.js

//const add = require("./math.js");
//console.log(add(3, 4));

// Print: 7

// exports.add 는 add를 함수로 내보내는 것이 아니라
// 객체로 내보내는 것이기 때문에 add -> add.add로 해야 실행 가능

//console.log(add.add(3, 4));

// 객체 구조분해 할당 -> add 함수 하나만 가져와서 사용하겠다
// 1-12 9분 정도
const {add} = require("./math.js");
console.log(add(30, 40));