var partidasModel = require("../models/partidasModel");

function buscarUltimasPartidas(req, res) {

    const limite_linhas = 10;
    var idJogador = req.params.idJogador;

    partidasModel.buscarUltimasPartidas(idJogador, limite_linhas)
        .then(function(resultado) {

            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }

        }).catch(function(erro) {

            console.log(erro);
            res.status(500).json(erro.sqlMessage);

        });
}

function cadastrar(req, res) {

    var resultado      = req.body.resultado;
    var duracao        = req.body.duracao;
    var abates         = req.body.abates;
    var assistencias   = req.body.assistencias;
    var mortes         = req.body.mortes;
    var gold           = req.body.gold;
    var dano           = req.body.dano;
    var baroes         = req.body.baroes;
    var dragoes        = req.body.dragoes;
    var torres         = req.body.torres;
    var data           = req.body.data;
    var idJogador      = req.body.idJogador;

  if (
    resultado === undefined ||
    resultado === null ||
    duracao === undefined ||
    duracao === null ||
    !data
) {
    return res.status(400).send("Campos obrigatórios não preenchidos!");
}

    partidasModel.cadastrar(
        resultado,
        duracao,
        abates,
        assistencias,
        mortes,
        gold,
        dano,
        baroes,
        dragoes,
        torres,
        data,
        idJogador
    )
    .then(function(resultado) {

        res.status(201).json(resultado);

    }).catch(function(erro) {

        console.log(erro);
        res.status(500).json(erro.sqlMessage);

    });
}

function excluir(req, res) {

    var idPartida = req.params.idPartida;

    partidasModel.excluir(idPartida)
        .then(function(resultado) {

            res.status(200).json(resultado);

        }).catch(function(erro) {


    console.log("ERRO SQL:");
    console.log(erro);
    console.log(erro.sqlMessage);
    console.log(erro.sql);

  
            console.log(erro);
            res.status(500).json(erro.sqlMessage);

        });
}

module.exports = {
    buscarUltimasPartidas,
    cadastrar,
    excluir
};