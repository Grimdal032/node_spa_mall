// express 라이브러리를 가져와서 변수에 넣고
const express = require('express');
// express 실행해서 app 객체 생성
const app = express();
const port = 3000;

// Router 미들웨어를 사용하겠다는 작성
// localhost:3000/ 뒤에 /api 로 시작되는 주소는
// routes/goods.js에 있는 Router 미들웨어를 통해 처리됨
const goodsRouter = require("./routes/goods.js");
const connect = require("./schemas");
connect();

// request 객체의 body를 사용하기 위해서
// body-parser Middleware를 쓰기 위한 문법이다 명시
app.use(express.json());
app.use("/api", [goodsRouter]);

app.post("/", (req,res) => {
  console.log(req.body);
  res.send("기본 URI에 POST 메소드가 정상적으로 실행되었습니다.");
})

app.get("/", (req, res) => {
  console.log(req.query);

  
  res.status(400).json({
    "KeyKey" : "valuse 입니다.",
    "이름입니다" : "이름일까요?",
  });
})

app.get("/:id", (req, res) => {
  console.log(req.params);
  res.send(":id URI에 정상적으로 반환되었습니다.")
})
// app 객체를 통해 get 메소드로 api 실행
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// localhost:3000/api -> goodsRouter
// app.use("/api", [goodsRouter, userRouter]); 배열로 선언 가능
app.use("/api", [goodsRouter]);

// 서버를 실행하는 부분
// 3000 번 포트로 접속했을때만 서버를 실행
app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

// ++++
// 이미 사용 중인 포트를 찾아서 종료
// netstat 명령어를 통해 현재 컴퓨터와 연결된 네트워크 정보를 확인 가능
//  https://mainia.tistory.com/5378
// 1. cmd 창 실행 후 명령어 실행
// cmd -> netstat -ano | find "원하는 포트"
// 2. 해당 포트를 점유하고 있는 PID를 찾아서 종료
// taskkill /f /pid 76596

