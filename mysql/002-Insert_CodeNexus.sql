USE codenexus;

-- Equipes
INSERT INTO Equipe (nome, regiao, titulos) VALUES
    ('CodeWarriors', 'Brasil', 3),
    ('NexusMasters', 'Europa', 5);

-- Usuários
-- Devs
INSERT INTO Usuario (nome, email, senha, telefone, pais, cargo, notificar) VALUES
    ('Lucas Quevedo', 'lucas.castro@sptech.school', 'senha123', '11999999999', 'Brasil', 'Dev', 1),
    ('Marina Okamoto', 'marina.okamoto@sptech.school', 'senha123', '11988888888', 'Brasil', 'Dev', 1),
    ('Lesly Oliveira', 'lesley.oliveira@sptech.school', 'senha123', '11977777777', 'Portugal', 'Dev', 1);

-- Treinadores
INSERT INTO Usuario (nome, email, senha, telefone, pais, cargo, fkEquipe, notificar) VALUES
    ('Vinicius Santana', 'vinicius.gama@sptech.school', 'senha123', '11966666666', 'Brasil', 'Treinador', 1, 1),
    ('Nicolas Mazza', 'nicolas.ibrahim@sptech.school', 'senha123', '11955555555', 'Espanha', 'Treinador', 2, 1);

-- Jogadores
INSERT INTO Usuario (nome, nickname, email, senha, telefone, pais, funcao, cargo, fkEquipe) VALUES
    -- CodeWarriors
    ('Felipe Melo', 'LTop', 'felipe.top@codenexus.com', 'senha123', '11944444444', 'Brasil', 'Top', 'Jogador', 1),
    ('Mateus Strilicherk', 'MMid', 'mateus.mid@codenexus.com', 'senha123', '11933333333', 'Brasil', 'Mid', 'Jogador', 1),
    ('Gleison Almeida', 'RJungle', 'gleison.jungle@codenexus.com', 'senha123', '11922222222', 'Brasil', 'Jungle', 'Jogador', 1),
    ('Tiago Santos', 'TSup', 'tiago.sup@codenexus.com', 'senha123', '11911111111', 'Brasil', 'Sup', 'Jogador', 1),
    ('Caio José', 'FADC', 'caio.adc@codenexus.com', 'senha123', '11900000000', 'Brasil', 'ADC', 'Jogador', 1),
    -- NexusMasters
    ('André Menezes', 'ATop', 'andre.top@codenexus.com', 'senha123', '21999999999', 'Portugal', 'Top', 'Jogador', 2),
    ('Bruno Arruda', 'BMid', 'bruno.mid@codenexus.com', 'senha123', '21988888888', 'Espanha', 'Mid', 'Jogador', 2),
    ('Diego Castro', 'DJungle', 'diego.jungle@codenexus.com', 'senha123', '21977777777', 'França', 'Jungle', 'Jogador', 2),
    ('Eduardo Marinho', 'ESup', 'eduardo.sup@codenexus.com', 'senha123', '21966666666', 'Alemanha', 'Sup', 'Jogador', 2),
    ('Fernando Almada', 'FADC2', 'fernando.adc@codenexus.com', 'senha123', '21955555555', 'Itália', 'ADC', 'Jogador', 2);

-- Postagens do Fórum
INSERT INTO PostagensForum (titulo, conteudo, dataHora, likes, fkUsuario) VALUES
    -- Vinicius
    ('Treino intenso', 'Hoje tivemos um treino muito produtivo.', '2026-04-02 14:00:00', 10, 4),
    ('Preparação para campeonato', 'Estamos focados no próximo torneio.', '2026-04-10 16:00:00', 15, 4),
    ('Feedback dos jogadores', 'A equipe está evoluindo bem.', '2026-04-18 18:00:00', 20, 4),
    -- Mazza
    ('Treino europeu', 'A equipe treinou estratégias novas.', '2026-04-03 15:00:00', 12, 5),
    ('Campeonato europeu', 'Nosso foco é o título.', '2026-04-12 17:00:00', 18, 5),
    ('Avaliação semanal', 'Os jogadores estão motivados.', '2026-04-20 19:00:00', 22, 5);

