
// var db = require("../database/config");

// function listarPosts(fkEquipe) {
//     var sql = `
//         SELECT 
//             pf.idPostagensForum,
//             pf.titulo,
//             pf.conteudo,
//             pf.likes,
//             pf.dataHora,
//             pf.fkUsuario
//         FROM PostagensForum pf
//         INNER JOIN Usuario u ON u.idUsuario = pf.fkUsuario
//         WHERE u.fkEquipe = ${fkEquipe}
//         ORDER BY pf.dataHora DESC
//     `;
//     return db.executar(sql);
// }

// function postarMensagem(titulo, conteudo, fkUsuario) {
//     var sql = `
//         INSERT INTO PostagensForum (titulo, conteudo, fkUsuario)
//         VALUES ('${titulo}', '${conteudo}', ${fkUsuario})
//     `;
//     return db.executar(sql);
// }

// function curtirPost(idPostagensForum) {
//     var sql = `
//         UPDATE PostagensForum
//         SET likes = likes + 1
//         WHERE idPostagensForum = ${idPostagensForum}
//     `;
//     return db.executar(sql);
// }

// function descurtirPost(idPostagensForum) {
//     var sql = `
//         UPDATE PostagensForum
//         SET likes = likes - 1
//         WHERE idPostagensForum = ${idPostagensForum}
//     `;
//     return db.executar(sql);
// }

// function deletarPost(idPostagensForum) {
//     var sql = `
//         DELETE FROM PostagensForum
//         WHERE idPostagensForum = ${idPostagensForum}
//     `;
//     return db.executar(sql);
// }

// function editarPost(idPostagensForum, conteudo) {
//     var sql = `
//         UPDATE PostagensForum
//         SET conteudo = '${conteudo}'
//         WHERE idPostagensForum = ${idPostagensForum}
//     `;
//     return db.executar(sql);
// }

// module.exports = {
//     listarPosts,
//     postarMensagem,
//     curtirPost,
//     descurtirPost,
//     deletarPost,
//     editarPost
// };


var db = require("../database/config");

function listarPosts(fkEquipe, fkUsuario) {
    var sql = `
        SELECT 
            pf.idPostagensForum,
            pf.titulo,
            pf.conteudo,
            pf.likes,
            pf.dataHora,
            pf.fkUsuario,
            CASE WHEN lf.fkUsuario IS NOT NULL THEN 1 ELSE 0 END AS curtido
        FROM PostagensForum pf
        INNER JOIN Usuario u ON u.idUsuario = pf.fkUsuario
        LEFT JOIN LikesForum lf 
            ON lf.fkPostagem = pf.idPostagensForum 
            AND lf.fkUsuario = ${fkUsuario}
        WHERE u.fkEquipe = ${fkEquipe}
        ORDER BY pf.dataHora DESC
    `;
    return db.executar(sql);
}

function postarMensagem(titulo, conteudo, fkUsuario) {
    var sql = `
        INSERT INTO PostagensForum (titulo, conteudo, fkUsuario)
        VALUES ('${titulo}', '${conteudo}', ${fkUsuario})
    `;
    return db.executar(sql);
}

function curtirPost(idPostagensForum, fkUsuario) {
    var sql = `
        INSERT INTO LikesForum (fkUsuario, fkPostagem)
        VALUES (${fkUsuario}, ${idPostagensForum})
    `;
    return db.executar(sql)
    .then(function() {
        return db.executar(`
            UPDATE PostagensForum
            SET likes = likes + 1
            WHERE idPostagensForum = ${idPostagensForum}
        `);
    });
}

function descurtirPost(idPostagensForum, fkUsuario) {
    var sql = `
        DELETE FROM LikesForum
        WHERE fkUsuario = ${fkUsuario} AND fkPostagem = ${idPostagensForum}
    `;
    return db.executar(sql)
    .then(function() {
        return db.executar(`
            UPDATE PostagensForum
            SET likes = likes - 1
            WHERE idPostagensForum = ${idPostagensForum}
        `);
    });
}

function deletarPost(idPostagensForum) {
    return db.executar(`DELETE FROM LikesForum WHERE fkPostagem = ${idPostagensForum}`)
    .then(function() {
        return db.executar(`
            DELETE FROM PostagensForum
            WHERE idPostagensForum = ${idPostagensForum}
        `);
    });
}

function editarPost(idPostagensForum, conteudo) {
    var sql = `
        UPDATE PostagensForum
        SET conteudo = '${conteudo}'
        WHERE idPostagensForum = ${idPostagensForum}
    `;
    return db.executar(sql);
}

module.exports = {
    listarPosts,
    postarMensagem,
    curtirPost,
    descurtirPost,
    deletarPost,
    editarPost
};