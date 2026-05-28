var database = require("../database/config");

function insertFaleConosco(nomeServer, emailServer, telefoneServer, equipeServer, mensagemServer) {
    var instrucaoSql = 
    `
    INSERT INTO FaleConosco
    (nome, email, telefone, equipe, mensagem)
    VALUES ('${nomeServer}', '${emailServer}', '${telefoneServer}', '${equipeServer}', '${mensagemServer}');
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    insertFaleConosco
}