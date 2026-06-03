var database = require("../database/config");


function atualizar(
    idPartida,
    resultado,
    duracao,
    abates,
    assistencias,
    mortes,
    gold,
    dano,
    baroes,
    dragoes,
    torres,
    data
) {
    var instrucaoSql = `
        UPDATE PartidasEquipe SET
            resultado       = ${resultado},
            duracao         = ${duracao},
            totalAbates     = ${abates},
            totalAssistencias = ${assistencias},
            totalMortes     = ${mortes},
            totalGold       = ${gold},
            totalDano       = ${dano},
            totalBaron      = ${baroes},
            totalDrag       = ${dragoes},
            totalTorres     = ${torres},
            dtPartida        = '${data}'
        WHERE idPartidasEquipe = ${idPartida};
    `;

    console.log(instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarUltimasPartidas(idJogador, limite_linhas) {

    var instrucaoSql = `
    SELECT
        p.idPartidasEquipe as id,
        p.resultado,
        p.duracao,
        p.totalAbates,
        p.totalAssistencias,
        p.totalMortes,
        p.totalGold,
        p.totalBaron,
        p.totalDrag,
        p.totalTorres,
        p.totalDano,
        p.dtPartida
    FROM PartidasEquipe p
    INNER JOIN Usuario u
        ON p.fkEquipe = u.fkEquipe
    WHERE u.idUsuario = ${idJogador}
    ORDER BY p.idPartidasEquipe DESC
    LIMIT ${limite_linhas};
`;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}

function cadastrar(
    resultado,
    duracao,
    abates,
    assistencias,
    mortes,
    gold,
    dano,
    baroes,
    dragoes,
    torres,
    data,
    idJogador
) {

    var instrucaoSql = `
    INSERT INTO PartidasEquipe
    (
        resultado,
        duracao,
        totalAbates,
        totalAssistencias,
        totalMortes,
        totalGold,
        totalBaron,
        totalDrag,
        totalTorres,
        totalDano,
        dtPartida,
        fkEquipe
    )

    SELECT
        ${resultado},
        ${duracao},
        ${abates},
        ${assistencias},
        ${mortes},
        ${gold},
        ${baroes},
        ${dragoes},
        ${torres},
        ${dano},
        '${data}',
        fkEquipe

    FROM Usuario

    WHERE idUsuario = ${idJogador};
`;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}

function excluir(idPartida) {

    var instrucaoSql = `
        DELETE FROM PartidasEquipe
        WHERE idPartidasEquipe = ${idPartida};
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasPartidas,
    cadastrar,
    excluir,
    atualizar
};