

  function btn_fale_conosco() {
    document.getElementById("modalFaleConosco").style.display = "flex";
  }

  function fecharModal() {
  document.getElementById("modalFaleConosco").style.display = "none";

  document.getElementById("modalFaleConosco").style.display = "none";
  }

  function enviarFormulario() {
    insertFaleConosco();
    alert("Formulário enviado com sucesso!");
    fecharModal();
  }

  function insertFaleConosco(){
    var nome = document.getElementById("input_nome").value
    var email = document.getElementById("input_email").value
    var telefone = document.getElementById("input_telefone").value
    var equipe = document.getElementById("input_equipe").value
    var mensagem = document.getElementById("input_mensagem").value

    fetch("/insertFaleConosco", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nome,
        emailServer: email,
        telefoneServer: telefone,
        equipeServer: equipe,
        mensagemServer: mensagem
      }),
    })
  };

