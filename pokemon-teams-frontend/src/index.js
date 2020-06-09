const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", function() {
    fetchTrainers()
})


function fetchTrainers() {
    console.log("we here")
    fetch(TRAINERS_URL)
        .then(function(response) { return response.json() })
        .then(trainersArr => { trainersArr.forEach(trainer => renderTrainer(trainer)) })
        .catch(function(errors) {
            alert("turn server on!");
            console.log(error.message)
        })
};




function renderTrainer(trainer) {
    console.log(trainer)
    let main = document.querySelector("main");
    let div = document.createElement("div");
    let p = document.createElement("p");
    let ul = document.createElement("ul");
    p.innerText = trainer.name;
    div.className = "card";
    div.dataset.id = trainer.id;
    let button = document.createElement("button");
    button.dataset.id = trainer.id;
    button.innerText = "Add Pokemon";
    div.append(p, button);
    main.append(div);

}