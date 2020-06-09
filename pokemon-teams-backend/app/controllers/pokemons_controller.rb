class PokemonsController < ApplicationController
    require 'faker'

    def create
        # byebug
        nickname = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: nickname, species: species, trainer_id: params[:pokemon][:trainerId].to_i)
        # byebug
        render json: pokemon.to_json(:except => [:created_at, :updated_at])
    end

    private

    def pokemon_params
        params.require(:pokemon).permit(:nickname, :species, :trainer_id)
    end

end
