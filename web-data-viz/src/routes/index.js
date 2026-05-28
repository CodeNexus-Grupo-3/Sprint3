var express = require("express");
var router = express.Router();

var indexController = require("../controllers/indexController");

router.get("/", function (req, res) {
    res.render("index");
});

router.post("/insertFaleConosco", function (req, res) {
    indexController.faleConosco(req, res);
});

module.exports = router;