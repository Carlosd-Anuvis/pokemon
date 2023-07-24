const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner");     // spiner de html  // 
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

let limit = 150;
let offset = 1;

previous.addEventListener("click", () => {   
       //restarle // 
  if (offset != 1) {                 
    offset -= 150;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
  }
});

next.addEventListener("click", () => {  
    // sumarle // 
  offset += 150;
  removeChildNodes(pokemonContainer);
  fetchPokemons(offset, limit);
});

function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)   // funcion que trae elementos 
    .then((res) => res.json())
    .then((data) => {
      createPokemon(data);                           // se pasa la funcion //

      spinner.style.display = "none";            // esconder funcion del spiner //      
    });
}

function fetchPokemons(offset, limit) {
  spinner.style.display = "block";
  for (let i = offset; i <= offset + limit; i++) {
    fetchPokemon(i);
  }
}

function createPokemon(pokemon) {
  const flipCard = document.createElement("div");     // flipcard   contenedor principal // 
  flipCard.classList.add("flip-card");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  flipCard.appendChild(cardContainer);    

  const card = document.createElement("div");             
  card.classList.add("pokemon-block");        

  const spriteContainer = document.createElement("div");   // para contener las imagenes de las targetas //
  spriteContainer.classList.add("img-container");          // contenedor de la imagen //

  const sprite = document.createElement("img");
  sprite.src = pokemon.sprites.front_default;

  spriteContainer.appendChild(sprite);

  const number = document.createElement("p");            // numero de pokemon   
  number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;    // a llade 0 al principio //

  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = pokemon.name;




  card.appendChild(spriteContainer);           // la imagen // 
  card.appendChild(number);
  card.appendChild(name);

  const cardBack = document.createElement("div");   // parte atras de carta // 
  cardBack.classList.add("pokemon-block-back");
  cardBack.textContent=" PODER POKEMON"

  cardBack.appendChild(progressBars(pokemon.stats));

  cardContainer.appendChild(card);
  cardContainer.appendChild(cardBack);
  pokemonContainer.appendChild(flipCard);
}

function progressBars(stats) {
  const statsContainer = document.createElement("div");
  statsContainer.classList.add("stats-container");

  for (let i = 0; i < 3; i++) {
    const stat = stats[i];

    const statPercent = stat.base_stat / 2 + "%";         // wil del containe porcentajes de poder  // 
    const statContainer = document.createElement("stat-container");          // 
    statContainer.classList.add("stat-container");                      

    const statName = document.createElement("p");
    statName.textContent = stat.stat.name;

    const progress = document.createElement("div");
    progress.classList.add("progress");

    const progressBar = document.createElement("div");                   
    progressBar.classList.add("progress-bar");            // llamado de bootstrap    propiedad  progres  barras de card // 
    progressBar.setAttribute("aria-valuenow", stat.base_stat);
    progressBar.setAttribute("aria-valuemin", 0);                  // llamado de poder graficas por bootstrap // 
    progressBar.setAttribute("aria-valuemax", 500);
    progressBar.style.width = statPercent;

    progressBar.textContent = stat.base_stat;

    progress.appendChild(progressBar);
    statContainer.appendChild(statName);
    statContainer.appendChild(progress);
    

    statsContainer.appendChild(statContainer);
  }

  return statsContainer;     // funcion para remover todos los elementos //  dentro de otro elemento //
}

function removeChildNodes(parent) {           // contenedor bucle // 
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

fetchPokemons(offset, limit);