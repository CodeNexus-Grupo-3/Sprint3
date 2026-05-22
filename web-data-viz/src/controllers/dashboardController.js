var dashboardModel = require("../models/dashboardModel");

function buscarUltimosResultados(req, res) {

    dashboardModel.buscarUltimosResultados(req, res).then(function (resultado) {
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
function graficoObjetivos(req, res) {
    var fkEquipe = req.params.fkEquipe;

    const time = 
    dashboardModel.graficoObjetivosTime(fkEquipe).then(function (resultado) {
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

    const geral =
    dashboardModel.graficoObjetivosGeral(req, res).then(function (resultado) {
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

    res.json({
        time: time[0],
        geral: geral[0]
    });
}

// GRAFICO DE GOLD DANO TANK
function graficoGoldDano(req, res) {
    var fkEquipe = req.params.fkEquipe;

    const time = 
    dashboardModel.graficoGoldDanoTime(fkEquipe).then(function (resultado) {
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

    const geral =
    dashboardModel.graficoGoldDanoGeral(req, res).then(function (resultado) {
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

    res.json({
        time: time[0],
        geral: geral[0]
    });
}

module.exports = {
    buscarUltimosResultados,
    kpiDuracaoGeral,
    kpiDuracaoTime,
    kpiDanoTime,
    kpiDanoGeral,
    kpiGoldMinuTime,
    kpiGoldMinuGeral,
    kpiGoldEficTime,
    kpiGoldEficGeral,
    graficoObjetivos,
    graficoGoldDanoT
}