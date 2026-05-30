// // var database = require("../database/config");

// // function postar(titulo, conteudo, fkUsuario){

// //     var instrucaoSql = `
// //         INSERT INTO PostagensForum
// //         (titulo, conteudo, fkUsuario)
// //         VALUES
// //         ('${titulo}', '${conteudo}', '${fkUsuario}');
// //     `;

// //     return database.executar(instrucaoSql);
// // }

// // function listar(){

// //     var instrucaoSql = `
// //         SELECT
// //             p.idPostagensForum,
// //             p.titulo,
// //             p.conteudo,
// //             p.likes,
// //             p.dataHora,
// //             u.nome,
// //             u.nickname
// //         FROM PostagensForum p
// //         JOIN Usuario u
// //             ON p.fkUsuario = u.idUsuario
// //         ORDER BY p.idPostagensForum DESC;
// //     `;

// //     return database.executar(instrucaoSql);
// // }

// // function curtir(idPost){

// //     var instrucaoSql = `
// //         UPDATE PostagensForum
// //         SET likes = likes + 1
// //         WHERE idPostagensForum = ${idPost};
// //     `;

// //     return database.executar(instrucaoSql);
// // }

// // module.exports = {
// //     postar,
// //     listar,
// //     curtir
// // }


// var database = require("../database/config");

// function postar(titulo, conteudo, fkUsuario){

//     var instrucaoSql = `
//         INSERT INTO PostagensForum
//         (titulo, conteudo, fkUsuario)
//         VALUES
//         ('${titulo}', '${conteudo}', ${fkUsuario});
//     `;

//     return database.executar(instrucaoSql);
// }

// function listar(){

//     var instrucaoSql = `
//         SELECT 
//             pf.idPostagensForum,
//             pf.titulo,
//             pf.conteudo,
//             pf.likes,
//             pf.fkUsuario,
//             u.nickname
//         FROM PostagensForum pf
//         JOIN Usuario u
//             ON pf.fkUsuario = u.idUsuario
//         ORDER BY pf.idPostagensForum DESC;
//     `;

//     return database.executar(instrucaoSql);
// }

// function curtir(idPost){

//     var instrucaoSql = `
//         UPDATE PostagensForum
//         SET likes = likes + 1
//         WHERE idPostagensForum = ${idPost};
//     `;

//     return database.executar(instrucaoSql);
// }

// function editar(idPost, conteudo){

//     var instrucaoSql = `
//         UPDATE PostagensForum
//         SET conteudo = '${conteudo}'
//         WHERE idPostagensForum = ${idPost};
//     `;

//     return database.executar(instrucaoSql);
// }

// function deletar(idPost){

//     var instrucaoSql = `
//         DELETE FROM PostagensForum
//         WHERE idPostagensForum = ${idPost};
//     `;

//     return database.executar(instrucaoSql);
// }

// module.exports = {
//     postar,
//     listar,
//     curtir,
//     editar,
//     deletar
// }

// var db = require("../db/connection");

var db = require("../database/config");

function listarPosts(fkEquipe) {
    var sql = `
        SELECT 
    pf.idPostagensForum,
    pf.titulo,
    pf.conteudo,
    pf.likes,
    pf.dataHora,
    pf.fkUsuario,
    u.nickname
    FROM PostagensForum pf
    INNER JOIN Usuario u ON u.idUsuario = pf.fkUsuario
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

function curtirPost(idPostagensForum) {
    var sql = `
        UPDATE PostagensForum
        SET likes = likes + 1
        WHERE idPostagensForum = ${idPostagensForum}
    `;
    return db.executar(sql);
}

function deletarPost(idPostagensForum) {
    var sql = `
        DELETE FROM PostagensForum
        WHERE idPostagensForum = ${idPostagensForum}
    `;
    return db.executar(sql);
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
    deletarPost,
    editarPost
};