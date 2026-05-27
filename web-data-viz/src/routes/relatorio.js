// Importa o módulo "express" permitindo com que essa variável acesse seus recursos
var express = require("express");

// Cria um objeto de rotas, que serve para:
// - Organizar endpoints
// - Desacoplar as rotas do app.js
// - Redireciona a requisição mandando a URL para o responsável
var router = express.Router();

// Route importa o Controller
// Permitindo com que ele receba a requisição e encaminhe para o Controller responsável
var relatorioController = require("../controllers/relatorioController");

// Registra um endpoint do tipo Post com o final de url /gerar e guarda uma função callback
router.post(
    // Quando o frontend envia uma requisição com o final "/gerar" a função callback é acionada
    "/gerar",
    // Função Callback = Função passada dentro de outra função que só é executada depois
    function (req, res) {
        // Ao ser acionada executa a função do controller 
        // Passando como argumento o corpo da requisição que vem do front e a resposta a ser devolvida
        relatorioController.gerarRelatorio(req, res);
    }
);

// Exporta o router para que outros arquivos como o app.js possam utilizá-lo
module.exports = router;