// // var forumModel = require("../models/forumModel");

// // function postar(req, res){

// //     var titulo = req.body.titulo;
// //     var conteudo = req.body.conteudo;
// //     var fkUsuario = req.body.fkUsuario;

// //     forumModel.postar(titulo, conteudo, fkUsuario)
// //     .then(function(resultado){
// //         res.json(resultado);
// //     })
// //     .catch(function(erro){
// //         console.log(erro);
// //         res.status(500).json(erro.sqlMessage);
// //     });

// // }

// // function listar(req, res){

// //     forumModel.listar()
// //     .then(function(resultado){
// //         res.json(resultado);
// //     })
// //     .catch(function(erro){
// //         console.log(erro);
// //         res.status(500).json(erro.sqlMessage);
// //     });

// // }

// // function curtir(req, res){

// //     var idPost = req.params.idPost;

// //     forumModel.curtir(idPost)
// //     .then(function(resultado){
// //         res.json(resultado);
// //     })
// //     .catch(function(erro){
// //         console.log(erro);
// //         res.status(500).json(erro.sqlMessage);
// //     });

// // }

// // module.exports = {
// //     postar,
// //     listar,
// //     curtir
// // }

// var forumModel = require("../models/forumModel");

// function postar(req, res){

//     var titulo = req.body.titulo;
//     var conteudo = req.body.conteudo;
//     var fkUsuario = req.body.fkUsuario;

//     forumModel.postar(titulo, conteudo, fkUsuario)
//     .then(function(resultado){
//         res.status(200).json(resultado);
//     })
//     .catch(function(erro){
//         console.log(erro);
//         res.status(500).json(erro.sqlMessage);
//     });

// }

// function listar(req, res){

//     forumModel.listar()
//     .then(function(resultado){
//         res.status(200).json(resultado);
//     })
//     .catch(function(erro){
//         console.log(erro);
//         res.status(500).json(erro.sqlMessage);
//     });

// }

// function curtir(req, res){

//     var idPost = req.params.idPost;

//     forumModel.curtir(idPost)
//     .then(function(resultado){
//         res.status(200).json(resultado);
//     })
//     .catch(function(erro){
//         console.log(erro);
//         res.status(500).json(erro.sqlMessage);
//     });

// }

// function editar(req, res){

//     var idPost = req.params.idPost;
//     var conteudo = req.body.conteudo;

//     forumModel.editar(idPost, conteudo)
//     .then(function(resultado){
//         res.status(200).json(resultado);
//     })
//     .catch(function(erro){
//         console.log(erro);
//         res.status(500).json(erro.sqlMessage);
//     });

// }

// function deletar(req, res){

//     var idPost = req.params.idPost;

//     forumModel.deletar(idPost)
//     .then(function(resultado){
//         res.status(200).json(resultado);
//     })
//     .catch(function(erro){
//         console.log(erro);
//         res.status(500).json(erro.sqlMessage);
//     });

// }

// module.exports = {
//     postar,
//     listar,
//     curtir,
//     editar,
//     deletar
// }


var forumModel = require("../models/forumModel");

function listarPosts(req, res) {
    forumModel.listarPosts()
    .then(function(posts) {
        res.json(posts);
    })
    .catch(function(erro) {
        console.log(erro);
        res.status(500).json({ mensagem: "Erro ao listar posts" });
    });
}

function postarMensagem(req, res) {
    var titulo = req.body.titulo;
    var conteudo = req.body.conteudo;
    var fkUsuario = req.body.fkUsuario;

    if (!conteudo || !fkUsuario) {
        return res.status(400).json({ mensagem: "Conteúdo e usuário são obrigatórios" });
    }

    forumModel.postarMensagem(titulo, conteudo, fkUsuario)
    .then(function() {
        res.status(201).json({ mensagem: "Post criado com sucesso" });
    })
    .catch(function(erro) {
        console.log(erro);
        res.status(500).json({ mensagem: "Erro ao postar mensagem" });
    });
}

function curtirPost(req, res) {
    var idPostagensForum = req.params.id;

    forumModel.curtirPost(idPostagensForum)
    .then(function() {
        res.status(200).json({ mensagem: "Post curtido com sucesso" });
    })
    .catch(function(erro) {
        console.log(erro);
        res.status(500).json({ mensagem: "Erro ao curtir post" });
    });
}

function deletarPost(req, res) {
    var idPostagensForum = req.params.id;

    forumModel.deletarPost(idPostagensForum)
    .then(function() {
        res.status(200).json({ mensagem: "Post deletado com sucesso" });
    })
    .catch(function(erro) {
        console.log(erro);
        res.status(500).json({ mensagem: "Erro ao deletar post" });
    });
}

function editarPost(req, res) {
    var idPostagensForum = req.params.id;
    var conteudo = req.body.conteudo;

    if (!conteudo) {
        return res.status(400).json({ mensagem: "Conteúdo é obrigatório" });
    }

    forumModel.editarPost(idPostagensForum, conteudo)
    .then(function() {
        res.status(200).json({ mensagem: "Post editado com sucesso" });
    })
    .catch(function(erro) {
        console.log(erro);
        res.status(500).json({ mensagem: "Erro ao editar post" });
    });
}

module.exports = {
    listarPosts,
    postarMensagem,
    curtirPost,
    deletarPost,
    editarPost
};