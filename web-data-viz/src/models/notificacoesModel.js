var database = require("../database/config");

function updateToggleNotificacao(fkUsuario) {
    var instrucaoSql = 
    `
    UPDATE Usuario
    SET notificar = 1
    WHERE idUsuario = ${fkUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function updateToggleNotificacaoOFF(fkUsuario) {
    var instrucaoSql = 
    `
    UPDATE Usuario
    SET notificar = 0
    WHERE idUsuario = ${fkUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarNotificar(fkUsuario) {
    var instrucaoSql = 
    `
    SELECT notificar
    FROM Usuario
    WHERE idUsuario = ${fkUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    updateToggleNotificacao,
    updateToggleNotificacaoOFF,
    buscarNotificar
}