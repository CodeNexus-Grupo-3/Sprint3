
function iconeLetra(){
    console.log("carregou function iconeLetra()")

    var nome = sessionStorage.nome;

    document.getElementById("container_user")
    .innerHTML = nome.charAt(0).toUpperCase();
};

function sair() {
    sessionStorage.clear();
    window.location = "index.html";
}

function postarMensagem(){

     console.log("fkUsuario:", sessionStorage.fkUsuario);

    var mensagem = document.getElementById("mensagem").value;

    if(mensagem.trim() == ""){
        alert("Digite uma mensagem!");
        return;
    }

    fetch("/forum/postar", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            titulo:"Postagem",
            conteudo:mensagem,
            fkUsuario: sessionStorage.fkUsuario
        })
    })
    .then(function(resposta){

        if(resposta.ok){

            listarPosts();

            document.getElementById("mensagem").value = "";

        }

    })
    .catch(function(erro){
        console.log(erro);
    });

}

function listarPosts(){

    var fkEquipe = sessionStorage.fkEquipe;

    fetch(`/forum/listar/${fkEquipe}`)
    .then(function(resposta){
        return resposta.json();
    })
    .then(function(posts){

        document.getElementById("lista_posts").innerHTML = "";

        for(var i = 0; i < posts.length; i++){

            var post = posts[i];

            document.getElementById("lista_posts").innerHTML += `

            <div class="post">

                <span class="material-symbols-outlined">
                account_circle
                </span>

                <div class="conteudo_post">

                    <h3>${post.nickname}</h3>

                    <p>${post.conteudo}</p>

                    <div class="acoes_postagem">

                        <div style="display:flex; align-items:center; gap:5px;">

                            <span class="material-symbols-outlined botao_like"
                            onclick="curtirPost(${post.idPostagensForum}, this)">
                            favorite
                            </span>

                            <span id="likes-${post.idPostagensForum}">
                            ${post.likes}
                            </span>

                        </div>

                        ${
                            post.fkUsuario == sessionStorage.fkUsuario
                            ?
                            `
                            <div style="display:flex; gap:10px;">

                                <span 
                                class="material-symbols-outlined"
                                style="cursor:pointer; font-size:22px;"
                                onclick="editarPost(
                                    ${post.idPostagensForum},
                                    \`${post.conteudo}\`
                                )">
                                edit
                                </span>

                                <span 
                                class="material-symbols-outlined"
                                style="cursor:pointer; font-size:22px;"
                                onclick="deletarPost(${post.idPostagensForum})">
                                delete
                                </span>

                            </div>
                            `
                            :
                            ""
                        }

                    </div>

                </div>

            </div>

            `;
        }

    });
}

function curtirPost(id, elemento){

    if(elemento.classList.contains("ativo")){
        return;
    }

    fetch(`/forum/curtir/${id}`, {
        method:"PUT"
    })
    .then(function(){

        var contador = document.getElementById("likes-" + id);

        var likes = parseInt(contador.innerText);

        if(elemento.classList.contains("ativo")){
            return;
        }

        likes++;

        contador.innerText = likes;

        elemento.classList.add("ativo");

    });

};

function deletarPost(idPost){

    var confirmar = confirm(
        "Deseja deletar esta postagem?"
    );

    if(confirmar == false){
        return;
    }

    fetch(`/forum/deletar/${idPost}`, {
        method:"DELETE"
    })
    .then(function(resposta){

        if(resposta.ok){
            listarPosts();
        }

    })
    .catch(function(erro){
        console.log(erro);
    });

}

function editarPost(idPost, conteudoAtual){

    var novoConteudo = prompt(
        "Editar postagem:",
        conteudoAtual
    );

    if(novoConteudo == null || novoConteudo.trim() == ""){
        return;
    }

    fetch(`/forum/editar/${idPost}`, {
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            conteudo: novoConteudo
        })
    })
    .then(function(resposta){

        if(resposta.ok){
            listarPosts();
        }

    })
    .catch(function(erro){
        console.log(erro);
    });

}

function validarCargo(){

    if(sessionStorage.cargo === 'Jogador'){

      document.getElementById("area_postagem")
      .style.display = "none";

    };

}

document.addEventListener("DOMContentLoaded", function(){

    listarPosts();
    validarCargo();
    iconeLetra();
    userModal();

});
