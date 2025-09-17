const formSubmit = document.getElementById("form-submit");
const search = document.getElementById("search");
const submitButton = document.getElementById("submit");
const pokeImg = document.getElementById("poke-img");



formSubmit.addEventListener('submit', async (event) => {
    event.preventDefault();
    const pokemon = search.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    try {
    const response = await fetch(url);
    if (response.status === 200) {
    const pokeObj = await response.json();
    pokeImg.setAttribute("src", `${pokeObj.sprites.front_default}`);
    }

    





    } catch (error) {
        console.log("Erro:", error)
    }

})


