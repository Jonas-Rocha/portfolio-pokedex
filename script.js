const formSubmit = document.getElementById("form-submit");
const search = document.getElementById("search");
const submitButton = document.getElementById("submit");



formSubmit.addEventListener('submit', async (event) => {
    event.preventDefault();
    const pokemon = search.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`


    try {
    const response = await fetch(url);
    if (response.status === 200) {
    const obj = await response.json();
    console.log(obj);
    }


        
        
        
    } catch (error) {
        console.log("Erro:", error)
    }

})


