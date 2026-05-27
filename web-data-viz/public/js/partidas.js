// const ID_JOGADOR = sessionStorage.getItem("idJogador");
// const ID_JOGADOR = localStorage.getItem("idJogador");
const ID_JOGADOR = sessionStorage.getItem("ID_USUARIO");
console.log("ID_JOGADOR:", ID_JOGADOR);
console.log("sessionStorage completo:", {...sessionStorage});

const API_BASE = "/partidas";

let chartLinha = null;
let chartDano = null;
let chartPizza = null;
let chartBarras = null;

document.addEventListener("DOMContentLoaded", () => {
    carregarPartidas();
});

async function carregarPartidas() {
    try {
        const res = await fetch(`${API_BASE}/ultimas/${ID_JOGADOR}`);

        if (res.status === 204) {
            mostrarEmpty();
            return;
        }

        if (!res.ok) {
            throw new Error(`Erro HTTP ${res.status}`);
        }

        const partidas = await res.json();
        renderTabela(partidas);

    } catch (erro) {
        console.error("Erro ao carregar partidas:", erro);
        mostrarEmpty();
    }
}

function renderTabela(partidas) {
    const tbody = document.getElementById("tabela-body");
    const empty = document.getElementById("empty-state");

    tbody.innerHTML = "";

    if (!partidas || partidas.length === 0) {
        mostrarEmpty();
        return;
    }

    empty.style.display = "none";

    const vitorias = partidas.filter(p => p.resultado == 1).length;

    const winrate = partidas.length > 0
        ? Math.round((vitorias / partidas.length) * 100)
        : 0;

    const elWinrate = document.querySelector(".winrate_box span");

    if (elWinrate) {
        elWinrate.textContent = `TAXA DE VITÓRIA: ${winrate}%`;
    }

    partidas.forEach((p, index) => {
        const tr = document.createElement("tr");

        tr.dataset.id = p.id;

        const resClasse = p.resultado == 1
            ? "badge-vitoria"
            : "badge-derrota";

        const numero = partidas.length - index;

        tr.innerHTML = `
            <td>${numero}</td>

            <td>
                <span class="badge ${resClasse}">
                    ${p.resultado == 1 ? "VITÓRIA" : "DERROTA"}
                </span>
            </td>

            <td>${formatarDuracao(p.duracao)}</td>
            <td>${p.totalAbates}</td>
            <td>${p.totalAssistencias}</td>
            <td>${p.totalMortes}</td>
            <td>${p.totalGold}</td>
            <td>${p.totalDano}</td>
            <td>${p.totalBaron}</td>
            <td>${p.totalDrag}</td>
            <td>${p.totalTorres}</td>
            <td>${formatarData(p.dataHora)}</td>

            <td>
                <div class="cell-acoes">
                    <button
                        class="btn-icon"
                        title="Ver detalhes"
                        onclick="abrirPartida(${p.id}, event, ${numero})">
                        open_in_new
                    </button>

                    <button
                        class="btn-icon deletar"
                        title="Excluir"
                        onclick="excluirPartida(${p.id}, event)">
                        delete
                    </button>
                </div>
            </td>
        `;

        tr.addEventListener("click", e => {
            if (e.target.closest(".btn-icon")) return;
            abrirPartida(p.id, null, numero);
        });

        tbody.appendChild(tr);
    });
}

function mostrarEmpty() {
    document.getElementById("empty-state").style.display = "block";
    document.getElementById("tabela-body").innerHTML = "";
}

