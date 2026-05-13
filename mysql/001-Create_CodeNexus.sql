CREATE DATABASE IF NOT EXISTS codenexus;
USE codenexus;

-- Equipe
CREATE TABLE Equipe (
    idEquipe INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(75) NOT NULL,
    regiao VARCHAR(75),
    titulos INT DEFAULT 0
);

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
        FOREIGN KEY (fkEquipe) REFERENCES Equipe(idEquipe)
);

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

-- PartidasIndividual
CREATE TABLE PartidasIndividual (
    idPartidasTime INT AUTO_INCREMENT PRIMARY KEY,
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
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
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
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

-- Dashboard
CREATE TABLE Dashboard (
    idDashboard INT AUTO_INCREMENT PRIMARY KEY,
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

-- Log
CREATE TABLE Log (
    idLog INT AUTO_INCREMENT PRIMARY KEY,
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
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