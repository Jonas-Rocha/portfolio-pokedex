let pokemons = fetch("https://pokeapi.co/api/v2/pokemon/ditto").then((response) => {
    return response.json()
}).then((data) => {
    console.log(data.abilities)
})