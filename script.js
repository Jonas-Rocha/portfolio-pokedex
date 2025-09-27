const formSubmit = document.getElementById("form-submit");
const search = document.getElementById("search");
const submitButton = document.getElementById("submit");
const regex = /^[A-Za-z]/g


search.addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/[^A-Za-z]/g, "");
});

formSubmit.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const pokemonValue = search.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonValue}`;



    try {
        const response = await fetch(url);
        if (response.status === 200) {
            const pokeObj = await response.json();
            
            // Get the welcome message box (poke-description-box)
            const pokeDescriptionBox = document.getElementsByClassName("poke-description-box")[0];

            // Pokémon type colors
            const colorType = [
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
            ];

            if (pokemonValue !== "") {
                // If the API returns a 200 status and the user has typed something, hide the welcome message.
                pokeDescriptionBox.style.display = "none";
            } else {
                alert("Type something");
            }

            const sound = document.getElementById("sound");

            // Get the parent div (poke-display)
            const pokeDisplay = document.getElementsByClassName("poke-display")[0];

            // Create the main container div for the new Pokémon data
            const newPokeBox = document.createElement("div");
            newPokeBox.setAttribute("class", "new-poke-box");

            // Create the image element for the new Pokémon [img id="poke-img"]
            const pokeImg = document.createElement("img");
            pokeImg.setAttribute("id", "poke-img");
            pokeImg.setAttribute("src", `${pokeObj.sprites.front_default}`); // Fetch the Pokémon sprite from the API

            // Create the container for the span elements [div class="new-span-box"]
            const newSpanBox = document.createElement("div");
            newSpanBox.setAttribute("class", "new-span-box");

            // Create the span for the type [span id="type", class="new-span"]
            const spanType = document.createElement("span");
            spanType.setAttribute("id", "type");
            spanType.setAttribute("class", "new-span");
            spanType.innerText = `Type: ${pokeObj.types[0].type.name}`;

            // Create the span for the weight [span id="weight", class="new-span"]
            const spanWeight = document.createElement("span");
            spanWeight.setAttribute("id", "weight");
            spanWeight.setAttribute("class", "new-span");
            spanWeight.innerText = `Weight: ${pokeObj.weight}`;

            // Create the span for the generation [span id="generation", class="new-span"]
            const spanGeneration = document.createElement("span");
            spanGeneration.setAttribute("id", "generation");
            spanGeneration.setAttribute("class", "new-span");
            
            // The 'past_abilities' array might be empty. It is better to get generation from the species endpoint for reliability.
            // However, to keep it simple and within the scope of the original code, we will add a check.
            // A more robust solution would be another API call: `https://pokeapi.co/api/v2/pokemon-species/${pokemonValue}`
            let generationName = "N/A";
            if (pokeObj.species && pokeObj.species.url) {
                try {
                    const speciesResponse = await fetch(pokeObj.species.url);
                    const speciesObj = await speciesResponse.json();
                    generationName = speciesObj.generation.name;
                } catch (speciesError) {
                    console.log("Could not fetch species data:", speciesError);
                }
            }
            spanGeneration.innerText = `Generation: ${generationName}`;


            // Append the new elements to the DOM
            pokeDisplay.appendChild(newPokeBox);
            newPokeBox.appendChild(pokeImg);
            newPokeBox.appendChild(newSpanBox);
            newSpanBox.appendChild(spanType);
            newSpanBox.appendChild(spanWeight);
            newSpanBox.appendChild(spanGeneration);
            newSpanBox.style.paddingBottom = "30px";
            
            sound.play(); // Play the sound after the button click

            // Set the background color of the spans based on the Pokémon's type
            const colorObj = colorType[0];
            const type = pokeObj.types[0].type.name;
            const spans = document.querySelectorAll(".new-span");
            spans.forEach((span) => {
                span.style.backgroundColor = colorObj[type];
                span.style.color = "white"; // Change text color for better contrast
            });

            // A better way to update the Pokémon on screen:
            // This ensures only one Pokémon is displayed at a time, plus the initial welcome message which is hidden.
            while (pokeDisplay.children.length > 2) {
                pokeDisplay.children[1].remove();
            }
        } else {
            // Handle cases where the Pokémon is not found
             alert("Pokémon not found. Please try again.");
             const pokeDescriptionBox = document.getElementsByClassName("poke-description-box")[0];
             pokeDescriptionBox.style.display = "flex"; // Show the welcome message again
             // Remove any previously displayed Pokémon
             const pokeDisplay = document.getElementsByClassName("poke-display")[0];
             while (pokeDisplay.children.length > 1) {
                pokeDisplay.children[1].remove();
            }
        }
    } catch (error) {
        console.log("Error:", error);
        alert("An error occurred. Please check the console for details.");
    }
});