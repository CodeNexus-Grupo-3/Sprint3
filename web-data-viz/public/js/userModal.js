document.body.innerHTML += `

<div id="modalUser">

    <div id="boxUser">

        <div id="topoUser">

            <div id="avatarUserModal">M</div>

            <div id="infosUser">
                <h3>Marina Okamoto</h3>
                <p>marina@codenexus.com</p>
            </div>

        </div>

        <div class="linhaUser"></div>

        <div id="conteudoUser">

            <div class="toggleArea">

                <div class="toggleItem">

                    <span>Notificações</span>

                    <label class="switch">
                        <input type="checkbox">
                        <span class="slider"></span>
                    </label>

                </div>

            </div>

            <div id="acoesUser">

                <button id="btnRelatorio">
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