function cadastrarPartida() {
    const tbody = document.getElementById("tabela-body");

    if (document.querySelector("tr.editando")) return;

    const tr = document.createElement("tr");

    tr.classList.add("nova-linha", "editando");
    tr.dataset.id = "novo";

    tr.innerHTML = `
        <td>—</td>

        <td>
            <select class="input-tabela" id="res-novo">
                <option value="1">VITÓRIA</option>
                <option value="0">DERROTA</option>
            </select>
        </td>

        <td>
            <input
                class="input-tabela"
                id="dur-novo"
                type="text"
                placeholder="00:00"
                style="width:60px">
        </td>

        <td>
            <input
                class="input-tabela"
                id="aba-novo"
                type="number"
                placeholder="0"
                min="0"
                style="width:50px">
        </td>

        <td>
            <input
                class="input-tabela"
                id="ast-novo"
                type="number"
                placeholder="0"
                min="0"
                style="width:50px">
        </td>

        <td>
            <input
                class="input-tabela"
                id="mor-novo"
                type="number"
                placeholder="0"
                min="0"
                style="width:50px">
        </td>

        <td>
            <input
                class="input-tabela"
                id="gld-novo"
                type="text"
                placeholder="0"
                style="width:70px">
        </td>

        <td>
            <input
                class="input-tabela"
                id="dan-novo"
                type="text"
                placeholder="0"
                style="width:70px">
        </td>

        <td>
            <input
                class="input-tabela"
                id="bar-novo"
                type="number"
                placeholder="0"
                min="0"
                style="width:40px">
        </td>

        <td>
            <input
                class="input-tabela"
                id="dra-novo"
                type="number"
                placeholder="0"
                min="0"
                style="width:40px">
        </td>

        <td>
            <input
                class="input-tabela"
                id="tor-novo"
                type="number"
                placeholder="0"
                min="0"
                style="width:40px">
        </td>

        <td>
            <input
                class="input-tabela"
                id="data-novo"
                type="datetime-local">
        </td>

        <td>
            <div class="cell-acoes">
                <button
                    class="btn-icon"
                    title="Salvar"
                    onclick="salvarNovaPartida()">
                    check_circle
                </button>

                <button
                    class="btn-icon deletar"
                    title="Cancelar"
                    onclick="cancelarCadastro()">
                    cancel
                </button>
            </div>
        </td>
    `;

    tbody.insertBefore(tr, tbody.firstChild);
    document.getElementById("dur-novo").focus();
}

