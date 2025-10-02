const formSubmit = document.getElementById("form-submit");
const search = document.getElementById("search");
const submitButton = document.getElementById("submit");
const customSelect = document.getElementById("custom-select")

search.addEventListener("input", async (event) => {
  // Allow only letters in the search input
  const regex = /[^A-Za-z-]/g;
  search.value = search.value.replace(regex, "");

  try {
    const pokemonValue = search.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;
    const response = await fetch(url);
    const pokeObjNoLimit = await response.json();
    console.log(pokeObjNoLimit)

    let pokeObjMap = pokeObjNoLimit.results.map( async (item) => {
      let pokeNome = item.name;

      if (pokeNome.startsWith(pokemonValue)) {
      customSelect.innerHTML = ""
      if (pokemonValue === "") return;
      
      
      const urlPokeFilter = `https://pokeapi.co/api/v2/pokemon/${pokeNome}`
      const urlPokeFilterResponse = await fetch(urlPokeFilter)
      const urlPokeFilterJson = await urlPokeFilterResponse.json()

        // Dropbox filter

        // Criando a lista UL
        const options = document.createElement("ul");
        options.setAttribute("class", "options");

        // Criando a imagem da lista UL
        const optionsImg = document.createElement("img");
        optionsImg.setAttribute("src", `${urlPokeFilterJson.sprites.front_default}`);
        optionsImg.setAttribute("class", "options-img");

        // Criando o <p> (texto dentro da lista UL)
        const optionsP = document.createElement("p");
        optionsP.setAttribute("class", "options-description");
        optionsP.innerText = pokeNome;

        
        customSelect.appendChild(options);
        options.appendChild(optionsImg);
        options.appendChild(optionsP);


        options.addEventListener("click", (event) => {
          event.preventDefault();
          customSelect.innerHTML = ""
          search.value = optionsP.textContent
        })
        
      }

    });
  } catch (error) {
    console.log("Error:", error);
  }
});

formSubmit.addEventListener("submit", async (event) => {
  event.preventDefault();

  const pokemonValue = search.value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonValue}`;
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const pokeObj = await response.json();

      const pokeDescriptionBox = document.getElementsByClassName(
        "poke-description-box"
      )[0];

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
        },
      ];

      if (pokemonValue !== "") {
        // Hide welcome message if a Pokémon was searched
        pokeDescriptionBox.style.display = "none";
      } else {
        alert("Type something");
      }

      const sound = document.getElementById("sound");

      const pokeDisplay = document.getElementsByClassName("poke-display")[0];

      // Container for the new Pokémon card
      const newPokeBox = document.createElement("div");
      newPokeBox.setAttribute("class", "new-poke-box");

      // Pokémon sprite image
      const pokeImg = document.createElement("img");
      pokeImg.setAttribute("id", "poke-img");
      pokeImg.setAttribute("src", `${pokeObj.sprites.front_default}`);

      // Container for Pokémon info spans
      const newSpanBox = document.createElement("div");
      newSpanBox.setAttribute("class", "new-span-box");

      // Pokémon type
      const spanType = document.createElement("span");
      spanType.setAttribute("id", "type");
      spanType.setAttribute("class", "new-span");
      spanType.innerText = `Type: ${pokeObj.types[0].type.name}`;

      // Pokémon weight
      const spanWeight = document.createElement("span");
      spanWeight.setAttribute("id", "weight");
      spanWeight.setAttribute("class", "new-span");
      spanWeight.innerText = `Weight: ${pokeObj.weight}`;

      // Pokémon generation
      const spanGeneration = document.createElement("span");
      spanGeneration.setAttribute("id", "generation");
      spanGeneration.setAttribute("class", "new-span");

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

      // Append elements
      pokeDisplay.appendChild(newPokeBox);
      newPokeBox.appendChild(pokeImg);
      newPokeBox.appendChild(newSpanBox);
      newSpanBox.appendChild(spanType);
      newSpanBox.appendChild(spanWeight);
      newSpanBox.appendChild(spanGeneration);
      newSpanBox.style.paddingBottom = "30px";

      sound.play();

      // Set background colors for spans by type
      const colorObj = colorType[0];
      const type = pokeObj.types[0].type.name;
      const spans = document.querySelectorAll(".new-span");
      spans.forEach((span) => {
        span.style.backgroundColor = colorObj[type];
        span.style.color = "white";
      });

      // Keep only the latest Pokémon card on screen
      while (pokeDisplay.children.length > 2) {
        pokeDisplay.children[1].remove();
      }
    } else {
      // Pokémon not found
      alert("Pokémon not found. Please try again.");
      const pokeDescriptionBox = document.getElementsByClassName(
        "poke-description-box"
      )[0];
      pokeDescriptionBox.style.display = "flex";
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
