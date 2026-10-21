
const formulario = document.querySelector("#formulario");
const campoPokemon = document.querySelector("#pokemon");
const mensagem = document.querySelector("#mensagem");
const resultado = document.querySelector("#resultado");

const imagem = document.querySelector("#imagem");
const nome = document.querySelector("#nome");
const numero = document.querySelector("#numero");
const tipo = document.querySelector("#tipo");
const altura = document.querySelector("#altura");
const peso = document.querySelector("#peso");

async function buscarPokemon(evento) {
    evento.preventDefault();

    const pesquisa = campoPokemon.value.trim().toLowerCase();

    if (!pesquisa) {
        mensagem.textContent = "Digite o nome ou número de um Pokémon.";
        return;
    }

    mensagem.textContent = "Buscando Pokémon...";
    resultado.hidden = true;

    try {
        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pesquisa}`
        );

        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado.");
        }

        const dados = await resposta.json();

        imagem.src = dados.sprites.front_default;
        imagem.alt = `Imagem de ${dados.name}`;

        nome.textContent =
            dados.name.charAt(0).toUpperCase() + dados.name.slice(1);

        numero.textContent = `Número: ${dados.id}`;


        const nomesTipos = {
            normal: "Normal",
            fire: "Fogo",
            water: "Água",
            electric: "Elétrico",
            grass: "Planta",
            ice: "Gelo",
            fighting: "Lutador",
            poison: "Veneno",
            ground: "Terra",
            flying: "Voador",
            psychic: "Psíquico",
            bug: "Inseto",
            rock: "Pedra",
            ghost: "Fantasma",
            dragon: "Dragão",
            dark: "Sombrio",
            steel: "Aço",
            fairy: "Fada"
        };

        tipo.replaceChildren();

        dados.types.forEach(item => {
            const nomeOriginal = item.type.name;
            const etiqueta = document.createElement("span");

            etiqueta.classList.add("tipo-pokemon", `tipo-${nomeOriginal}`);
            etiqueta.textContent = nomesTipos[nomeOriginal] || nomeOriginal;

            tipo.appendChild(etiqueta);
        });

        altura.textContent = `Altura: ${dados.height / 10} m`;
        peso.textContent = `Peso: ${dados.weight / 10} kg`;

        resultado.hidden = false;
        mensagem.textContent = "";

    } catch (erro) {
        mensagem.textContent = erro.message;
    }
}

formulario.addEventListener("submit", buscarPokemon);
