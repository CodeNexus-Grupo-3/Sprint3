var dashboardModel = require("../models/dashboardModel");

// KPIS DE DURAÇÃO
function kpiDuracaoTime(req, res) {
    var fkEquipe = req.params.fkEquipe;

    dashboardModel.kpiDuracaoTime(fkEquipe).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os últimos resultados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function kpiDuracaoGeral(req, res) {
    dashboardModel.kpiDuracaoGeral(req, res).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os últimos resultados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

//KPIS DE DANO/MIN
function kpiDanoTime(req, res) {
    var fkEquipe = req.params.fkEquipe;

    dashboardModel.kpiDanoTime(fkEquipe).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os últimos resultados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function kpiDanoGeral(req, res) {
    dashboardModel.kpiDanoGeral(req, res).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os últimos resultados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

//KPIS DE GOLD/MIN
function kpiGoldMinuTime(req, res) {
    var fkEquipe = req.params.fkEquipe;

    dashboardModel.kpiGoldMinuTime(fkEquipe).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os últimos resultados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function kpiGoldMinuGeral(req, res) {
    dashboardModel.kpiGoldMinuGeral(req, res).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os últimos resultados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

//KPIS DE GOLD EFFICIENCY
function kpiGoldEficTime(req, res) {
    var fkEquipe = req.params.fkEquipe;

    dashboardModel.kpiGoldEficTime(fkEquipe).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os últimos resultados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function kpiGoldEficGeral(req, res) {
    dashboardModel.kpiGoldEficGeral(req, res).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os últimos resultados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// GRAFICO DE OBJETIVOS
async function graficoObjetivos(req, res) {
    try {
        var fkEquipe = req.params.fkEquipe;
        const time = await dashboardModel.graficoObjetivosTime(fkEquipe);
        const geral = await dashboardModel.graficoObjetivosGeral();

        if (time.length > 0 && geral.length > 0) {
            res.status(200).json({
                time: time[0],
                geral: geral[0]
            });

        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    } catch (erro) {

        console.log(erro);
        console.log("Houve um erro ao buscar os resultados.", erro.sqlMessage);

        res.status(500).json(erro.sqlMessage);
    }
}

// GRAFICO DE GOLD DANO TANK
async function graficoGoldDano(req, res) {
    try {
        var fkEquipe = req.params.fkEquipe;
        const time = await dashboardModel.graficoGoldDanoTime(fkEquipe);
        const geral = await dashboardModel.graficoGoldDanoGeral();

        if (time.length > 0 && geral.length > 0) {
            res.status(200).json({
                time: time,
                geral: geral
            });
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    } catch (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os resultados.", erro.sqlMessage);

        res.status(500).json(erro.sqlMessage);
    }
}

// GRAFICO DE KDA 
async function graficoKDA(req, res) {
    try {
        var fkEquipe = req.params.fkEquipe;
        const time = await dashboardModel.graficoKDATime(fkEquipe);
        const geral = await dashboardModel.graficoKDAGeral();

        if (time.length > 0 && geral.length > 0) {
            res.status(200).json({
                time: time,
                geral: geral
            });
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    } catch (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os resultados.", erro.sqlMessage);

        res.status(500).json(erro.sqlMessage);
    }
}

module.exports = {
    kpiDuracaoGeral,
    kpiDuracaoTime,
    kpiDanoTime,
    kpiDanoGeral,
    kpiGoldMinuTime,
    kpiGoldMinuGeral,
    kpiGoldEficTime,
    kpiGoldEficGeral,
    graficoObjetivos,
    graficoGoldDano,
    graficoKDA
}