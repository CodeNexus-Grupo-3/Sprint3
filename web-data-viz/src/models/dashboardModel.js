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

// KPIS DE DURAÇÃO
function kpiDuracaoTime(fkEquipe) {
    var instrucaoSql = 
    `SELECT AVG(duracao) / 60 AS mediaMinutosEquipe
    FROM PartidasEquipe
    WHERE fkEquipe = '${fkEquipe}';`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiDuracaoGeral() {
    var instrucaoSql = 
    `SELECT AVG(duracao) / 60 AS mediaMinutos
    FROM Dashboard;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// KPIS DE DANO/MINUTO
function kpiDanoTime(fkEquipe) {
    var instrucaoSql = 
    `SELECT AVG(totalDano / (duracao / 60)) AS mediaDanoMinuEquipe
    FROM PartidasEquipe
    WHERE fkEquipe = '${fkEquipe}';`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiDanoGeral() {
    var instrucaoSql = 
    `SELECT AVG(totalDano / (duracao / 60)) AS mediaDanoMinu
    FROM Dashboard;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// KPIS DE GOLD/MINUTO
function kpiGoldMinuTime(fkEquipe) {
    var instrucaoSql = 
    `SELECT AVG(totalGold / (duracao / 60)) AS mediaGoldMinuEquipe
    FROM PartidasEquipe
    WHERE fkEquipe = '${fkEquipe}';`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiGoldMinuGeral() {
    var instrucaoSql = 
    `SELECT AVG(totalGold / (duracao / 60)) AS mediaGoldMinu
    FROM Dashboard;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// KPIS DE GOLD EFICCIENCY
function kpiGoldEficTime(fkEquipe) {
    var instrucaoSql = 
    `SELECT AVG(totalDano / totalGold) AS mediaGoldEficEquipe
    FROM PartidasEquipe
    WHERE fkEquipe = '${fkEquipe}';`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function kpiGoldEficGeral() {
    var instrucaoSql = 
    `SELECT AVG(totalDano / totalGold) AS mediaGoldEfic
    FROM Dashboard;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimosResultados,
    kpiDuracaoGeral,
    kpiDuracaoTime,
    kpiDanoTime,
    kpiDanoGeral,
    kpiGoldMinuTime,
    kpiGoldMinuGeral,
    kpiGoldEficTime,
    kpiGoldEficGeral
}