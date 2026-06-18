import { useState } from "react";
import { pokemonData } from "../data/pokemon";
import "./SavedTeamsPage.css";

export function SavedTeamsPage({ savedTeams = [], savedTrainers = [], onBackToBuilder, onUpdateTeam, onDeleteTeam }) {
  const [previewTeam, setPreviewTeam] = useState(null);

  // const evaluateTeam = (pokemonTeam = []) => {
  //   const typeMap = pokemonData.types.reduce((acc, type) => {
  //     acc[type.type_id] = type.type_name;
  //     return acc;
  //   }, {});

  //   const weaknessMap = pokemonData.type_chart.reduce((acc, entry) => {
  //     if (!acc[entry.defender_type_id]) {
  //       acc[entry.defender_type_id] = [];
  //     }
  //     acc[entry.defender_type_id].push(entry.attacker_type_id);
  //     return acc;
  //   }, {});

  //   const hydratedPokemon = pokemonTeam
  //     .map((poke) => pokemonData.pokemon.find((entry) => entry.pokemon_id === poke.pokemon_id) ?? poke)
  //     .filter(Boolean);

  //   const selectedTypeIds = new Set();
  //   const weaknessCounts = {};

  //   hydratedPokemon.forEach((poke) => {
  //     const pokemonTypes = [poke.primary_type_id, poke.secondary_type_id].filter(Boolean);

  //     pokemonTypes.forEach((typeId) => {
  //       selectedTypeIds.add(typeId);
  //       const attackerTypes = weaknessMap[typeId] || [];

  //       attackerTypes.forEach((attackerTypeId) => {
  //         weaknessCounts[attackerTypeId] = (weaknessCounts[attackerTypeId] || 0) + 1;
  //       });
  //     });
  //   });

  //   const teamAttack = hydratedPokemon.reduce((sum, poke) => sum + poke.base_attack, 0);
  //   const teamSpeed = hydratedPokemon.reduce((sum, poke) => sum + poke.base_speed, 0);
  //   const teamBulk = hydratedPokemon.reduce((sum, poke) => sum + poke.base_hp + poke.base_defense, 0);

  //   const averageAttack = pokemonData.pokemon.reduce((sum, poke) => sum + poke.base_attack, 0) / pokemonData.pokemon.length;
  //   const averageSpeed = pokemonData.pokemon.reduce((sum, poke) => sum + poke.base_speed, 0) / pokemonData.pokemon.length;
  //   const averageHP = pokemonData.pokemon.reduce((sum, poke) => sum + poke.base_hp, 0) / pokemonData.pokemon.length;
  //   const averageDefense = pokemonData.pokemon.reduce((sum, poke) => sum + poke.base_defense, 0) / pokemonData.pokemon.length;

  //   const teamSize = hydratedPokemon.length;
  //   const averageAttackTotal = averageAttack * teamSize;
  //   const averageSpeedTotal = averageSpeed * teamSize;
  //   const averageBulkTotal = (averageHP + averageDefense) * teamSize;

  //   const attackPercent = Math.round((teamAttack / averageAttackTotal) * 100);
  //   const speedPercent = Math.round((teamSpeed / averageSpeedTotal) * 100);
  //   const bulkPercent = Math.round((teamBulk / averageBulkTotal) * 100);

  //   const sortedWeaknesses = Object.entries(weaknessCounts)
  //     .sort((a, b) => b[1] - a[1])
  //     .map(([typeId, count]) => ({
  //       typeId: Number(typeId),
  //       count,
  //       typeName: typeMap[typeId],
  //     }));

  //   const uniqueTypeCount = selectedTypeIds.size;
  //   const topWeaknesses = sortedWeaknesses.slice(0, 3);
  //   const overlapWeaknesses = sortedWeaknesses.filter((entry) => entry.count > 1);

  //   return {
  //     summary: `${hydratedPokemon.length}/6 selected. Team preview: ${hydratedPokemon.map((poke) => poke.species_name).join(", ")}`,
  //     offense: {
  //       attack: teamAttack,
  //       speed: teamSpeed,
  //       attackAverage: Math.round(averageAttackTotal),
  //       speedAverage: Math.round(averageSpeedTotal),
  //       attackPercent,
  //       speedPercent,
  //       qualitative: teamAttack >= averageAttackTotal && teamSpeed >= averageSpeedTotal ? "Strong offensive tempo" : teamAttack >= averageAttackTotal ? "High damage, moderate pace" : teamSpeed >= averageSpeedTotal ? "Fast but light-hitting" : "Below-average offensive pressure",
  //     },
  //     defense: {
  //       bulk: teamBulk,
  //       defenseAverage: Math.round(averageBulkTotal),
  //       bulkPercent,
  //       qualitative: teamBulk >= averageBulkTotal ? "Above-average durability" : "Fragile overall bulk",
  //     },
  //     coverage: {
  //       uniqueTypes: uniqueTypeCount,
  //       typeCoverage: uniqueTypeCount >= 4 ? "Broad type coverage" : uniqueTypeCount >= 3 ? "Solid but repetitive coverage" : "Limited coverage",
  //       weaknessProfile: topWeaknesses.length > 0 ? topWeaknesses.map((entry) => `${entry.typeName} (${entry.count})`).join(", ") : "No charted weaknesses in current dataset",
  //       overlap: overlapWeaknesses.length > 0 ? `Repeated vulnerabilities: ${overlapWeaknesses.map((entry) => `${entry.typeName} x${entry.count}`).join(", ")}` : "Weaknesses are spread across different attack types",
  //     },
  //   };
  // };

  const evaluateTeam = (pokemonTeam = []) => {
    const typeMap = pokemonData.types.reduce((acc, type) => {
      acc[type.type_id] = type.type_name;
      return acc;
    }, {});

    // FIX: Only add to the weakness map if the attacker deals super-effective damage (> 1)
    const weaknessMap = pokemonData.type_chart.reduce((acc, entry) => {
      if (entry.damageMultiplier > 1) { 
        if (!acc[entry.defender_type_id]) {
          acc[entry.defender_type_id] = [];
        }
        acc[entry.defender_type_id].push(entry.attacker_type_id);
      }
      return acc;
    }, {});

    const hydratedPokemon = pokemonTeam
      .map((poke) => pokemonData.pokemon.find((entry) => entry.pokemon_id === poke.pokemon_id) ?? poke)
      .filter(Boolean);

    const selectedTypeIds = new Set();
    const weaknessCounts = {};

    hydratedPokemon.forEach((poke) => {
      const pokemonTypes = [poke.primary_type_id, poke.secondary_type_id].filter(Boolean);

      pokemonTypes.forEach((typeId) => {
        selectedTypeIds.add(typeId);
        const attackerTypes = weaknessMap[typeId] || [];

        attackerTypes.forEach((attackerTypeId) => {
          weaknessCounts[attackerTypeId] = (weaknessCounts[attackerTypeId] || 0) + 1;
        });
      });
    });

    const teamAttack = hydratedPokemon.reduce((sum, poke) => sum + poke.base_attack, 0);
    const teamSpeed = hydratedPokemon.reduce((sum, poke) => sum + poke.base_speed, 0);
    const teamBulk = hydratedPokemon.reduce((sum, poke) => sum + poke.base_hp + poke.base_defense, 0);

    const averageAttack = pokemonData.pokemon.reduce((sum, poke) => sum + poke.base_attack, 0) / pokemonData.pokemon.length;
    const averageSpeed = pokemonData.pokemon.reduce((sum, poke) => sum + poke.base_speed, 0) / pokemonData.pokemon.length;
    const averageHP = pokemonData.pokemon.reduce((sum, poke) => sum + poke.base_hp, 0) / pokemonData.pokemon.length;
    const averageDefense = pokemonData.pokemon.reduce((sum, poke) => sum + poke.base_defense, 0) / pokemonData.pokemon.length;

    const teamSize = hydratedPokemon.length;
    const averageAttackTotal = averageAttack * teamSize;
    const averageSpeedTotal = averageSpeed * teamSize;
    const averageBulkTotal = (averageHP + averageDefense) * teamSize;

    const attackPercent = Math.round((teamAttack / averageAttackTotal) * 100);
    const speedPercent = Math.round((teamSpeed / averageSpeedTotal) * 100);
    const bulkPercent = Math.round((teamBulk / averageBulkTotal) * 100);

    const sortedWeaknesses = Object.entries(weaknessCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([typeId, count]) => ({
        typeId: Number(typeId),
        count,
        typeName: typeMap[typeId],
      }));

    const uniqueTypeCount = selectedTypeIds.size;
    const topWeaknesses = sortedWeaknesses.slice(0, 3);
    const overlapWeaknesses = sortedWeaknesses.filter((entry) => entry.count > 1);

    return {
      summary: `${hydratedPokemon.length}/6 selected. Team preview: ${hydratedPokemon.map((poke) => poke.species_name).join(", ")}`,
      offense: {
        attack: teamAttack,
        speed: teamSpeed,
        attackAverage: Math.round(averageAttackTotal),
        speedAverage: Math.round(averageSpeedTotal),
        attackPercent,
        speedPercent,
        qualitative: teamAttack >= averageAttackTotal && teamSpeed >= averageSpeedTotal ? "Strong offensive tempo" : teamAttack >= averageAttackTotal ? "High damage, moderate pace" : teamSpeed >= averageSpeedTotal ? "Fast but light-hitting" : "Below-average offensive pressure",
      },
      defense: {
        bulk: teamBulk,
        defenseAverage: Math.round(averageBulkTotal),
        bulkPercent,
        qualitative: teamBulk >= averageBulkTotal ? "Above-average durability" : "Fragile overall bulk",
      },
      coverage: {
        uniqueTypes: uniqueTypeCount,
        typeCoverage: uniqueTypeCount >= 4 ? "Broad type coverage" : uniqueTypeCount >= 3 ? "Solid but repetitive coverage" : "Limited coverage",
        weaknessProfile: topWeaknesses.length > 0 ? topWeaknesses.map((entry) => `${entry.typeName} (${entry.count})`).join(", ") : "No charted weaknesses in current dataset",
        overlap: overlapWeaknesses.length > 0 ? `Repeated vulnerabilities: ${overlapWeaknesses.map((entry) => `${entry.typeName} x${entry.count}`).join(", ")}` : "Weaknesses are spread across different attack types",
      },
    };
  };

  const previewEvaluation = previewTeam ? evaluateTeam(previewTeam.pokemon) : null;

  return (
    <section className="saved-teams-view">
      <div className="saved-teams-view-header">
        <div>
          <h1 className="saved-teams-view-title">Saved teams</h1>
          <p className="saved-teams-view-copy">Browse your saved rosters from the header navigation.</p>
        </div>

        <button className="saved-teams-back-button" type="button" onClick={onBackToBuilder}>
          Back to builder
        </button>
      </div>

      {previewTeam && (
        <div className="saved-team-preview-backdrop" onClick={() => setPreviewTeam(null)}>
          <div className="saved-team-preview-modal" onClick={(event) => event.stopPropagation()}>
            <div className="saved-team-preview-header">
              <div>
                <p className="saved-team-preview-tag">Saved team preview</p>
                <h2 className="saved-team-preview-title">{previewTeam.name}</h2>
              </div>
              <button className="saved-team-preview-close" type="button" onClick={() => setPreviewTeam(null)}>
                Close
              </button>
            </div>

            <div className="saved-team-preview-members">
              {previewTeam.pokemon.map((poke, index) => (
                <article className="saved-team-preview-member" key={`${poke.pokemon_id}-${index}`}>
                  <img className="saved-team-preview-image" src={poke.image_url} alt={poke.species_name} />
                  <div className="saved-team-preview-member-copy">
                    <div className="saved-team-preview-member-name">
                      {poke.nickname ? `${poke.nickname} (${poke.species_name})` : poke.species_name}
                    </div>
                    <div className="saved-team-preview-member-stats">
                      <span>HP {poke.base_hp}</span>
                      <span>ATK {poke.base_attack}</span>
                      <span>DEF {poke.base_defense}</span>
                      <span>SPD {poke.base_speed}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {previewEvaluation && (
              <section className="saved-team-preview-evaluation">
                <div className="saved-team-preview-evaluation-headline">
                  <h3>Team evaluation</h3>
                  <p>{previewEvaluation.summary}</p>
                </div>

                <div className="saved-team-preview-evaluation-grid">
                  <article className="saved-team-preview-evaluation-card">
                    <div className="saved-team-preview-evaluation-card-title">Offense</div>
                    <div className="saved-team-preview-metric-row">
                      <span>Attack</span>
                      <strong>{previewEvaluation.offense.attack}</strong>
                    </div>
                    <div className="saved-team-preview-metric-row">
                      <span>Speed</span>
                      <strong>{previewEvaluation.offense.speed}</strong>
                    </div>
                    <div className="saved-team-preview-metric-row">
                      <span>Against average</span>
                      <strong>{previewEvaluation.offense.attackPercent}% attack / {previewEvaluation.offense.speedPercent}% speed</strong>
                    </div>
                    <p className="saved-team-preview-qualitative">{previewEvaluation.offense.qualitative}</p>
                  </article>

                  <article className="saved-team-preview-evaluation-card">
                    <div className="saved-team-preview-evaluation-card-title">Defense</div>
                    <div className="saved-team-preview-metric-row">
                      <span>Bulk</span>
                      <strong>{previewEvaluation.defense.bulk}</strong>
                    </div>
                    <div className="saved-team-preview-metric-row">
                      <span>Against average</span>
                      <strong>{previewEvaluation.defense.bulkPercent}%</strong>
                    </div>
                    <p className="saved-team-preview-qualitative">{previewEvaluation.defense.qualitative}</p>
                  </article>

                  <article className="saved-team-preview-evaluation-card saved-team-preview-evaluation-card-wide">
                    <div className="saved-team-preview-evaluation-card-title">Coverage & weaknesses</div>
                    <div className="saved-team-preview-metric-row">
                      <span>Unique types</span>
                      <strong>{previewEvaluation.coverage.uniqueTypes}</strong>
                    </div>
                    <div className="saved-team-preview-metric-row">
                      <span>Coverage</span>
                      <strong>{previewEvaluation.coverage.typeCoverage}</strong>
                    </div>
                    <div className="saved-team-preview-metric-row">
                      <span>Top threats</span>
                      <strong>{previewEvaluation.coverage.weaknessProfile}</strong>
                    </div>
                    <p className="saved-team-preview-qualitative">{previewEvaluation.coverage.overlap}</p>
                  </article>
                </div>
              </section>
            )}
          </div>
        </div>
      )}

      {savedTeams.length === 0 ? (
        <div className="saved-teams-empty-state">
          No saved teams yet. Save a team from the builder to see it here.
        </div>
      ) : (
        <div className="saved-teams-grid">
          {savedTeams.map((team, index) => (
            <article
              className="saved-team-card"
              key={`${team.id ?? team.savedAt ?? team.name}-${index}`}
              onDoubleClick={() => setPreviewTeam(team)}
            >
              <div className="saved-team-card-header">
                <div>
                  <div className="saved-team-name">{team.name}</div>
                  <div className="saved-team-meta">
                    {team.pokemon.length} Pokémon saved
                    {team.trainerId ? ` • Trainer: ${savedTrainers.find((trainer) => trainer.id === team.trainerId)?.username ?? 'Unknown'}` : ''}
                  </div>
                </div>
                <span className="saved-team-badge">Saved</span>
              </div>

              <ul className="saved-team-members">
                {team.pokemon.map((poke, pokeIndex) => (
                  <li key={`${poke.pokemon_id}-${pokeIndex}`}>
                    {poke.nickname ? `${poke.nickname} (${poke.species_name})` : poke.species_name}
                  </li>
                ))}
              </ul>

              <div className="saved-team-actions">
                <button className="saved-team-action-btn saved-team-update-btn" type="button" onClick={() => onUpdateTeam(team)}>
                  Update
                </button>
                <button className="saved-team-action-btn saved-team-delete-btn" type="button" onClick={() => onDeleteTeam(team)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
