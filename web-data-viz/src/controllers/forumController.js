var forumModel = require("../models/forumModel");

function postar(req, res){

    var titulo = req.body.titulo;
    var conteudo = req.body.conteudo;
    var fkUsuario = req.body.fkUsuario;

    forumModel.postar(titulo, conteudo, fkUsuario)
    .then(function(resultado){
        res.json(resultado);
    })
    .catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });

}

function listar(req, res){

    forumModel.listar()
    .then(function(resultado){
        res.json(resultado);
    })
    .catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });

}

function curtir(req, res){

    var idPost = req.params.idPost;

    forumModel.curtir(idPost)
    .then(function(resultado){
        res.json(resultado);
    })
    .catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });

}

module.exports = {
    postar,
    listar,
    curtir
}