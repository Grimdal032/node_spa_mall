const mongoose = require("mongoose");

const connect = () => {
  mongoose
  // mongoDB와 연결 (spa_mall 데이터 베이스)
    .connect("mongodb://127.0.0.1/spa_mall")
  // 에러 시 호출
    .catch(err => console.log(err));
};
//  line 8 ->
mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;