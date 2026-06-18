export function PokemonData({ pokemon, types, onAddToLineup }) {
  const primaryType = types?.find(t => t.type_id === pokemon.primary_type_id);
  const secondaryType = types?.find(t => t.type_id === pokemon.secondary_type_id);

  return (
    <div className="pokemon-card">
      <img src={pokemon.image_url} alt={pokemon.species_name} className="pokemon-image" />
      <div className="pokemon-name">{pokemon.species_name}</div>
      <div className="pokemon-types">
        <span className="type-badge">{primaryType?.type_name}</span>
        {secondaryType && <span className="type-badge">{secondaryType?.type_name}</span>}
      </div>
      <div className="pokemon-stats">
        <div>ATK: {pokemon.base_attack}</div>
        <div>DEF: {pokemon.base_defense}</div>
        <div>HP: {pokemon.base_hp}</div>
        <div>SPD: {pokemon.base_speed}</div>
      </div>
      {onAddToLineup && (
        <button className="btn-add" onClick={() => onAddToLineup(pokemon)}>Add</button>
      )}
    </div>
  )
}