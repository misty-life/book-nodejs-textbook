const express = require("express");

const router = express.Router();

// 와일드 카드역할을 하기 때문에 다른 라우터보다 나중에 위치해야함
router.get('/', (req, res, next) => {
    // res.send("Hello, Express");
    res.render("index", { title: "Express "});
});

module.exports = router;