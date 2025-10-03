const formSubmit = document.getElementById("form-submit");
const search = document.getElementById("search");
const submitButton = document.getElementById("submit");
const customSelect = document.getElementById("custom-select");

search.addEventListener("input", async (event) => {
  search.addEventListener("focusout", () => {
    customSelect.innerHTML = "";
  });

  // allow only letters and dashes in the input
  const regex = /[^A-Za-z-]/g;
  search.value = search.value.replace(regex, "");

  const pokemonValue = search.value.toLowerCase();

  // clear dropdown every time input changes
  customSelect.innerHTML = "";

  // if input is empty, just stop here
  if (pokemonValue === "") {
    return;
  }

  // keep current value to avoid async bugs
  const currentValue = pokemonValue;

  try {
    // get all pokemons from API
    const url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;
    const response = await fetch(url);
    const pokeObjNoLimit = await response.json();
    const results = pokeObjNoLimit.results;

    // check again: if input changed while waiting, cancel
    if (search.value.toLowerCase() !== currentValue) {
      return;
    }

    // filter pokemons that start with typed letters
    const filtrados = results.filter((result) =>
      result.name.startsWith(pokemonValue)
    );

    if (filtrados.length === 0) {
      // show "not found" message
      const options = document.createElement("ul");
      options.setAttribute("class", "options");

      const optionsP = document.createElement("p");
      optionsP.setAttribute("class", "options-description");
      optionsP.innerText = "Pokemon not found!";

      options.appendChild(optionsP);
      customSelect.appendChild(options);
      return;
    }

    // create dropdown options for each filtered pokemon
    for (let poke of filtrados) {
      const urlPokeFilter = `https://pokeapi.co/api/v2/pokemon/${poke.name}`;
      const urlPokeFilterResponse = await fetch(urlPokeFilter);
      const urlPokeFilterJson = await urlPokeFilterResponse.json();

      // again, ignore if input changed
      if (search.value.toLowerCase() !== currentValue) {
        return;
      }

      // build option element
      const options = document.createElement("li");
      options.setAttribute("class", "options");

      const optionsImg = document.createElement("img");
      optionsImg.setAttribute("src", urlPokeFilterJson.sprites.front_default);
      optionsImg.setAttribute("class", "options-img");

      const optionsP = document.createElement("p");
      optionsP.setAttribute("class", "options-description");
      optionsP.innerText = poke.name;

      options.appendChild(optionsImg);
      options.appendChild(optionsP);
      customSelect.appendChild(options);

      options.addEventListener("mousedown", (event) => {
        event.preventDefault();
        search.value = optionsP.textContent;
         customSelect.innerHTML = "";
      });

    }
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

      // colors for each pokemon type
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
        // hide welcome message when a pokemon is found
        pokeDescriptionBox.style.display = "none";
      } else {
        alert("Type something");
      }

      const sound = document.getElementById("sound");
      const pokeDisplay = document.getElementsByClassName("poke-display")[0];

      // new pokemon card container
      const newPokeBox = document.createElement("div");
      newPokeBox.setAttribute("class", "new-poke-box");

      // pokemon sprite image
      const pokeImg = document.createElement("img");
      pokeImg.setAttribute("id", "poke-img");
      pokeImg.setAttribute("src", `${pokeObj.sprites.front_default}`);

      // info box
      const newSpanBox = document.createElement("div");
      newSpanBox.setAttribute("class", "new-span-box");

      // type
      const spanType = document.createElement("span");
      spanType.setAttribute("id", "type");
      spanType.setAttribute("class", "new-span");
      spanType.innerText = `Type: ${pokeObj.types[0].type.name}`;

      // weight
      const spanWeight = document.createElement("span");
      spanWeight.setAttribute("id", "weight");
      spanWeight.setAttribute("class", "new-span");
      spanWeight.innerText = `Weight: ${pokeObj.weight}`;

      // generation (needs another fetch)
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

      // put everything on screen
      pokeDisplay.appendChild(newPokeBox);
      newPokeBox.appendChild(pokeImg);
      newPokeBox.appendChild(newSpanBox);
      newSpanBox.appendChild(spanType);
      newSpanBox.appendChild(spanWeight);
      newSpanBox.appendChild(spanGeneration);
      newSpanBox.style.paddingBottom = "30px";

      // play sound when showing pokemon
      sound.play();

      // set background color depending on type
      const colorObj = colorType[0];
      const type = pokeObj.types[0].type.name;
      const spans = document.querySelectorAll(".new-span");
      spans.forEach((span) => {
        span.style.backgroundColor = colorObj[type];
        span.style.color = "white";
      });

      // keep only the latest card (remove old ones)
      while (pokeDisplay.children.length > 2) {
        pokeDisplay.children[1].remove();
      }
    } else {
      // if pokemon doesn't exist
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