-- Partidas Individuais
INSERT INTO PartidasIndividual (dtPartida, resultado, duracao, abates, assistencias, mortes, cs, dano, fkUsuario) VALUES
    ('2026-04-01', 1, 35, 5, 3, 2, 200, 15000, 6),
    ('2026-04-05', 0, 40, 2, 5, 4, 180, 12000, 6),
    ('2026-04-09', 1, 32, 7, 2, 1, 210, 16000, 6),
    ('2026-04-02', 1, 34, 8, 6, 3, 220, 17000, 7),
    ('2026-04-06', 0, 38, 4, 7, 5, 190, 14000, 7),
    ('2026-04-10', 1, 36, 9, 5, 2, 230, 18000, 7),
    ('2026-04-03', 1, 33, 6, 8, 4, 150, 16000, 8),
    ('2026-04-07', 0, 39, 3, 9, 6, 140, 13000, 8),
    ('2026-04-11', 1, 37, 7, 10, 3, 160, 17500, 8),
    ('2026-04-04', 1, 31, 2, 12, 2, 80, 9000, 9),
    ('2026-04-08', 0, 35, 1, 14, 5, 70, 8500, 9),
    ('2026-04-12', 1, 33, 3, 15, 1, 90, 9500, 9),
    ('2026-04-13', 1, 34, 10, 4, 2, 240, 20000, 10),
    ('2026-04-17', 0, 38, 6, 5, 6, 220, 17000, 10),
    ('2026-04-21', 1, 36, 11, 3, 3, 250, 21000, 10),
    ('2026-04-14', 1, 35, 6, 2, 2, 210, 16000, 11),
    ('2026-04-18', 0, 39, 3, 4, 5, 190, 14000, 11),
    ('2026-04-22', 1, 33, 7, 3, 1, 220, 16500, 11),
    ('2026-04-15', 1, 34, 9, 7, 2, 230, 18500, 12),
    ('2026-04-19', 0, 37, 5, 6, 6, 200, 15000, 12),
    ('2026-04-23', 1, 36, 10, 8, 3, 240, 19000, 12),
    ('2026-04-16', 1, 32, 7, 9, 4, 160, 17000, 13),
    ('2026-04-20', 0, 38, 4, 10, 7, 150, 14500, 13),
    ('2026-04-24', 1, 35, 8, 11, 3, 170, 18000, 13),
    ('2026-04-17', 1, 30, 2, 13, 2, 85, 9500, 14),
    ('2026-04-21', 0, 34, 1, 12, 5, 75, 9000, 14),
    ('2026-04-25', 1, 32, 3, 14, 1, 95, 9800, 14),
    ('2026-04-18', 1, 35, 12, 5, 2, 250, 21000, 15),
    ('2026-04-22', 0, 39, 7, 6, 6, 230, 18000, 15),
    ('2026-04-26', 1, 37, 13, 4, 3, 260, 22000, 15);


-- Partidas de Equipe
INSERT INTO PartidasEquipe (dtPartida, resultado, tipo, duracao, totalAbates, totalAssistencias, totalMortes, totalGold, totalBaron, totalDrag, totalTorres, totalDano, fkEquipe) VALUES
    -- CodeWarriors
    ('2026-04-04', 1, 'Amistoso', 40, 25, 40, 20, 60000, 1, 2, 8, 120000, 1),
    ('2026-04-08', 0, 'Rankeada', 38, 18, 30, 25, 55000, 0, 1, 6, 100000, 1),
    ('2026-04-12', 1, 'Treino', 42, 30, 50, 15, 65000, 2, 3, 9, 130000, 1),
    ('2026-04-16', 0, 'Campeonato', 45, 20, 35, 28, 58000, 1, 2, 7, 110000, 1),
    ('2026-04-20', 1, 'Rankeada', 39, 28, 45, 18, 62000, 2, 2, 10, 125000, 1),
    -- NexusMasters
    ('2026-04-06', 1, 'Amistoso', 41, 27, 42, 19, 61000, 1, 2, 9, 122000, 2),
    ('2026-04-10', 0, 'Rankeada', 37, 19, 33, 26, 54000, 0, 1, 6, 98000, 2),
    ('2026-04-14', 1, 'Treino', 43, 32, 55, 14, 67000, 2, 3, 9, 135000, 2),
    ('2026-04-18', 0, 'Campeonato', 46, 21, 36, 29, 59000, 1, 2, 7, 112000, 2),
    ('2026-04-22', 1, 'Rankeada', 40, 29, 47, 17, 63000, 2, 2, 10, 127000, 2);