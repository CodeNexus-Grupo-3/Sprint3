var notificacoesModel = require("../models/notificacoesModel");

function toggleNotificacao(req, res) {
    var fkUsuario = req.params.fkUsuario;
    
    notificacoesModel.updateToggleNotificacao(fkUsuario)
    .then(function(resultado){
        res.json(resultado);
    })
    .catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function toggleNotificacaoOFF(req, res) {
    var fkUsuario = req.params.fkUsuario;
    
    notificacoesModel.updateToggleNotificacaoOFF(fkUsuario)
    .then(function(resultado){
        res.json(resultado);
    })
    .catch(function(erro) {
    console.log("ERRO SQL COMPLETO:", erro);
    console.log("SQL MESSAGE:", erro.sqlMessage);
    console.log("SQL:", erro.sql);
    res.status(500).json(erro.sqlMessage);
});
}


function buscarNotificar(req, res) {
    var fkUsuario = req.params.fkUsuario;
    
    notificacoesModel.buscarNotificar(fkUsuario)
    .then(function(resultado){
        res.json(resultado);
    })
    .catch(function(erro) {
    console.log("ERRO SQL COMPLETO:", erro);
    console.log("SQL MESSAGE:", erro.sqlMessage);
    console.log("SQL:", erro.sql);
    res.status(500).json(erro.sqlMessage);
});
}

module.exports = {
    toggleNotificacao,
    toggleNotificacaoOFF,
    buscarNotificar
}