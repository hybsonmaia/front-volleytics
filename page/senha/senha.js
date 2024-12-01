function resetarSenha() {
    const email = document.getElementById("email");

    email.classList.remove("erro");

    if (!email.value) {
        email.classList.add("erro");
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    fetch("http://localhost:3000/password-reset-request", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.value }),
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
            console.error("Erro:", error);
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
    window.history.back();
}
