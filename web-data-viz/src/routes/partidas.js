var express = require("express");
var router = express.Router();

var partidasController = require("../controllers/partidasController");

router.get("/ultimas/:idJogador", function (req, res) {
    partidasController.buscarUltimasPartidas(req, res);
});

router.post("/cadastrar", function (req, res) {
    partidasController.cadastrar(req, res);
});

router.delete("/:idPartida", function (req, res) {
    partidasController.excluir(req, res);
});

module.exports = router;