const formSubmit = document.getElementById("form-submit");
const search = document.getElementById("search");
const submitButton = document.getElementById("submit");



formSubmit.addEventListener('submit', async (event) => {
    event.preventDefault();
    const pokemonValue = search.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonValue}`



    try {
    
    const response = await fetch(url);
    if (response.status === 200) {
    const pokeObj = await response.json();
    //Capturando a div das boas vindas(poke-description-box);
    const pokeDescriptionBox = document.getElementsByClassName("poke-description-box")[0];

    // Pokémon color type
    let colorType = [
        {
        bug: "#1c4b27",
        dark: "#040706",
        dragon: "#448b95",
        electric: "#e3e32b",
        fairy: "#971944",
        fighting: "#994023",
        fire: "#ab1f23",
        flying: "#4a677d",
        ghost: "#33336b",
        grass: "#147b3d",
        ground: "#a9702c",
        ice: "#86d2f5",
        normal: "#75515b",
        poison: "#5e2d88",
        psychic: "#a11660ff",
        rock: "#48180b",
        steel: "#5f756d",
        water: "#1552e2",
        }
    ]




    if (pokemonValue !== "") {
    pokeDescriptionBox.style.display = "none" // Se a api resultar em 200 e o usuário digitar algo, desabilidar as boas vindas.

    } else {
        alert("Type something");
    }

    const sound = document.getElementById("sound");


    //Capturando a div pai(poke-display);
    const pokeDisplay = document.getElementsByClassName("poke-display")[0];



    //Criando a variável da div pai (onde serão inseridos os spans);
    const newPokeBox = document.createElement("div");
    newPokeBox.setAttribute("class", "new-poke-box");

    //Criando o img do novo pokemon [img id="poke-img"]
    const pokeImg = document.createElement("img");
    pokeImg.setAttribute("id", "poke-img");
    pokeImg.setAttribute("src", `${pokeObj.sprites.front_default}`); //Buscando o pokémon na API

    //Criando a box dos elementos do span [div class new-span-box]
    const newSpanBox = document.createElement("div");
    newSpanBox.setAttribute("class", "new-span-box");

    //Criando os spans [span id="type", class="new-span"]
    const spanType = document.createElement("span");
    spanType.setAttribute("id", "type");
    spanType.setAttribute("class", "new-span");
    spanType.innerText = `Type: ${pokeObj.types[0].type.name}`


    //Criando os spans [span id="weight", class="new-span"]
    const spanWeight = document.createElement("span");
    spanWeight.setAttribute("id", "weight");
    spanWeight.setAttribute("class", "new-span");
    spanWeight.innerText = `Weight: ${pokeObj.weight}`;

    //Criando os spans [span id="generation", class="new-span"]
    const spanGeneration = document.createElement("span");
    spanGeneration.setAttribute("id", "generation");
    spanGeneration.setAttribute("class", "new-span");
    spanGeneration.innerText = `Generation: ${pokeObj.past_abilities[0].generation.name}`

    pokeDisplay.insertBefore(newPokeBox, null); // Adicionando a div (new-poke-box) dentro do elemento pai (poke-display).
    newPokeBox.appendChild(pokeImg);
    newPokeBox.appendChild(newSpanBox);
    newSpanBox.appendChild(spanType);
    newSpanBox.appendChild(spanWeight);
    newSpanBox.appendChild(spanGeneration);
    newSpanBox.style.paddingBottom = "30px"
    sound.play() // Adiciona o som apos o click no botão



    const colorObj = colorType[0];
    const type = pokeObj.types[0].type.name;
    const spans = document.querySelectorAll(".new-span")
    spans.forEach((span) => {
        span.style.backgroundColor = colorObj[type];
    })


    // for (let i = 0; i < pokeDisplay.children.length; i++) {
    //     pokeDisplay.children.length > 2 ? pokeDisplay.children[1].remove() : console.log("erro")
    // }

    // Forma melhor de atualizar os pokemons em tela:
    while (pokeDisplay.children.length > 2) {
    pokeDisplay.children[1].remove();
    }

    }


    } catch (error) {
        console.log("Erro:", error)
    }

})


