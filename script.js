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

    if (pokemonValue !== "") {
    pokeDescriptionBox.style.display = "none" // Se a api resultar em 200 e o usuário digitar algo, desabilidar as boas vindas.
    }


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

    //Criando os spans [span id="region", class="new-span"]
    const spanRegion = document.createElement("span");
    spanRegion.setAttribute("id", "region");
    spanRegion.setAttribute("class", "new-span");

    //Criando os spans [span id="generation", class="new-span"]
    const spanGeneration = document.createElement("span");
    spanGeneration.setAttribute("id", "generation");
    spanGeneration.setAttribute("class", "new-span");

    pokeDisplay.insertBefore(newPokeBox, null); // Adicionando a div (new-poke-box) dentro do elemento pai (poke-display).
    newPokeBox.appendChild(pokeImg);
    newPokeBox.appendChild(newSpanBox);
    newSpanBox.appendChild(spanType);
    newSpanBox.appendChild(spanRegion);
    newSpanBox.appendChild(spanGeneration);


    }

    





    } catch (error) {
        console.log("Erro:", error)
    }

})


