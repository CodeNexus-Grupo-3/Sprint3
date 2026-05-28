var express = require("express");
var router = express.Router();

var indexController = require("../controllers/indexController");

router.post("/insertFaleConosco", function (req, res) {
    indexController.faleConosco(req, res);
});

module.exports = router;