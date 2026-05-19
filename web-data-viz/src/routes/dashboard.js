var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

//Recebendo os dados do html e direcionando para a função registrar de quizController.js
router.get("/grafico1", function (req, res) {
    dashboardController.buscarUltimosResultados(req, res);
});

router.get("/kpiDuracaoTime", function (req, res) {
    dashboardController.kpiDuracaoTime(req, res);
});

module.exports = router;