const pokeList = document.querySelector("#listaPokemon")
const headerButtons = document.querySelectorAll(".btn-header")

let URL = "https://pokeapi.co/api/v2/pokemon/"

for(let i = 1; i <= 151; i++) {
    fetch(URL + i)
    .then((response) => response.json())
    .then(data => showPokemon(data))
}

function showPokemon(poke) {
    
    let pokeTypes = poke.types.map((type) => `<p class="type ${type.type.name}">${type.type.name}</p>`)
    pokeTypes = pokeTypes.join('')

    let pokeId = poke.id.toString();

    if(pokeId.length === 1) {
        pokeId = "00" + pokeId
    }else if(pokeId.length === 2) {
        pokeId = "0" + pokeId
    }

    const div = document.createElement("div")
    div.classList.add("pokemon")
    div.innerHTML = `
                <div class="pokemon">
                    <p class="pokemon-id-back">#${pokeId}</p>
                    <div class="pokemon-image">
                        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
                    </div>
                    <div class="pokemon-info">
                        <div class="name-container">
                            <p class="pokemon-id">#${pokeId}</p>
                            <h2 class="pokemon-name">${poke.name}</h2>
                        </div>
                        <div class="pokemon-types">
                            ${pokeTypes}
                        </div>
                        <div class="pokemon-stats">
                            <p class="stat">${poke.height}m</p>
                            <p class="stat">${poke.weight}kg</p>
                        </div>
                    </div>
                </div>
            `;
            pokeList.append(div)
}

headerButtons.forEach(button => button.addEventListener("click", (e) => {
    
    const buttonId = e.currentTarget.id

    pokeList.innerHTML = ""

    for(let i = 1; i <= 151; i++) {
        fetch(URL + i)
        .then((response) => response.json())
        .then(data => {

            if(buttonId === "ver-todos") {
                showPokemon(data)
            } else{
                const types = data.types.map((type) => type.type.name)
                
                if(types.some(type => type.includes(buttonId))) {
                    showPokemon(data)
                }
            }

        })
    }
}))