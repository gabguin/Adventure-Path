import { PokemonData } from "./Pokemon"
import "./pokemonGrid.css"

export function PokemonGrid({pokemon, types, onAddToLineup}){
  return(
    <div className="pokemon-grid-container">
      {pokemon.map((poke) => {
        return(
          <PokemonData key={poke.pokemon_id} pokemon={poke} types={types} onAddToLineup={onAddToLineup}></PokemonData>
        )
      })}
    </div>
  )
}