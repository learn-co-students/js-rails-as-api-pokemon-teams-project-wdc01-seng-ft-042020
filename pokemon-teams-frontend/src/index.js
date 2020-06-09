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
    let button = document.createElement("button");
    let ul = document.createElement("ul");
    let li = document.createElement("li");


    li.innerText = trainer.pokemons;
    p.innerText = trainer.name;
    div.className = "card";
    div.dataset.id = trainer.id;
    button.dataset.trainerId = trainer.id;
    button.innerText = "Add Pokemon";
    ul.append(li)
    div.append(p, button, ul);
    main.append(div);

}