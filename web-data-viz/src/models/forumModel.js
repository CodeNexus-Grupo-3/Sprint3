var database = require("../database/config");

function postar(titulo, conteudo, fkUsuario){

    var instrucaoSql = `
        INSERT INTO PostagensForum
        (titulo, conteudo, fkUsuario)
        VALUES
        ('${titulo}', '${conteudo}', ${fkUsuario});
    `;

    return database.executar(instrucaoSql);
}

function listar(){

    var instrucaoSql = `
        SELECT
            p.idPostagensForum,
            p.titulo,
            p.conteudo,
            p.likes,
            p.dataHora,
            u.nome,
            u.nickname
        FROM PostagensForum p
        JOIN Usuario u
            ON p.fkUsuario = u.idUsuario
        ORDER BY p.idPostagensForum DESC;
    `;

    return database.executar(instrucaoSql);
}

function curtir(idPost){

    var instrucaoSql = `
        UPDATE PostagensForum
        SET likes = likes + 1
        WHERE idPostagensForum = ${idPost};
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    postar,
    listar,
    curtir
}