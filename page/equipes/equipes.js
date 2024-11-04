document.addEventListener("DOMContentLoaded", () => {
    const teamsList = document.getElementById("teams-list");
    const teams = JSON.parse(localStorage.getItem("equipesGeradas"));
    let tooltip;  // Declara o tooltip globalmente

    // Função para gerar estrelas com base na média
    const generateStars = (media) => {
        let stars = '';
        for (let i = 0; i < Math.floor(media); i++) {
            stars += '<span class="star">★</span>';
        }
        for (let i = Math.floor(media); i < 3; i++) {
            stars += '<span class="star">☆</span>';
        }
        return stars;
    };

    // Função para criar tooltip
    const createTooltip = (text) => {
        const tooltip = document.createElement("div");
        tooltip.classList.add("tooltip");
        tooltip.innerText = text;
        document.body.appendChild(tooltip);
        return tooltip;
    };

    // Renderiza as equipes com as estrelas e o efeito de zoom no nome
    teams.forEach((time, index) => {
        const teamDiv = document.createElement("div");
        teamDiv.classList.add("team");
        teamDiv.innerHTML = `<h3>Time ${index + 1}</h3><ul>${
            time.map(atleta => `
                <li>
                    <span class="athlete-name" data-info="
                        Posição: ${atleta.posicao};
                        Passe: ${atleta.passe};
                        Saque: ${atleta.saque};
                        Toque: ${atleta.toque};
                        Ataque: ${atleta.ataque};
                    ">${atleta.nome} ${generateStars(atleta.media)}</span>
                </li>
            `).join("")
        }</ul>`;
        teamsList.appendChild(teamDiv);
    });

    // Adiciona eventos para mostrar e ocultar o tooltip
    document.querySelectorAll(".athlete-name").forEach(atletaElement => {
        atletaElement.addEventListener("mouseover", (event) => {
            const info = atletaElement.getAttribute("data-info");
            tooltip = createTooltip(info);
            tooltip.style.left = `${event.pageX + 5}px`;
            tooltip.style.top = `${event.pageY + 5}px`;
        });

        atletaElement.addEventListener("mousemove", (event) => {
            if (tooltip) {
                tooltip.style.left = `${event.pageX + 5}px`;
                tooltip.style.top = `${event.pageY + 5}px`;
            }
        });

        atletaElement.addEventListener("mouseout", () => {
            if (tooltip) {
                tooltip.remove();
                tooltip = null;
            }
        });
    });

    // Evento para ocultar o tooltip ao clicar fora em dispositivos móveis
    document.addEventListener("touchstart", (event) => {
        if (tooltip && !event.target.closest(".athlete-name")) {
            tooltip.remove();
            tooltip = null;
        }
    });
});
