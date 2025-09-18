const formSubmit = document.getElementById("form-submit");
const search = document.getElementById("search");
const submitButton = document.getElementById("submit");
const pokeImg = document.getElementById("poke-img");



formSubmit.addEventListener('submit', async (event) => {
    event.preventDefault();
    const pokemonValue = search.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonValue}`


    try {
    const pokeInitialDescription = document.getElementsByClassName
    const response = await fetch(url);
    if (response.status === 200) {
    const pokeObj = await response.json();
    pokeImg.setAttribute("src", `${pokeObj.sprites.front_default}`);


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

    //Criando a variável da div pai (onde serão inseridos os spans);
    const newPokeBox = document.getElementsByClassName("new-poke-box")[0];
    newPokeBox.append(newSpanBox)[1]





    // lembre que tudo isso é dentro do poke display. arrume!












    }

    





    } catch (error) {
        console.log("Erro:", error)
    }

})


