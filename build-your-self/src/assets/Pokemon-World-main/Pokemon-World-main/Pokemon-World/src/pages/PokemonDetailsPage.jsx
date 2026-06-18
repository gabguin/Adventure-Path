import { HeaderApp } from '../components/header'
import { Sidebar } from '../components/sidebar'
import { pokemonData } from '../data/pokemon'
import './PokemonDetailsPage.css'

export function PokemonDetailsPage({
  lineup = [],
  searchTerm,
  selectedType,
  onSearchChange,
  onTypeChange,
  onBackToHome,
  onSelectPokemon,
  selectedPokemon,
  types,
  onAddToLineup,
}) {
  const typeEntries = types || pokemonData.types
  const detailPokemon = selectedPokemon || pokemonData.pokemon[0]
  const primaryType = typeEntries.find((type) => type.type_id === detailPokemon.primary_type_id)?.type_name
  const secondaryType = typeEntries.find((type) => type.type_id === detailPokemon.secondary_type_id)?.type_name

  return (
    <div className="details-page-shell">
      <HeaderApp
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        selectedType={selectedType}
        onTypeChange={onTypeChange}
        types={typeEntries}
        teamCount={lineup.filter(Boolean).length}
        onTeamClick={onBackToHome}
      />

      <div className="details-layout">
        <Sidebar
          pokemon={pokemonData.pokemon}
          types={typeEntries}
          searchTerm={searchTerm}
          selectedType={selectedType}
          onSearchChange={onSearchChange}
          onTypeChange={onTypeChange}
          selectedPokemonId={detailPokemon.pokemon_id}
          onSelect={onSelectPokemon}
        />

        <section className="details-content">
          <div className="details-intro">
            <div>
              <h1>{detailPokemon.species_name}</h1>
              <p>Inspect the selected Pokémon and add it straight into your lineup.</p>
            </div>

            <div className="details-actions">
              <button className="details-button" type="button" onClick={() => onAddToLineup(detailPokemon)}>
                Add to Team
              </button>
              <button className="secondary-button" type="button" onClick={onBackToHome}>
                Back to Team
              </button>
            </div>
          </div>

          <div className="details-card">
            <div className="details-visual">
              <img src={detailPokemon.image_url} alt={detailPokemon.species_name} />
              <div className="detail-types">
                <span className="type-pill">{primaryType}</span>
                {secondaryType ? <span className="type-pill">{secondaryType}</span> : null}
              </div>
            </div>

            <div className="details-stats">
              <div className="stat-tile">
                <span className="stat-label">HP</span>
                <span className="stat-value">{detailPokemon.base_hp}</span>
              </div>
              <div className="stat-tile">
                <span className="stat-label">Attack</span>
                <span className="stat-value">{detailPokemon.base_attack}</span>
              </div>
              <div className="stat-tile">
                <span className="stat-label">Defense</span>
                <span className="stat-value">{detailPokemon.base_defense}</span>
              </div>
              <div className="stat-tile">
                <span className="stat-label">Speed</span>
                <span className="stat-value">{detailPokemon.base_speed}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
