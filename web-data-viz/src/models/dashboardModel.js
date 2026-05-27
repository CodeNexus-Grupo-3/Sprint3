var database = require("../database/config");

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
    FROM Trusted;`

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
    FROM Trusted;`

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
    FROM Trusted;`

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
    FROM Trusted;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// GRÁFICO DE OBJETIVOS:
function graficoObjetivosTime(fkEquipe) {
    var instrucaoSql = 
    `SELECT
        AVG(totalDrag) AS dragTime,
        AVG(totalBaron) AS baroesTime,
        AVG(totalTorres) AS torresTime
        FROM PartidasEquipe
        WHERE fkEquipe = ${fkEquipe};`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graficoObjetivosGeral() {
    var instrucaoSql = 
    `SELECT
        AVG(totalDrag) AS dragGeral,
        AVG(totalBaron) AS baroesGeral,
        AVG(totalTorres) AS torresGeral
        FROM Trusted;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// GRÁFICO DE GOLD DANO TANK:
function graficoGoldDanoTime(fkEquipe) {
    var instrucaoSql = 
    `SELECT
        - (AVG(totalGold)) AS goldTime,
        - (AVG(totalDano)) AS danoTime
        FROM PartidasEquipe
        WHERE fkEquipe = ${fkEquipe};`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graficoGoldDanoGeral() {
    var instrucaoSql = 
    `SELECT
        AVG(totalGold) AS goldGeral,
        AVG(totalDano) AS danoGeral
        FROM Trusted;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// GRÁFICO DE KDA:
function graficoKDATime(fkEquipe) {
    var instrucaoSql = 
    `SELECT
        AVG(totalAbates) AS killsTime,
        AVG(totalMortes) AS deathsTime,
        AVG(totalAssistencias) AS assistsTime
        FROM PartidasEquipe
        WHERE fkEquipe = ${fkEquipe};`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graficoKDAGeral() {
    var instrucaoSql = 
    `SELECT
        AVG(totalAbates) AS killsGeral,
        AVG(totalMortes) AS deathsGeral,
        AVG(totalAssistencias) AS assistsGeral
        FROM Trusted;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    kpiDuracaoGeral,
    kpiDuracaoTime,
    kpiDanoTime,
    kpiDanoGeral,
    kpiGoldMinuTime,
    kpiGoldMinuGeral,
    kpiGoldEficTime,
    kpiGoldEficGeral,
    graficoObjetivosTime,
    graficoObjetivosGeral,
    graficoGoldDanoTime,
    graficoGoldDanoGeral,
    graficoKDATime,
    graficoKDAGeral
}