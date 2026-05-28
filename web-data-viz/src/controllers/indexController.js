var indexModel = require("../models/indexModel");

function faleConosco(req, res) {
    var nomeServer = req.body.nomeServer;
    var emailServer = req.body.emailServer;
    var telefoneServer = req.body.telefoneServer;
    var equipeServer = req.body.equipeServer;
    var mensagemServer = req.body.mensagemServer;

    indexModel.insertFaleConosco(nomeServer, emailServer, telefoneServer, equipeServer, mensagemServer)
    .then(function(resultado){
        res.json(resultado);
    })
    .catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    faleConosco,
}