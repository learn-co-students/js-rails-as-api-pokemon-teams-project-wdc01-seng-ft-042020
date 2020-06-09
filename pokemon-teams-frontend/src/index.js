const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {

    // console.log("Hey, Im on the document -JS")
    renderAllTrainers();

})

function renderAllTrainers(){

    fetch(TRAINERS_URL)
    .then( res => res.json() )
    .then( trainers => {
        trainers.forEach( renderOneTrainer )
    })
}

function handleAddPokemon(e) {
    // if team size < 6, you may proceed
    //debugger
    //console.log(e.target.nextS)

    if (e.target.nextSibling.children.length < 6) {
        let trId = e.target.dataset.trainerId
        fetch(POKEMONS_URL, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                Accept: "application/json"
            },
            //body: JSON.stringify({trainerId: trId})
            body: JSON.stringify({pokemon: {trainerId:trId}})
            // {pokemon: {trainerId: trId}}
        })
        .then(resp => resp.json())
        .then(pkmn => {renderOnePokemon(pkmn, e.target.nextSibling)})

    }


    //e.target.dataset.trainerId is the trainerID we assoc with the created pkmn

    // fetch(POKEMONS_URL, {
    // method: "POST"
    // headers: {}
    // body:)
}

function handleReleasePokemon(e) {

    let pokeId = e.target.dataset.pokemonId;
    
    fetch(`${POKEMONS_URL}/${pokeId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json"
        }
        // body: JSON.stringify({
        //     pokemon: {id: pokeId}
        // })
    })
    .then(res => res.json() )
    .then( data => {
        
        e.target.parentNode.remove()

    })


}

function renderOnePokemon(pkmn, list) {
    
    let listElement = document.createElement("li")
    let releaseBtn = document.createElement("button")
    releaseBtn.className = "release"
    releaseBtn.dataset.pokemonId = pkmn.id
    releaseBtn.innerText = "Release"
    releaseBtn.addEventListener("click", handleReleasePokemon)
    listElement.innerText = `${pkmn.nickname} (${pkmn.species})`
    listElement.appendChild(releaseBtn)
    list.appendChild(listElement)
}



function renderOneTrainer(trainer) {

    const main = document.querySelector('main')
    const trainerCard = document.createElement('div')
    trainerCard.className = `card`
    trainerCard.dataset.trainerId = trainer.id

    let name = document.createElement('p')
    name.innerText = trainer.name

    let addBtn = document.createElement('button')
    addBtn.dataset.trainerId = trainer.id
    addBtn.innerText = "Add Pokemon"
    addBtn.addEventListener("click", handleAddPokemon)

    let list = document.createElement('ul')

    trainer.pokemons.forEach( (pkmn) => renderOnePokemon(pkmn, list))



    trainerCard.append(name, addBtn, list)
    main.appendChild(trainerCard);
}
