var express = require("express");
var router = express.Router();

var notificacoesController = require("../controllers/notificacoesController");

router.get("/", function (req, res) {
    res.render("index");
});

router.patch("/toggleNotificacaoON/:fkUsuario", function (req, res) {
    notificacoesController.toggleNotificacao(req, res);
});

router.patch("/toggleNotificacaoOFF/:fkUsuario", function (req, res) {
    notificacoesController.toggleNotificacaoOFF(req, res);
});


module.exports = router;