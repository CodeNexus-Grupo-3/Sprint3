 function entrar() {
        //aguardar();
        
        var emailVar = email_input.value;
        var senhaVar = senha_input.value;
        
        if (emailVar == "" || senhaVar == "") {
            cardErro.style.display = "block"
            mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
            //finalizarAguardar();
            return false;
        }
        else {
           // setInterval(sumirMensagem, 5000)
        }
        
        console.log("FORM LOGIN: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);
        
        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!")

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));
                    sessionStorage.nome = json.nome;
                    sessionStorage.fkUsuario = json.idUsuario;
                    sessionStorage.email = json.email;
                    sessionStorage.cargo = json.cargo;
                    sessionStorage.fkEquipe = json.fkEquipe;
                    div_mensagem_direcionamento.innerHTML = '<p style="color:#E0C066"> Redirecionando em 1 segundo</p>'
                    setTimeout(function () {
                        div_mensagem_direcionamento.innerHTML = ""
                        window.location = "/painel.html";
                    }, 1000); // apenas para exibir o loading

                });

            } else {

                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then(texto => {
                    console.error(texto);
                    //finalizarAguardar(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
    }

    
