var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel
      .autenticar(email, senha)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

        if (resultadoAutenticar.length == 1) {
          console.log(resultadoAutenticar);

          res.json(resultadoAutenticar[0]);
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage,
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  var nome = req.body.serverNome;
  var nickname = req.body.serverNickname;
  var email = req.body.serverEmail;
  var cargo = req.body.serverCargo;
  var telefone = req.body.serverTelefone;
  var pais = req.body.serverPais;
  var senha = req.body.serverSenha;
  var funcao = req.body.serverFuncao;
  var fkEquipe = req.body.serverFkEquipe;

  if (!nome || nome.trim().length < 3) {
    return res.status(400).send("Nome inválido!");
  }

  if (!email || !email.includes("@")) {
    return res.status(400).send("Email inválido!");
  }

  if (!senha || senha.length < 8) {
    return res.status(400).send("Senha muito fraca!");
  }

  usuarioModel
    .cadastrar(nome, nickname, email, cargo, telefone, pais, senha, funcao, fkEquipe)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}


function buscarKpis(req, res) {
  var idUsuario = req.params.idUsuario;
  usuarioModel.buscarKpis(idUsuario)
    .then(function(resultado){
        res.json(resultado[0]);
    })
    .catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });

}

function listarJogadores(req, res){
    var fkEquipe = req.params.fkEquipe;
    usuarioModel.listarJogadores(fkEquipe)
    .then(function(resultado){
        res.json(resultado);
    })
    .catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function graficoVitorias(req, res){
    var idUsuario = req.params.idUsuario;
    usuarioModel.graficoVitorias(idUsuario)
    .then(function(resultado){
        res.json(resultado);
    })
    .catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarPerfil(req, res){

    var idUsuario = req.params.idUsuario;

    usuarioModel.buscarPerfil(idUsuario)
    .then(function(resultado){
        res.json(resultado[0]);
    })
    .catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });

}

function deletar(req, res){

    var idUsuario = req.params.idUsuario;

    usuarioModel.deletarPartidas(idUsuario)
    .then(function(){

        return usuarioModel.deletar(idUsuario);

    })
    .then(function(){

        res.status(200).send("Jogador deletado");

    })
    .catch(function(erro){

        console.log(erro);

        res.status(500).json(erro.sqlMessage);

    });

}

function atualizar(req, res){

    var idUsuario = req.params.idUsuario;

    var nome = req.body.serverNome;
    var nickname = req.body.serverNickname;
    var email = req.body.serverEmail;
    var cargo = req.body.serverCargo;
    var telefone = req.body.serverTelefone;
    var pais = req.body.serverPais;
    var senha = req.body.serverSenha;
    var funcao = req.body.serverFuncao;

    usuarioModel.atualizar(
        idUsuario,
        nome,
        nickname,
        email,
        cargo,
        telefone,
        pais,
        senha,
        funcao
    )
    .then(function(resultado){
        res.status(200).send("Usuário atualizado");
    })
    .catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });

}

module.exports = {
  autenticar,
  cadastrar,
  buscarKpis,
  listarJogadores,
  graficoVitorias,
  buscarPerfil,
  deletar,
  atualizar
};
