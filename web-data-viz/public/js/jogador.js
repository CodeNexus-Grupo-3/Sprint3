// ================================================
// INICIALIZAÇÃO
// ================================================

var idEditando = null;
var idUsuarioEdicao = null;

document.addEventListener("DOMContentLoaded", function () {

    iconeLetra();
    userModal();

    if (validarCargo()) {

        abrirPerfil(sessionStorage.fkUsuario);

        document.getElementById("fecharModal").style.display = "none";
        document.getElementById("lista_equipes").style.display = "none";
        document.getElementById("btn_cadastrar").style.display = "none";

        var containerUser = document.getElementById("container_user");
        var boxPerfil = document.getElementById("boxPerfil");
        boxPerfil.insertBefore(containerUser, boxPerfil.firstChild);

        containerUser.style.position = "absolute";
        containerUser.style.top = "15px";
        containerUser.style.right = "28px";

    } else {

        listarJogadores();

    }

});

function iconeLetra() {
    var nome = sessionStorage.nome;
    document.getElementById("userLetra").innerHTML = nome.charAt(0).toUpperCase();
}

function validarCargo() {
    console.log("Cargo:", sessionStorage.cargo);
    return sessionStorage.cargo == "Jogador";
}


// ================================================
// JOGADORES - LISTAGEM / CRUD
// ================================================

function listarJogadores() {
    var fkEquipe = sessionStorage.fkEquipe;
    fetch(`/usuarios/listarJogadores/${fkEquipe}`)
        .then(function (resposta) {
            resposta.json()
                .then(function (jogadores) {
                    console.log(jogadores);
                    lista_equipes.innerHTML = "";
                    for (var i = 0; i < jogadores.length; i++) {
                        var jogador = jogadores[i];
                        lista_equipes.innerHTML += `
                            <div class="item_equipe">
                                <span class="numero">${i + 1}</span>
                                <span class="material-symbols-outlined icone">person</span>
                                <span class="nome" onclick="abrirPerfil(${jogador.idUsuario})">
                                    ${jogador.nome} / ${jogador.nickname}
                                </span>
                                <div class="divisor"></div>
                                <span class="cargo_acoes">
                                    <span class="cargo">${jogador.funcao}</span>
                                    <span class="material-symbols-outlined icone_acao" onclick="editarJogador(${jogador.idUsuario})">edit</span>
                                    <span class="material-symbols-outlined icone_acao delete" onclick="deletarJogador(${jogador.idUsuario})">delete</span>
                                </span>
                            </div>
                        `;
                    }
                });
        })
        .catch(function (erro) {
            console.log(erro);
        });
}

function buscarPerfil(idUsuario) {
    fetch(`/usuarios/buscarPerfil/${idUsuario}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json()
                    .then(function (dados) {
                        console.log("PERFIL:", dados);
                        nomeJogador.innerHTML = `${dados.nome} / ${dados.nickname}`;
                        funcaoJogador.innerHTML = `${dados.funcao}`;
                    });
            }
        })
        .catch(function (erro) {
            console.log(erro);
        });
}

function editarJogador(idUsuario) {
    idEditando = idUsuario;
    fetch(`/usuarios/buscarPerfil/${idUsuario}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json()
                    .then(function (dados) {
                        input_nome.value = dados.nome;
                        input_nickname.value = dados.nickname;
                        input_email.value = dados.email;
                        select_cargo.value = dados.cargo;
                        input_telefone.value = dados.telefone;
                        select_pais.value = dados.pais;
                        input_senha.value = dados.senha;
                        select_funcao.value = dados.funcao;
                        btnEnviarCadastro.innerHTML = "SALVAR ALTERAÇÕES";
                        abrirCadastro();
                    });
            }
        });
}

function deletarJogador(idUsuario) {
    var confirmar = confirm("Deseja deletar este jogador?");
    if (confirmar == false) return;

    fetch(`/usuarios/deletar/${idUsuario}`, { method: "DELETE" })
        .then(function (resposta) {
            if (resposta.ok) {
                alert("Jogador deletado com sucesso!");
                listarJogadores();
            } else {
                alert("Erro ao deletar jogador");
            }
        })
        .catch(function (erro) {
            console.log(erro);
        });
}

function salvarJogador() {
    if (idUsuarioEdicao == null) {
        concluir();
    } else {
        atualizarJogador();
    }
}

