var database = require("../database/config");

function autenticar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha,
  );
  var instrucaoSql = `
        SELECT idUsuario, nome, senha, email, cargo, fkEquipe FROM Usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(
  nome,
  nickname,
  email,
  cargo,
  telefone,
  pais,
  senha,
  funcao,
  fkEquipe,
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    email,
    senha,
  );

  // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
  //  e na ordem de inserção dos dados.
  var instrucaoSql = `
    INSERT INTO Usuario
    (nome, nickname, email, senha, telefone, pais, funcao, cargo, fkEquipe)
    VALUES
    (
        '${nome}',
        '${nickname}',
        '${email}',
        '${senha}',
        '${telefone}',
        '${pais}',
        '${funcao}',
        '${cargo}',
        '${fkEquipe}'
    );
`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarKpis(idUsuario) {
  var instrucaoSql = `
        SELECT 
            SUM(resultado) AS vitorias,
            COUNT(*) - SUM(resultado) AS derrotas,
            ROUND(
                (
                    SUM(abates) + SUM(assistencias)
                ) / NULLIF(SUM(mortes), 0),
            2) AS kda,
            ROUND(
                (
                    SUM(resultado) / COUNT(*)
                ) * 100,
            0) AS winrate
        FROM PartidasIndividual
        WHERE fkUsuario = ${idUsuario};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarJogadores(fkEquipe) {
  var instrucaoSql = `
        SELECT idUsuario, nome, nickname, funcao FROM Usuario WHERE fkEquipe = ${fkEquipe} AND cargo = 'Jogador';`;
  console.log(instrucaoSql);
  return database.executar(instrucaoSql);
}

function graficoVitorias(idUsuario) {
  var instrucaoSql = `
        SELECT 
            MONTH(dtPartida) AS mes,
            SUM(resultado) AS vitorias
        FROM PartidasIndividual
        WHERE fkUsuario = ${idUsuario}
        GROUP BY MONTH(dtPartida)
        ORDER BY MONTH(dtPartida);
    `;
  console.log(instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarPerfil(idUsuario) {
  var instrucaoSql = `

        SELECT nome, nickname, email, telefone, pais, senha, cargo, funcao
        FROM Usuario
        WHERE idUsuario = ${idUsuario};
        `;
  console.log(instrucaoSql);
  return database.executar(instrucaoSql);
}

function deletarPartidas(idUsuario) {
  var instrucaoSql = `
    
        DELETE FROM PartidasIndividual
        WHERE fkUsuario = ${idUsuario};
    
    `;

  return database.executar(instrucaoSql);
}

function deletar(idUsuario) {
  var instrucaoSql = `
        DELETE FROM Usuario WHERE idUsuario = ${idUsuario};
    `;
  return database.executar(instrucaoSql);
}

function atualizar(
    idUsuario,
    nome,
    nickname,
    email,
    cargo,
    telefone,
    pais,
    senha,
    funcao
) {

    var instrucaoSql = `
    
        UPDATE Usuario SET
            nome = '${nome}',
            nickname = '${nickname}',
            email = '${email}',
            cargo = '${cargo}',
            telefone = '${telefone}',
            pais = '${pais}',
            senha = '${senha}',
            funcao = '${funcao}'
        WHERE idUsuario = ${idUsuario};

    `;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);

}


module.exports = {
  autenticar,
  cadastrar,
  buscarKpis,
  listarJogadores,
  graficoVitorias,
  buscarPerfil,
  deletarPartidas,
  deletar,
  atualizar
};
