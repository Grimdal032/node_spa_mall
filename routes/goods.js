// routes/goods.js
// router 생성
const express = require('express');
const router = express.Router();

// 엔드 포인트 작성
// localhost:3000/api/ GET
// router.get("/", (req, res) => {
//     res.send("default url for goods.js GET Method");
// });

// // localhost:3000/api/about GET
// router.get("/about", (req, res) => {
//     res.send("goods.js about PATH");
// });

const goods = [
    {
      goodsId: 4,
      name: "상품 4",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
      category: "drink",
      price: 0.1,
    },
    {
      goodsId: 3,
      name: "상품 3",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
      category: "drink",
      price: 2.2,
    },
    {
      goodsId: 2,
      name: "상품 2",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
      category: "drink",
      price: 0.11,
    },
    {
      goodsId: 1,
      name: "상품 1",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
      category: "drink",
      price: 6.2,
    },
];

router.get("/goods", (req, res) => {
    res.status(200).json({goods})
})

router.get("/goods/:goodsId", (req, res) => {
    const { goodsId } = req.params;
    
    // let result = null;
    // for(const good of goods) {
    //     if(Number(goodsId) === good.goodsId) {
    //         result = good;
    //     }
    // }

    const [result] = goods.filter((good) => Number(goodsId) === good.goodsId)
    res.status(200).json({detail: result});
});

// 스키마
const Goods = require("../schemas/goods");
router.post("/goods", async (req, res) => {
	const { goodsId, name, thumbnailUrl, category, price } = req.body;
  const goods = await Goods.find({ goodsId });
  if (goods.length) {
    return res.status(400).json({ 
      success: false, 
      errorMessage: "이미 있는 데이터입니다." 
    });
  }
  const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });
  res.json({ goods: createdGoods });
});

// 장바구니에 상품 추가  API 작성
const Cart = require("../schemas/cart");
router.post("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (existsCarts.length) {
    return res.json({ success: false, errorMessage: "이미 장바구니에 존재하는 상품입니다." });
  }

  await Cart.create({ goodsId: Number(goodsId), quantity: quantity });

  res.json({ result: "success" });
});

// 장바구니 목록 조회 API
router.get("/goods/cart", async (req, res) => {
  const carts = await Cart.find();
  const goodsIds = carts.map((cart) => cart.goodsId);

  const goods = await Goods.find({ goodsId: goodsIds });

  res.json({
      carts: carts.map((cart) => ({
          quantity: cart.quantity,
          goods: goods.find((item) => item.goodsId === cart.goodsId),
      })),
  });
});

// 장바구니의 상품 수량 수정 API 작성
router.put("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  if (quantity < 1) {
    res.status(400).json({ errorMessage: "수량은 1 이상이어야 합니다." });
    return;
  }

  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (existsCarts.length) {
    await Cart.updateOne({ goodsId: Number(goodsId) }, { $set: { quantity } });
  }

  res.json({ success: true });
})

// 장바구니의 상품 제거 API 작성
router.delete("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;

  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length > 0) {
    await Cart.deleteOne({ goodsId });
  }

  res.json({ result: "success" });
});

// // 작성한 router를 app.js에서 사용하기 위해 하단에 내보내는 코드 작성
module.exports = router;