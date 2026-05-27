CREATE DATABASE IF NOT EXISTS codenexus;
USE codenexus;

-- Equipe
CREATE TABLE Equipe (
    idEquipe INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(75) NOT NULL,
    regiao VARCHAR(75),
    titulos INT DEFAULT 0
);

INSERT INTO Equipe (nome, regiao, titulos) VALUES
('marina goat', 'Brasil', 3);

-- Usuario
CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(75) NOT NULL,
    nickname VARCHAR(75),
    email VARCHAR(75) NOT NULL UNIQUE,
    senha VARCHAR(75) NOT NULL,
    telefone VARCHAR(11),
    pais VARCHAR(75),
    funcao VARCHAR(6),
    CONSTRAINT chkFuncao
		CHECK (funcao IN ('Top', 'Mid', 'Jungle', 'Sup', 'ADC')),
    cargo VARCHAR(9) NOT NULL,
    CONSTRAINT chkCargo 
		CHECK (cargo IN ('Dev', 'Suporte', 'Treinador', 'Jogador')),
    fkEquipe INT,
    CONSTRAINT fkUsuarioEquipe
        FOREIGN KEY (fkEquipe) REFERENCES Equipe(idEquipe),
    notificar TINYINT
);

INSERT INTO Usuario 
(nome, nickname, email, senha, telefone, pais, funcao, cargo, fkEquipe, notificar)
VALUES
('Marina Okamoto', 'YuriMid', 'marina@email.com', 'senha', '11987654321', 
'Brasil', 'Mid', 'Jogador', 1, 1);

INSERT INTO Usuario 
(nome, nickname, email, senha, telefone, pais, funcao, cargo, fkEquipe, notificar)
VALUES
('Kenzo Uehara', 'Mitohara', 'kenzo@email.com', 'senha', '11987654321', 
'Brasil', 'Top', 'Treinador', 1, 1);

-- PostagensForum
CREATE TABLE PostagensForum (
    idPostagensForum INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(75) NOT NULL,
    conteudo TEXT NOT NULL,
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    likes INT DEFAULT 0,
    fkUsuario INT NOT NULL,
    CONSTRAINT fkPostagemUsuario
        FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario)
);

INSERT INTO PostagensForum
(titulo, conteudo, likes, dataHora, fkUsuario)
VALUES
(
    'Melhor composição para o meta atual',
    'Alguém tem sugestões de composição forte para o patch atual? Estamos tendo dificuldade nas team fights.',
    18,
    '2026-05-25 19:30:00',
    2
);

select* from PostagensForum;

-- PartidasIndividual
CREATE TABLE PartidasIndividual (
    idPartidasTime INT AUTO_INCREMENT PRIMARY KEY,
    dtPartida DATE DEFAULT (CURDATE()),
    resultado TINYINT NOT NULL,
    duracao INT NOT NULL,
    abates INT DEFAULT 0,
    assistencias INT DEFAULT 0,
    mortes INT DEFAULT 0,
    cs INT DEFAULT 0,
    dano INT DEFAULT 0,
    fkUsuario INT NOT NULL,
    CONSTRAINT fkPartidaDoUsuario
        FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario)
);

-- PartidasEquipe
CREATE TABLE PartidasEquipe (
    idPartidasEquipe INT AUTO_INCREMENT PRIMARY KEY,
    dtPartida DATE DEFAULT (CURDATE()),
    resultado TINYINT NOT NULL,
    tipo VARCHAR(75),
    CONSTRAINT chkTipo 
		CHECK (tipo IN ('Amistoso', 'Rankeada', 'Treino', 'Campeonato')),
    duracao INT,
    totalAbates INT DEFAULT 0,
    totalAssistencias INT DEFAULT 0,
    totalMortes INT DEFAULT 0,
    totalGold INT DEFAULT 0,
    totalBaron INT DEFAULT 0,
    totalDrag INT DEFAULT 0,
    totalTorres INT DEFAULT 0,
    totalDano INT DEFAULT 0,
    fkEquipe INT NOT NULL,
    CONSTRAINT fkPartidaDaEquipe
        FOREIGN KEY (fkEquipe) REFERENCES Equipe(idEquipe)
);

INSERT INTO PartidasEquipe
(dtPartida, resultado, tipo, duracao, totalAbates, totalAssistencias,
totalMortes, totalGold, totalBaron, totalDrag, totalTorres, totalDano, fkEquipe)
VALUES
('2026-05-22', 1, 'Rankeada', 3100, 27, 61,
14, 68200, 1, 3, 9, 84500, 1);

-- Trusted
CREATE TABLE Trusted (
    idTrusted INT AUTO_INCREMENT PRIMARY KEY,
    equipe VARCHAR(75),
    duracao INT,
    totalAbates INT DEFAULT 0,
    totalAssistencias INT DEFAULT 0,
    totalMortes INT DEFAULT 0,
    totalGold INT DEFAULT 0,
    totalBaron INT DEFAULT 0,
    totalDrag INT DEFAULT 0,
    totalTorres INT DEFAULT 0,
    totalDano INT DEFAULT 0
);

INSERT INTO Trusted
(equipe, duracao, totalAbates, totalAssistencias, totalMortes,
totalGold, totalBaron, totalDrag, totalTorres, totalDano)
VALUES
('t1', 2460, 32, 74, 18,
72100, 2, 4, 10, 91300);

-- JavaLog
CREATE TABLE JavaLog (
    idLog INT AUTO_INCREMENT PRIMARY KEY,
    dtLog DATE DEFAULT (CURDATE()),
    codigoStatus VARCHAR(75),
    evento VARCHAR(75),
    servico VARCHAR(75),
    mensagemErro TEXT,
    stacktrace TEXT
);

-- FaleConosco
CREATE TABLE FaleConosco (
    idFaleConosco INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(75) NOT NULL,
    email VARCHAR(75) NOT NULL,
    telefone VARCHAR(11),
    equipe VARCHAR(75),
    mensagem TEXT NOT NULL
);