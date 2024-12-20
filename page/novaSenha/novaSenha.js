// function definirNovaSenha() {
//     const novaSenha = document.getElementById("novaSenha");
//     const confirmarSenha = document.getElementById("confirmarSenha");

//     // Remove a classe de erro antes de validar novamente
//     novaSenha.classList.remove("erro");
//     confirmarSenha.classList.remove("erro");

//     // Verifica se os campos foram preenchidos e se as senhas coincidem
//     if (!novaSenha.value || !confirmarSenha.value) {
//         if (!novaSenha.value) novaSenha.classList.add("erro");
//         if (!confirmarSenha.value) confirmarSenha.classList.add("erro");
//         alert("Por favor, preencha todos os campos.");
//         return;
//     }

//     if (novaSenha.value !== confirmarSenha.value) {
//         novaSenha.classList.add("erro");
//         confirmarSenha.classList.add("erro");
//         alert("As senhas não coincidem. Tente novamente.");
//         return;
//     }

//     // Enviar a nova senha para o servidor (exemplo)
//     // fetch("https://backend-volleytics-development.up.railway.app/definir-nova-senha", {
//         fetch("http://localhost:3000/definir-nova-senha", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ senha: novaSenha.value }),
//     })
//     .then((response) => response.json())
//     .then((data) => {
//         if (data && data.sucesso) {
//             exibirPopup();
//             limparFormulario();
//         } else {
//             alert("Erro ao redefinir a senha. Tente novamente.");
//         }
//     })
//     .catch((error) => {
//         console.error("Erro:", error);
//         alert("Erro ao conectar com o servidor.");
//     });
// }

function definirNovaSenha() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const novaSenha = document.getElementById("novaSenha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (!novaSenha || !confirmarSenha || novaSenha !== confirmarSenha) {
        alert("As senhas não coincidem ou estão vazias.");
        return;
    }

    fetch("http://localhost:3000/password-reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, novaSenha }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                alert(data.error);
            } else {
                exibirPopup();
            }
        })
        .catch((error) => {
            console.error("Erro ao conectar com o servidor:", error);
            alert("Erro ao conectar com o servidor.");
        });
}


function exibirPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "flex";
}

function fecharPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

function limparFormulario() {
    document.getElementById("novaSenha").value = "";
    document.getElementById("confirmarSenha").value = "";
}
