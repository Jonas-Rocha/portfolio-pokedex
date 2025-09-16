const formSubmit = document.getElementById("form-submit");
const search = document.getElementById("search");
const submitButton = document.getElementById("submit");



formSubmit.addEventListener('submit', async (event) => {
    event.preventDefault();

    const pokemon = search.value.toLowerCase();
    const url = fetch("https://pokeapi.co/api/v2/pokemon/")

    try {
        const data = await response.json();
        console.log("Dados do Pokémon:", data);
        
    } catch (error) {
        console.log("Erro:", error)
    }

})


