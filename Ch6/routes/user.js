const express = require("express");

const router = express.Router();

// 와일드 카드역할을 하기 때문에 다른 라우터보다 나중에 위치해야함
router.get('/:id', (req, res) => {
    console.log(req.params, req.query);
    console.log(typeof req.params.id);
    res.send("Hello, user");
});

module.exports = router;