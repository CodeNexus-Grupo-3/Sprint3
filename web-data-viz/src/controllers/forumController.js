

// var forumModel = require("../models/forumModel");

// function listarPosts(req, res) {
//     var fkEquipe = req.params.fkEquipe;
//     forumModel.listarPosts(fkEquipe)
//     .then(function(posts) {
//         res.json(posts);
//     })
//     .catch(function(erro) {
//         console.log(erro);
//         res.status(500).json({ mensagem: "Erro ao listar posts" });
//     });
// }

// function postarMensagem(req, res) {
//     var titulo = req.body.titulo;
//     var conteudo = req.body.conteudo;
//     var fkUsuario = req.body.fkUsuario;

//     if (!conteudo || !fkUsuario) {
//         return res.status(400).json({ mensagem: "Conteúdo e usuário são obrigatórios" });
//     }

//     forumModel.postarMensagem(titulo, conteudo, fkUsuario)
//     .then(function() {
//         res.status(201).json({ mensagem: "Post criado com sucesso" });
//     })
//     .catch(function(erro) {
//         console.log(erro);
//         res.status(500).json({ mensagem: "Erro ao postar mensagem" });
//     });
// }

// function curtirPost(req, res) {
//     var idPostagensForum = req.params.id;
//     forumModel.curtirPost(idPostagensForum)
//     .then(function() {
//         res.status(200).json({ mensagem: "Post curtido com sucesso" });
//     })
//     .catch(function(erro) {
//         console.log(erro);
//         res.status(500).json({ mensagem: "Erro ao curtir post" });
//     });
// }

// function descurtirPost(req, res) {
//     var idPostagensForum = req.params.id;
//     forumModel.descurtirPost(idPostagensForum)
//     .then(function() {
//         res.status(200).json({ mensagem: "Like removido com sucesso" });
//     })
//     .catch(function(erro) {
//         console.log(erro);
//         res.status(500).json({ mensagem: "Erro ao remover like" });
//     });
// }

// function deletarPost(req, res) {
//     var idPostagensForum = req.params.id;
//     forumModel.deletarPost(idPostagensForum)
//     .then(function() {
//         res.status(200).json({ mensagem: "Post deletado com sucesso" });
//     })
//     .catch(function(erro) {
//         console.log(erro);
//         res.status(500).json({ mensagem: "Erro ao deletar post" });
//     });
// }

// function editarPost(req, res) {
//     var idPostagensForum = req.params.id;
//     var conteudo = req.body.conteudo;

//     if (!conteudo) {
//         return res.status(400).json({ mensagem: "Conteúdo é obrigatório" });
//     }

//     forumModel.editarPost(idPostagensForum, conteudo)
//     .then(function() {
//         res.status(200).json({ mensagem: "Post editado com sucesso" });
//     })
//     .catch(function(erro) {
//         console.log(erro);
//         res.status(500).json({ mensagem: "Erro ao editar post" });
//     });
// }

// module.exports = {
//     listarPosts,
//     postarMensagem,
//     curtirPost,
//     descurtirPost,
//     deletarPost,
//     editarPost
// };


var forumModel = require("../models/forumModel");

function listarPosts(req, res) {
    var fkEquipe = req.params.fkEquipe;
    var fkUsuario = req.params.fkUsuario;
    forumModel.listarPosts(fkEquipe, fkUsuario)
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
    var fkUsuario = req.body.fkUsuario;
    forumModel.curtirPost(idPostagensForum, fkUsuario)
    .then(function() {
        res.status(200).json({ mensagem: "Post curtido com sucesso" });
    })
    .catch(function(erro) {
        console.log(erro);
        res.status(500).json({ mensagem: "Erro ao curtir post" });
    });
}

function descurtirPost(req, res) {
    var idPostagensForum = req.params.id;
    var fkUsuario = req.body.fkUsuario;
    forumModel.descurtirPost(idPostagensForum, fkUsuario)
    .then(function() {
        res.status(200).json({ mensagem: "Like removido com sucesso" });
    })
    .catch(function(erro) {
        console.log(erro);
        res.status(500).json({ mensagem: "Erro ao remover like" });
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
    descurtirPost,
    deletarPost,
    editarPost
};