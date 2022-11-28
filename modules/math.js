//modules/math.js
function add(a, b) {
    return a + b;
}
// ================= 1 ================
// add 함수 내보내기
// 1-1    모듈 그 자체를 바로 add 함수로 할당한다.
module.exports = add;
// 1-2    모듈을 호출했을 때, add 키 값에는 add 함수가 들어가는 방법이다.
// module.exports = { add : add };

// ================= 2 ================
// 모듈을 호출했을 때, add 키 값에는 add 변수 함수가 가지고 있는 값이 할당된다.
// const add = (a, b) => {
//     return a + b;
// }
// exports.add = add;

// ================= 3 ================
// 3 모듈 호출시 add 키 값에는 (a,b){return a+b;} 익명함수가 할당되는 방법이다 
// 익명 사용 함수로 내보내기 가능
// add 함수로 나가는 것이 아니라 객체 add로 나가게 됨
// exports.add = function (a, b) {
//     return a + b;
// }

