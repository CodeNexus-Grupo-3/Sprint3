
    window.onload = carregarDash;

    function carregarDash() {
        console.log("Página carregou");
        iconeLetra();
        kpiDuracaoTime();
        kpiDuracaoGeral();
        kpiDanoTime();
        kpiDanoGeral();
        kpiGoldMinuTime();
        kpiGoldMinuGeral();
        kpiGoldEficTime();
        kpiGoldEficGeral();
        graficoObjetivos();
        graficoGoldDano();
        graficoKDA();
        iconeLetra();
        userModal();
    };

    // LETRA DO ICONE
    function iconeLetra(){
        var nome = sessionStorage.nome;
        document.getElementById("userLetra").innerHTML = nome.charAt(0).toUpperCase();
    };

    // KPIS
    // KPI DE DURAÇÃO:
    function kpiDuracaoTime(){
        var fkEquipe = sessionStorage.fkEquipe;
        fetch(`/dashboard/kpiDuracaoTime/${fkEquipe}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    document.getElementById("kpiDuracaoTime").innerHTML =
                    Number(resposta[0].mediaMinutosEquipe).toFixed(0);
                }
            )} else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
    
        }) .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        })
    }

    function kpiDuracaoGeral(){
        fetch(`/dashboard/kpiDuracaoGeral`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    document.getElementById("kpiDuracaoGeral").innerHTML =
                    Number(resposta[0].mediaMinutos).toFixed(0);
                }
            )} else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
    
        }) .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        })
    }

    // KPI DE DANO/MINUTO:
    function kpiDanoTime(){
        var fkEquipe = sessionStorage.fkEquipe;
        fetch(`/dashboard/kpiDanoTime/${fkEquipe}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    document.getElementById("kpiDanoTime").innerHTML =
                    Number(resposta[0].mediaDanoMinuEquipe).toFixed(0);
                }
            )} else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
    
        }) .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        })
    };

    function kpiDanoGeral(){
        fetch(`/dashboard/kpiDanoGeral`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    document.getElementById("kpiDanoGeral").innerHTML =
                    Number(resposta[0].mediaDanoMinu).toFixed(0);
                }
            )} else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
    
        }) .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        })
    };
    
    // KPIS DE GOLD/MIN
    function kpiGoldMinuTime(){
        var fkEquipe = sessionStorage.fkEquipe;
        fetch(`/dashboard/kpiGoldMinuTime/${fkEquipe}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    document.getElementById("kpiGoldMinuTime").innerHTML =
                    Number(resposta[0].mediaGoldMinuEquipe).toFixed(0);
                }
            )} else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
    
        }) .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        })
    };

    function kpiGoldMinuGeral(){
        fetch(`/dashboard/kpiGoldMinuGeral`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    document.getElementById("kpiGoldMinuGeral").innerHTML =
                    Number(resposta[0].mediaGoldMinu).toFixed(0);
                }
            )} else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
    
        }) .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        })
    };

    // KPIS DE EFICIENCIA DE GOLD
    function kpiGoldEficTime(){
        var fkEquipe = sessionStorage.fkEquipe;
        fetch(`/dashboard/kpiGoldEficTime/${fkEquipe}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    document.getElementById("kpiGoldEficTime").innerHTML =
                    Number(resposta[0].mediaGoldEficEquipe).toFixed(2);
                }
            )} else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
    
        }) .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        })
    };

    function kpiGoldEficGeral(){
        fetch(`/dashboard/kpiGoldEficGeral`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    document.getElementById("kpiGoldEficGeral").innerHTML =
                    Number(resposta[0].mediaGoldEfic).toFixed(2);
                }
            )} else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
    
        }) .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        })
    };

    //GRÁFICOS
    function graficoObjetivos(){
    const ctx = document.getElementById('grafico');
    Chart.defaults.font.family = 'Goldman';
    var fkEquipe = sessionStorage.fkEquipe;

    fetch(`/dashboard/graficoObjetivos/${fkEquipe}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ['Dragões', 'Barões', 'Torres'],
                            datasets: [
                                {
                                    label: 'Time',
                                    data: [resposta.time.dragTime, resposta.time.baroesTime, resposta.time.torresTime],
                                    borderColor: '#e6f14a',
                                    borderWidth: 2,
                                    backgroundColor: '#e6f14a80'
                                },
                                {
                                    label: 'Geral',
                                    data: [resposta.geral.dragGeral, resposta.geral.baroesGeral, resposta.geral.torresGeral],
                                    borderColor: '#1f7a73',
                                    borderWidth: 2,
                                    backgroundColor: '#1f7a7370'
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false
                                },
                                title: {
                                    display: true,
                                    text: 'OBJETIVOS\nPOR JOGO',
                                    padding: {
                                        bottom: 30,
                                    },
                                    color: '#ffffff',
                                    font: {
                                        size: 24,
                                        weight: '400'
                                    }
                                }
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        padding: 4,
                                        font: {
                                            size: 20,
                                        },
                                        color: '#ffffff'
                                    },
                                    grid: {
                                        color: '#cccccc33'
                                    }
                                },
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        color: '#ffffff'
                                    },
                                    grid: {
                                        color: '#cccccc33'
                                    }
                                }
                            }
                        }
                    });

                }
            )} else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        }) .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    })
    }

    function graficoGoldDano(){
    const ctxy = document.getElementById('grafico2').getContext('2d');
    var fkEquipe = sessionStorage.fkEquipe;

    fetch(`/dashboard/graficoGoldDano/${fkEquipe}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    
                    const data = {
                        labels: ['Gold', 'Dano'], // As 3 fileiras
                        datasets: [
                            {
                                label: 'Time',
                                // Valores negativos para crescerem à esquerda
                                data: [resposta.time[0].goldTime, resposta.time[0].danoTime],
                                borderColor: '#e6f14a',
                                borderWidth: 1,
                                backgroundColor: '#e6f14a60',
                                borderSkipped: false,
                            },
                            {
                                label: 'Geral',
                                // Valores positivos para crescerem à direita
                                data: [resposta.geral[0].goldGeral, resposta.geral[0].danoGeral],
                                borderColor: '#1f7a73',
                                borderWidth: 1,
                                backgroundColor: '#1f7a7350',
                                borderSkipped: false,
                            }
                        ]
                    };

                    new Chart(ctxy, {
                        type: 'bar',
                        data: data,
                        options: {
                            indexAxis: 'y', // Inverte para barras horizontais
                            responsive: true,
                            maintainAspectRatio: false,
                        
                            scales: {
                                x: {
                                    stacked: true, // Crucial para o efeito de divergência
                                    min: -100000,
                                    max: 100000,
                                    grid: {
                                        color: '#eeeeee33',
                                    },
                                    ticks: {
                                        // Remove o sinal negativo dos números no eixo X
                                        color: '#ffffff',
                                        callback: (value) => Math.abs(value)
                                    }
                                },
                                y: {
                                    stacked: true,
                                    grid: {
                                        display: false // Limpa o fundo atrás das barras
                                    },
                                    ticks: {
                                        color: '#ffffff',
                                        crossAlign: 'left',
                                        font: {
                                            size: 20,
                                            weight: '300',
                                        },
                                    
                                    }
                                }
                            },
                            plugins: {
                                tooltip: {
                                    callbacks: {
                                        // Remove o sinal negativo do balão de informação (hover)
                                        label: (context) => {
                                            const label = context.dataset.label || '';
                                            const value = Math.abs(context.raw);
                                            return `${label}: ${value}`;
                                        }
                                    }
                                },
                                legend: {
                                    display: false,
                                }
                            }
                        }
                    });
                }
            )} else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
    
        }) .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        })
    };

    function graficoKDA(){
        var fkEquipe = sessionStorage.fkEquipe;
        const ctxyz = document.getElementById('grafico1').getContext('2d');

        fetch(`/dashboard/graficoKDA/${fkEquipe}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    
                    const dataArea = {
                        labels: ['Abates', 'Mortes', 'Assistências'],
                        datasets: [
                            {
                                label: 'time',
                                data: [resposta.time[0].killsTime, resposta.time[0].deathsTime, resposta.time[0].assistsTime],
                                borderColor: '#F2FF58',
                                backgroundColor: 'rgba(242, 255, 88, 0.4)', // Amarelo com transparência
                                fill: true,
                                tension: 0.3 // Deixa as linhas levemente curvas
                            },
                            {
                                label: 'geral',
                                data: [resposta.geral[0].killsGeral, resposta.geral[0].deathsGeral, resposta.geral[0].assistsGeral],
                                borderColor: '#066B68',
                                backgroundColor: 'rgba(6, 107, 104, 0.6)', // Verde com transparência
                                fill: true,
                                tension: 0.3
                            }
                        ]
                    };
                
                    new Chart(ctxyz, {
                        type: 'line',
                        data: dataArea,
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false,
                                    labels: { color: '#ffffff' } // Legenda em branco para fundo escuro
                                }
                            },
                            scales: {
                                x: {
                                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                                    ticks: {
                                        color: '#ffffff',
                                        padding: 10,
                                        font: {
                                            size: 20,
                                            weight: '300',
                                        }
                                    }
                                },
                                y: {
                                    beginAtZero: true,
                                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                                    ticks: {
                                        padding: 10,
                                        color: '#ffffff',
                                    }
                                }
                            }
                        }
                    });
                }
            )} else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        }) .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        })
    };
    
