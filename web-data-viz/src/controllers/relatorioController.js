// Node importa a biblioteca Axios usada para fazer requisições HTTP
// Express se torna cliente HTTP do FastAPI
// Frontend usa "fetch", Backend usa "axios"
const axios = require("axios");

// Cria uma função assíncrona, comunicação entre containers demora
// req = Request: Representa a requisição recebida do Route que vem do Navegador
// res = Response: Representa a resposta que vai ser repassado para o Route enviar ao frontend
async function gerarRelatorio(req, res) {
  try {
    // Node começa uma requisição HTTP
    const response = await axios({
      // Define o método da requisisção (POST)
      method: "POST",
      // "Endereço" do container Python, para que o Node consiga enviar a requisição
      url: "http://python:8000/gerar-relatorio",
      // Define que a resposta do FastAPI deve ser em stream (fluxo contínuo de dados)
      // Ideal para tratar com arquivos como o Excel binário gerado pela simbiose
      responseType: "stream",
    });

    // seatHeader() = Configura o header da resposta HTTP

    // Informa o navegador que o conteúdo da resposta deve ser baixado
    res.setHeader(
        "Content-Disposition", // Nome da informação
        // attachment = força o download
        // filename = nome do arquivo
        "attachment; filename=Relatorio.xlsx"
    );

    // Informa o tipo de arquivo que a resposta vai enviar
    res.setHeader(
        "Content-Type", // Nome da informação
        // Tipo do arquivo = Excel (.xlsx)
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    // Os dados vindos do stream da resposta do FastAPI 
    // são enviados diretamente como resposta ao Express
    // Assim o node nunca salva o arquivo, ele só retransmite do Python ao Express
    response.data.pipe(res);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao gerar relatório",
    });
  }
}

// Exporta a função, permitindo que o Express use o controller
module.exports = {
  gerarRelatorio,
};