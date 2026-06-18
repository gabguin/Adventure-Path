import './sidebar.css'

export function Sidebar({ pokemon = [], types = [], searchTerm = '', selectedType = 'All', onSearchChange, onTypeChange, selectedPokemonId, onSelect }) {
  const getTypeName = (typeId) => types.find((type) => type.type_id === typeId)?.type_name

  const matches = pokemon.filter((poke) => {
    const nameMatch = poke.species_name.toLowerCase().includes(searchTerm.toLowerCase())
    const primaryType = getTypeName(poke.primary_type_id)
    const secondaryType = getTypeName(poke.secondary_type_id)
    const typeMatch = selectedType === 'All' || primaryType === selectedType || secondaryType === selectedType

    return nameMatch && typeMatch
  })

  const filteredPokemon = matches.filter((poke) => {
    if (!searchTerm.trim()) return true
    return poke.species_name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const suggestions = matches.slice(0, 6)

  return (
    <aside className="pokemon-sidebar">
      <div className="sidebar-header">
        <h2>Pokédex</h2>
        <p>Pick a Pokémon to see its details.</p>
      </div>

      <div className="sidebar-search-row">
        <input
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search Pokémon"
        />

        <select value={selectedType} onChange={onTypeChange}>
          <option value="All">All Types</option>
          {types.map((type) => (
            <option key={type.type_id} value={type.type_name}>
              {type.type_name}
            </option>
          ))}
        </select>
      </div>

      {searchTerm.trim().length > 0 && suggestions.length > 0 ? (
        <div className="suggestion-panel" role="listbox" aria-label="Matching Pokémon suggestions">
          {suggestions.map((poke) => {
            const primaryType = getTypeName(poke.primary_type_id)
            const secondaryType = getTypeName(poke.secondary_type_id)

            return (
              <button
                key={poke.pokemon_id}
                type="button"
                className="suggestion-item"
                onClick={() => onSelect(poke)}
              >
                <img src={poke.image_url} alt={poke.species_name} />
                <span className="suggestion-copy">
                  <strong>{poke.species_name}</strong>
                  <small>{primaryType}{secondaryType ? ` • ${secondaryType}` : ''}</small>
                </span>
              </button>
            )
          })}
        </div>
      ) : null}

      {!searchTerm.trim() ? (
        <div className="sidebar-list">
          {filteredPokemon.map((poke) => {
            const primaryType = getTypeName(poke.primary_type_id)
            const secondaryType = getTypeName(poke.secondary_type_id)

            return (
              <button
                key={poke.pokemon_id}
                type="button"
                className={`sidebar-pokemon-button ${selectedPokemonId === poke.pokemon_id ? 'active' : ''}`}
                onClick={() => onSelect(poke)}
              >
                <img src={poke.image_url} alt={poke.species_name} />
                <div className="sidebar-pokemon-info">
                  <div className="sidebar-pokemon-name">{poke.species_name}</div>
                  <div className="sidebar-pokemon-meta">
                    <span className="sidebar-tag">{primaryType}</span>
                    {secondaryType ? <span className="sidebar-tag">{secondaryType}</span> : null}
                  </div>
                </div>
              </button>
            )
          })}

          {filteredPokemon.length === 0 ? (
            <div className="empty-detail-state">No Pokémon match that search.</div>
          ) : null}
        </div>
      ) : null}
    </aside>
  )
}