async function salvarNovaPartida() {
    const resultadoTexto = document.getElementById("res-novo").value;
    const resultado = parseInt(resultadoTexto);

    const duracaoTexto =
        document.getElementById("dur-novo").value || "";

    const partes = duracaoTexto.split(":");

    const minutos = parseInt(partes[0]) || 0;
    const segundos = parseInt(partes[1]) || 0;

    const duracao = (minutos * 60) + segundos;

    const abates =
        parseInt(document.getElementById("aba-novo").value) || 0;

    const assistencias =
        parseInt(document.getElementById("ast-novo").value) || 0;

    const mortes =
        parseInt(document.getElementById("mor-novo").value) || 0;

    const gold = parseInt(
        (document.getElementById("gld-novo").value || "0")
        .replace(/\./g, "")
    ) || 0;

    const dano = parseInt(
        (document.getElementById("dan-novo").value || "0")
        .replace(/\./g, "")
    ) || 0;

    const baroes =
        parseInt(document.getElementById("bar-novo").value) || 0;

    const dragoes =
        parseInt(document.getElementById("dra-novo").value) || 0;

    const torres =
        parseInt(document.getElementById("tor-novo").value) || 0;

    const data =
        document.getElementById("data-novo").value;

    if (
        resultado === undefined ||
        duracaoTexto.trim() === "" ||
        !data
    ) {
        alert("Preencha os campos obrigatórios.");
        return;
    }

    const payload = {
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
        idJogador: ID_JOGADOR
    };

    console.log(payload);

    try {
        const res = await fetch(`${API_BASE}/cadastrar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const msg = await res.text();

            console.log(msg);
            alert(msg);

            return;
        }

        await carregarPartidas();
        cancelarCadastro();

    } catch (erro) {
        console.error("Erro ao cadastrar partida:", erro);
        alert("Erro ao cadastrar partida.");
    }
}

function cancelarCadastro() {
    const tr = document.querySelector("tr.editando");

    if (tr) {
        tr.remove();
    }
}

async function excluirPartida(id, event) {
    if (event) {
        event.stopPropagation();
    }

    if (!confirm(`Excluir partida #${id}?`)) return;

    try {
        const res = await fetch(`${API_BASE}/${id}`, {
            method: "DELETE"
        });

        if (!res.ok && res.status !== 404) {
            const msg = await res.text();

            alert(`Erro ao excluir: ${msg}`);
            return;
        }

        await carregarPartidas();

    } catch (erro) {
        console.error("Erro ao excluir partida:", erro);
        alert("Falha de conexão com o servidor.");
    }
}

async function abrirPartida(id, event, numero) {
    if (event) {
        event.stopPropagation();
    }

    try {
        const res = await fetch(`${API_BASE}/ultimas/${ID_JOGADOR}`);

        if (!res.ok) throw new Error();

        const partidas = await res.json();
        const p = partidas.find(x => x.id == id);

        if (!p) return;

        renderDetalhe(p, numero);

    } catch (erro) {
        console.error("Erro ao abrir partida:", erro);
    }
}

function renderDetalhe(p, numero) {
    document.getElementById("partida-titulo").textContent =
        `PARTIDA Nº ${numero ?? p.id}`;

    const resClasse = p.resultado == 1
        ? "badge-vitoria"
        : "badge-derrota";

    document.getElementById("partida-meta").innerHTML = `
        <span class="badge ${resClasse}">
            ${p.resultado == 1 ? "VITÓRIA" : "DERROTA"}
        </span>

        <span style="color:var(--cor-texto-suave);font-size:12px">
            ${formatarData(p.dataHora)}
        </span>
    `;

    const kda = p.totalMortes > 0
        ? (
            (p.totalAbates + p.totalAssistencias)
            / p.totalMortes
        ).toFixed(2)
        : "∞";

    const duracaoSegundos = Number(p.duracao) || 0;
    const duracaoMin = duracaoSegundos / 60;

    const danoNum = parseStat(p.totalDano);
    const goldNum = parseStat(p.totalGold);

    const danoMinuto = duracaoMin > 0
        ? Math.round(danoNum / duracaoMin).toLocaleString("pt-BR")
        : "—";

    document.getElementById("kpis-grid").innerHTML = `
        <div class="kpi-card">
            <div class="kpi-label">Abates</div>
            <div class="kpi-value">${p.totalAbates}</div>
            <div class="kpi-sub">Total da partida</div>
        </div>

        <div class="kpi-card">
            <div class="kpi-label">Mortes</div>
            <div class="kpi-value">${p.totalMortes}</div>
            <div class="kpi-sub">Total da partida</div>
        </div>

        <div class="kpi-card">
            <div class="kpi-label">Assistências</div>
            <div class="kpi-value">${p.totalAssistencias}</div>
            <div class="kpi-sub">Total da partida</div>
        </div>

        <div class="kpi-card">
            <div class="kpi-label">KDA</div>
            <div class="kpi-value">${kda}</div>
            <div class="kpi-sub">Time completo</div>
        </div>

        <div class="kpi-card">
            <div class="kpi-label">Dano/Min</div>
            <div class="kpi-value" style="font-size:16px">
                ${danoMinuto}
            </div>
            <div class="kpi-sub">Média por minuto</div>
        </div>
    `;

    destruirGraficos();

    Chart.defaults.color = "#3f5551";
    Chart.defaults.font.family = "Goldman";

    const duracaoTotalMin = Math.floor(duracaoSegundos / 60);
    const intervalo = duracaoTotalMin < 20 ? 3 : 5;

    const labels = [];

    for (let t = intervalo; t <= duracaoTotalMin; t += intervalo) {
        labels.push(`${t}min`);
    }

    if (labels.length < 3) {
        labels.length = 0;

        for (let i = 1; i <= 3; i++) {
            labels.push(`${intervalo * i}min`);
        }
    }

    const goldGrad = parseSerie(p.goldGrad, goldNum, labels.length);
    const danoGrad = parseSerie(p.danoGrad, danoNum, labels.length);

    const ctxLinha = document
        .getElementById("chart-linha")
        .getContext("2d");

    chartLinha = new Chart(ctxLinha, {
        type: "line",

        data: {
            labels,

            datasets: [{
                label: "Gold",
                data: goldGrad,
                borderColor: "#F2FF58",
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },

        options: opcoesLinha()
    });

    const ctxDano = document
        .getElementById("chart-dano")
        .getContext("2d");

    chartDano = new Chart(ctxDano, {
        type: "line",

        data: {
            labels,

            datasets: [{
                label: "Dano",
                data: danoGrad,
                borderColor: "#f87171",
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },

        options: opcoesLinha()
    });

    const kdaVal = p.totalMortes > 0
        ? parseFloat(
            (
                (p.totalAbates + p.totalAssistencias)
                / p.totalMortes
            ).toFixed(2)
        )
        : 10;

    const danoVal = Math.round(danoNum / 10000);
    const goldVal = Math.round(goldNum / 2000);

    const pizzaCores = [
        "rgba(242,255,88,0.7)",
        "rgba(248,113,113,0.7)",
        "rgba(74,222,128,0.7)"
    ];

    const pizzaLabels = [
        "KDA",
        "Dano (×10k)",
        "Gold (×2k)"
    ];

    const pizzaValores = [
        kdaVal,
        danoVal,
        goldVal
    ];

   // Remove legenda anterior se existir
const wrapperPizza = document.getElementById("chart-pizza").parentElement;
const legendaExistente = wrapperPizza.querySelector(".legenda-pizza");
if (legendaExistente) legendaExistente.remove();

// Legenda customizada com cor explícita
const legenda = document.createElement("div");
legenda.className = "legenda-pizza";
legenda.style.cssText = "display:flex;gap:16px;justify-content:center;margin-bottom:8px;font-size:12px;flex-wrap:wrap;align-items:center;color:#8fb8a8;";

pizzaLabels.forEach((label, i) => {
    const item = document.createElement("span");
    item.style.cssText = "display:flex;align-items:center;gap:4px;color:#8fb8a8;";
    item.innerHTML = `<span style="width:10px;height:10px;border-radius:2px;background:${pizzaCores[i]};flex-shrink:0;display:inline-block;"></span>${label}`;
    legenda.appendChild(item);
});

wrapperPizza.insertBefore(legenda, document.getElementById("chart-pizza"));

const ctxPizza = document.getElementById("chart-pizza").getContext("2d");

chartPizza = new Chart(ctxPizza, {
    type: "doughnut",
    data: {
        labels: pizzaLabels,
        datasets: [{
            data: pizzaValores,
            backgroundColor: pizzaCores
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "60%",
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 10,
                bottom: 10
            }
        },
        plugins: {
            legend: { display: false }
        }
    }
});

    const ctxBarras = document
        .getElementById("chart-barras")
        .getContext("2d");

    chartBarras = new Chart(ctxBarras, {
        type: "bar",

        data: {
            labels: [
                "Barões",
                "Torres",
                "Dragões"
            ],

            datasets: [
                {
                    label: "Barões",
                    data: [p.totalBaron, null, null]
                },

                {
                    label: "Torres",
                    data: [null, p.totalTorres, null]
                },

                {
                    label: "Dragões",
                    data: [null, null, p.totalDrag]
                }
            ]
        }
    });

    document.getElementById("view-historico")
        .classList.add("hidden");

    document.getElementById("view-partida")
        .classList.remove("hidden");
}

function voltarHistorico() {
    document.getElementById("view-partida")
        .classList.add("hidden");

    document.getElementById("view-historico")
        .classList.remove("hidden");
}

function sair() {
    sessionStorage.clear();
    window.location = "index.html";
}

function parseStat(valor) {
    if (typeof valor === "number") {
        return valor;
    }

    return parseFloat(
        String(valor)
        .replace(/\./g, "")
        .replace(",", ".")
    ) || 0;
}

function parseSerie(campo, total, tamanho = 10) {
    if (campo) {
        try {
            const arr = typeof campo === "string"
                ? JSON.parse(campo)
                : campo;

            if (Array.isArray(arr) && arr.length === tamanho) {
                return arr;
            }

        } catch (_) {}
    }

    return Array.from({ length: tamanho }, (_, i) =>
        Math.round(total * Math.log(i + 2) / Math.log(tamanho + 1))
    );
}

function formatarData(valor) {
    if (!valor) return "—";

    const d = new Date(valor);

    if (!isNaN(d)) {
        const dia = String(d.getUTCDate()).padStart(2, "0");

        const mes = String(d.getUTCMonth() + 1).padStart(2, "0");

        const ano = String(d.getUTCFullYear()).slice(-2);

        return `${dia}/${mes}/${ano}`;
    }

    return valor;
}

function formatarDuracao(segundos) {
    segundos = Number(segundos) || 0;

    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;

    return `${String(min).padStart(2, "0")}:${String(seg).padStart(2, "0")}`;
}

function destruirGraficos() {
    if (chartLinha) {
        chartLinha.destroy();
        chartLinha = null;
    }

    if (chartDano) {
        chartDano.destroy();
        chartDano = null;
    }

    if (chartPizza) {
        chartPizza.destroy();
        chartPizza = null;
    }

    if (chartBarras) {
        chartBarras.destroy();
        chartBarras = null;
    }
}

function opcoesLinha() {
    return {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            }
        },

        scales: {
            x: {
                grid: {
                    color: "rgba(37,76,60,0.4)"
                }
            },

            y: {
                grid: {
                    color: "rgba(37,76,60,0.4)"
                }
            }
        }
    };
}