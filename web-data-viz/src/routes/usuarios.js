var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/buscarKpis/:idUsuario", function (req, res) {
    usuarioController.buscarKpis(req, res);
});

router.get("/listarJogadores/:fkEquipe", function (req, res) {
    usuarioController.listarJogadores(req, res);
});

router.get("/graficoVitorias/:idUsuario", function (req, res) {
    usuarioController.graficoVitorias(req, res);
});

router.get("/buscarPerfil/:idUsuario", function (req, res) {
    usuarioController.buscarPerfil(req, res);
});

router.delete("/deletar/:idUsuario", function (req, res) {
    usuarioController.deletar(req, res);
});

router.put("/atualizar/:idUsuario", function(req, res){
    usuarioController.atualizar(req, res);
});

module.exports = router;