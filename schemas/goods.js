const mongoose = require("mongoose");

const goodsSchema = new mongoose.Schema({
  goodsId: {
    type: Number,
    required: true, // 값이 있어야 하는가 속성값 설정, true 값이어야 사용할 수있음
    unique: true    // 중복 허용하지 않음
  },
  //모델 생성
  name: {
    type: String,
    required : true,
    unique: true,
  },
  thumbnailUrl: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  }
});

// defaultSchema : 데이터가 생성될 스키마에 대한 값
// Defaults : 콜렉션 명
module.exports = mongoose.model("Goods", goodsSchema);