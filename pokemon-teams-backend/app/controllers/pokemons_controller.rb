require 'faker'
require 'securerandom'

class PokemonsController < ApplicationController

    def index
        render json: Pokemon.all
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon
    end

    def create
        
        trainer = Trainer.find(params[:trainer_id])
        
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
        render json: pokemon 
    end

    def destroy  
        pokemon = Pokemon.find(params[:id]) 
        pokemon.delete
        render json: {message: "delete complete"} 
     end
end
