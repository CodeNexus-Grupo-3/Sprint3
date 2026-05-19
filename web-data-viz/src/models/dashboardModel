var database = require("../database/config");

function buscarUltimosResultados() {
    var instrucaoSql = 
    `SELECT 
    generoMais AS genero,
    COUNT(*) / (SELECT COUNT(*) FROM Resultado) *100 AS porcentagem
    FROM Resultado
    GROUP BY generoMais;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiDuracaoTime() {
    var instrucaoSql = 
    `SELECT AVG(duracao) / 60 AS mediaMinutos
    FROM Dashboard;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimosResultados,
    kpiDuracaoTime
}