function concluir() {
    var varNome = input_nome.value;
    var varNickname = input_nickname.value;
    var varEmail = input_email.value;
    var varCargo = select_cargo.value;
    var varTelefone = input_telefone.value;
    var varPais = select_pais.value;
    var varSenha = input_senha.value;
    var varFuncao = select_funcao.value;
    var varfkEquipe = sessionStorage.fkEquipe;

    if (varNome == "" || varNickname == "" || varEmail == "" || varCargo == "" ||
        varTelefone == "" || varPais == "" || varSenha == "" || varFuncao == "") {
        alert("Preencha todos os campos!");
        return;
    }

    // UPDATE
    if (idEditando != null) {
        fetch(`/usuarios/atualizar/${idEditando}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                serverNome: varNome,
                serverNickname: varNickname,
                serverEmail: varEmail,
                serverCargo: varCargo,
                serverTelefone: varTelefone,
                serverPais: varPais,
                serverSenha: varSenha,
                serverFuncao: varFuncao
            }),
        })
        .then(function (resposta) {
            if (resposta.ok) {
                alert("Jogador atualizado!");
                idEditando = null;
                btnEnviarCadastro.innerHTML = "CONCLUIR";
                fecharCadastro();
                listarJogadores();
            } else {
                throw "Erro ao atualizar jogador";
            }
        })
        .catch(function (erro) {
            console.log(erro);
        });
        return;
    }

    // CADASTRO
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            serverNome: varNome,
            serverNickname: varNickname,
            serverEmail: varEmail,
            serverCargo: varCargo,
            serverTelefone: varTelefone,
            serverPais: varPais,
            serverSenha: varSenha,
            serverFuncao: varFuncao,
            serverFkEquipe: varfkEquipe,
        }),
    })
    .then(function (resposta) {
        if (resposta.ok) {
            alert("Jogador cadastrado!");
            fecharCadastro();
            listarJogadores();
        } else {
            throw "Houve um erro ao tentar realizar o cadastro!";
        }
    })
    .catch(function (erro) {
        console.log(`#ERRO: ${erro}`);
    });
}

function limparCampos() {
    input_nome.value = "";
    input_nickname.value = "";
    input_email.value = "";
    select_cargo.value = "";
    input_telefone.value = "";
    select_pais.value = "";
    input_senha.value = "";
    select_funcao.value = "";
}


// ================================================
// MODAIS
// ================================================

function abrirPerfil(idUsuario) {
    buscarPerfil(idUsuario);
    buscarKpis(idUsuario);
    buscarGraficoLinha(idUsuario);
    document.getElementById("modalPerfil").style.display = "flex";
}

function fecharPerfil() {
    document.getElementById("modalPerfil").style.display = "none";
}

function abrirCadastro() {
    document.getElementById("modalCadastro").style.display = "flex";
}

function abrirCadastroNovo() {
    idEditando = null;
    limparCampos();
    btnEnviarCadastro.innerHTML = "CONCLUIR";
    document.getElementById("modalCadastro").style.display = "flex";
}

function fecharCadastro() {
    document.getElementById("modalCadastro").style.display = "none";
}


// ================================================
// GRÁFICOS / KPIs
// ================================================

function buscarKpis(idUsuario) {
    fetch(`/usuarios/buscarKpis/${idUsuario}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json()
                    .then(function (dados) {
                        console.log("KPIS:", dados);
                        kpiVitorias.innerHTML = dados.vitorias;
                        kpiDerrotas.innerHTML = dados.derrotas;
                        kpiKda.innerHTML = dados.kda;
                        kpiWinrate.innerHTML = dados.winrate + "%";
                    });
            } else {
                console.log("Erro ao buscar KPIs");
            }
        })
        .catch(function (erro) {
            console.log("Erro na requisição:", erro);
        });
}

function buscarGraficoLinha(idUsuario) {
    var meses = ["", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    fetch(`/usuarios/graficoVitorias/${idUsuario}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json()
                    .then(function (dados) {
                        console.log("GRAFICO:", dados);
                        var labels = [];
                        var valores = [];
                        for (var i = 0; i < dados.length; i++) {
                            labels.push(meses[dados[i].mes]);
                            valores.push(dados[i].vitorias);
                        }
                        criarGraficoLinha(labels, valores);
                    });
            }
        })
        .catch(function (erro) {
            console.log(erro);
        });
}

function criarGraficoLinha(labels, valores) {
    if (window.grafico1) window.grafico1.destroy();

    const ctx1 = document.getElementById("graficoLinha");
    window.grafico1 = new Chart(ctx1, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                data: valores,
                borderColor: "#00ffff",
                borderWidth: 2,
                tension: 0
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            responsive: true,
            scales: {
                x: {
                    ticks: { color: "white" },
                    grid: { color: "rgba(255,255,255,0.3)" }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: "white" },
                    grid: { color: "rgba(255,255,255,0.3)" }
                }
            }
        }
    });
}