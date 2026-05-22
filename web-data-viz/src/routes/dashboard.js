var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

// LETRA DO ICONE:
router.get("/kpiDuracaoTime/:fkEquipe", function (req, res) {
    dashboardController.kpiDuracaoTime(req, res);
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

// GRÁFICO DE OBJETIVOS POR JOGO
router.get("/graficoObjetivos/:fkEquipe", function (req, res) {
    dashboardController.graficoObjetivos(req, res);
});

// GRÁFICO DE GOLD, DANO, TANK
router.get("/graficoGoldDano/:fkEquipe", function (req, res) {
    dashboardController.graficoGoldDano(req, res);
});

// GRÁFICO DE KDA
router.get("/graficoKDA/:fkEquipe", function (req, res) {
    dashboardController.graficoKDA(req, res);
});

module.exports = router;

