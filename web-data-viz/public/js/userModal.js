document.body.innerHTML += `

<div id="modalUser">

    <div id="boxUser">

        <div id="topoUser">

            <div id="avatarUserModal">M</div>

            <div id="infosUser">
                <h3 id="nomeModal"></h3>
                <p id="emailModal"></p>
            </div>

        </div>

        <div class="linhaUser"></div>

        <div id="conteudoUser">

            <div id="notifArea" class="toggleArea">

                <div class="toggleItem">

                    <span>Notificações</span>

                    <label class="switch">
                        <input type="checkbox">
                        <span class="slider"></span>
                    </label>

                </div>

            </div>

            <div id="acoesUser">

                <button id="btnRelatorio" onclick="baixarRelatorio()">
                    GERAR RELATÓRIO
                </button>

                <button id="btnSairUser" onclick="sair()">
                    SAIR
                </button>

            </div>

        </div>

    </div>

</div>
`;

validarCargo();
userModal();

function userModal(){
  document.getElementById("nomeModal").innerHTML = sessionStorage.nome;
  document.getElementById("emailModal").innerHTML = sessionStorage.email;
};


const modalUser = document.getElementById("modalUser");
const containerUser = document.getElementById("container_user");

containerUser.addEventListener("click", () => {
  if (modalUser.style.display == "flex") {
    modalUser.style.display = "none";
  } else {
    modalUser.style.display = "flex";
  }
});

window.addEventListener("click", (event) => {
  if (event.target == modalUser) {
    modalUser.style.display = "none";
  }
});

function sair() {
  sessionStorage.clear();
  window.location = "index.html";
}

// Função assíncrono que aciona a aplicação em python de gerar relatórios via HTTP
async function baixarRelatorio() {
  try {

    // Envia uma solicitação do tipo GET, espera a resposta e guarda em uma variável
    const response = await fetch("/relatorio/gerar", { method: "POST" });

    // Valida se o status da resposta está entre 200 e 299
    if (!response.ok) {
      throw new Error("Erro ao gerar relatório");
    }

    // A resposta vem como um  (com: status, header, body, etc)
    // Recupera do objeto HTTP um arquivo bruto em binário (BLOB = Binary Large Object) que é o excel
    const blob = await response.blob();

    // Navegador não consegue abrir um Blob diretamente, precisa criar uma URL temporária
    // Ex: blob:http://localhost/8392a8sd...
    const url = window.URL.createObjectURL(blob);

    // Cria um elemento html (<a></a>) via JS
    const a = document.createElement("a");

    // Atribui ao elemento html criado a URL do Blob
    // Ex: <a href="blob:http://localhost/8392a8sd...">
    a.href = url;

    // Navegador usa a tag <a> com o link do Blob, faz o download e define o nome do arquivo baixado
    a.download = "Relatorio.xlsx";

    // Navegador só consegue acessar elementos presentes no DOM (Document Object Model)
    // DOM = Representação da página HTML em memória
    // Adiciona a tag <a> dentro do HTML da página
    document.body.appendChild(a);

    // Simula um click automático ("usuário clicou num link de download")
    a.click();

    // Remove o <a> do DOM
    a.remove();

    // Destrói a URL temporária da memória
    window.URL.revokeObjectURL(url);

  } catch (erro) {
    console.error(erro);
    alert("Erro ao baixar relatório");
  }
}

function validarCargo(){
    if(sessionStorage.cargo === 'Jogador'){
      document.getElementById("btnRelatorio").style.display = "none";
      document.getElementById("notifArea").style.display = "none";
    }
};
