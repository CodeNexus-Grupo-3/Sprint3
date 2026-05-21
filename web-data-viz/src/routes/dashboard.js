var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

//Recebendo os dados do html e direcionando para a função registrar de quizController.js
router.get("/grafico1", function (req, res) {
    dashboardController.buscarUltimosResultados(req, res);
});

//KPIS DE DURAÇÃO
router.get("/kpiDuracaoTime/:fkEquipe", function (req, res) {
    dashboardController.kpiDuracaoTime(req, res);
});

router.get("/kpiDuracaoGeral", function (req, res) {
    dashboardController.kpiDuracaoGeral(req, res);
});

//KPIS DE DANO/MINUTO
router.get("/kpiDanoTime/:fkEquipe", function (req, res) {
    dashboardController.kpiDanoTime(req, res);
});

router.get("/kpiDanoGeral", function (req, res) {
    dashboardController.kpiDanoGeral(req, res);
});

//KPIS DE DANO/MINUTO
router.get("/kpiGoldMinuTime/:fkEquipe", function (req, res) {
    dashboardController.kpiGoldMinuTime(req, res);
});

router.get("/kpiGoldMinuGeral", function (req, res) {
    dashboardController.kpiGoldMinuGeral(req, res);
});

//KPIS DE GOLD EFICCIENCY
router.get("/kpiGoldEficTime/:fkEquipe", function (req, res) {
    dashboardController.kpiGoldEficTime(req, res);
});

router.get("/kpiGoldEficGeral", function (req, res) {
    dashboardController.kpiGoldEficGeral(req, res);
});


module.exports = router;

