import { useEffect, useState } from "react";
import { pokemonData } from "../data/pokemon";
import "./lineup.css";

// export function LineupPokemon({ lineup, onSelect, onRemove, onSaveTeam, editingTeamName }) {
//   const [teamName, setTeamName] = useState("");
//   const [evaluation, setEvaluation] = useState(null);
//   const [selectionError, setSelectionError] = useState("");
//   const [saveError, setSaveError] = useState("");
//   const [showSaveConfirm, setShowSaveConfirm] = useState(false);
//   const [showEvaluationConfirm, setShowEvaluationConfirm] = useState(false);
//   const lineupComplete = lineup.every(Boolean);
//   const canSave = lineupComplete && teamName.trim().length > 0;
//   const saveButtonLabel = editingTeamName ? "Update Team" : "Save Team";
//   const statusMessage = editingTeamName ? `Editing ${editingTeamName} — update the lineup and save changes.` : evaluation?.summary ?? (lineupComplete ? "All slots filled — ready to evaluate." : "Select up to six Pokémon to evaluate your team.");

export function LineupPokemon({ lineup, pokemonList = [], types = [], onSelect, onRemove, onSaveTeam, editingTeamName, editingTeamTrainerId, savedTrainers = [] }) {
  const [teamName, setTeamName] = useState("");
  const [selectedTrainerId, setSelectedTrainerId] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [selectionError, setSelectionError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showEvaluationConfirm, setShowEvaluationConfirm] = useState(false);
  const [slotSearchTerms, setSlotSearchTerms] = useState({});
  
  // 🚀 1. All state initializations must live together at the top!
  const [dbTypeChart, setDbTypeChart] = useState([]);

  const lineupComplete = lineup.filter(Boolean).length > 0;
  const canSave = lineupComplete && teamName.trim().length > 0 && selectedTrainerId;
  const saveButtonLabel = editingTeamName ? "Update Team" : "Save Team";
  const statusMessage = editingTeamName ? `Editing ${editingTeamName} — update the lineup and save changes.` : evaluation?.summary ?? (lineupComplete ? "Ready to save your team." : "Select at least one Pokémon to save.");

  const typeEntries = types.length > 0 ? types : pokemonData.types;
  const typeMap = typeEntries.reduce((acc, type) => {
    acc[type.type_id] = type.type_name;
    return acc;
  }, {});

  const getTypeLabels = (poke) => {
    if (!poke) return [];
    const buildTypeTag = (typeName) => ({
      name: typeName,
      slug: typeName.toLowerCase().replace(/\s+/g, "-")
    });

    const primary = typeMap[poke.primary_type_id];
    const secondary = poke.secondary_type_id ? typeMap[poke.secondary_type_id] : null;
    return [primary, secondary].filter(Boolean).map(buildTypeTag);
  };

  const getPrimaryTypeSlug = (poke) => {
    if (!poke) return "";
    return (typeMap[poke.primary_type_id] || "").toLowerCase().replace(/\s+/g, "-");
  };

  // const getTypeLabels = (poke) => {
  //   if (!poke) return [];
  //   const buildTypeTag = (typeName) => ({
  //     name: typeName,
  //     slug: typeName.toLowerCase().replace(/\s+/g, "-")
  //   });

  //   const primary = typeMap[poke.primary_type_id];
  //   const secondary = poke.secondary_type_id ? typeMap[poke.secondary_type_id] : null;
  //   return [primary, secondary].filter(Boolean).map(buildTypeTag);
  // };

  // Clean single instance tracking the active team name changes
  useEffect(() => {
    setTeamName(editingTeamName ?? "");
    setSelectedTrainerId(editingTeamTrainerId ?? "");
    setSaveError("");
    setSelectionError("");
    setShowSaveConfirm(false);
  }, [editingTeamName, editingTeamTrainerId]);

  // 🚀 2. Fetches the live type matrix tables from your backend when loading
  useEffect(() => {
    fetch("http://localhost:5000/api/typechart")
      .then((res) => {
        if (!res.ok) throw new Error("Type chart network response failed");
        return res.json();
      })
      .then((data) => {
        console.log("Type chart loaded from DB successfully:", data);
        setDbTypeChart(data);
      })
      .catch((err) => console.error("Error loading type chart from MySQL backend:", err));
  }, []); // Run exactly once on initial mount

  // const evaluate = () => {
  //   const selectedPokemon = lineup.filter(Boolean);

  //   if (selectedPokemon.length === 0) {
  //     setEvaluation({
  //       summary: "No Pokémon selected yet.",
  //       empty: true,
  //     });
  //     return;
  //   }

  //   const typeMap = pokemonData.types.reduce((acc, type) => {
  //     acc[type.type_id] = type.type_name;
  //     return acc;
  //   }, {});

  //   // 🚀 Uses your live dbTypeChart array state instead of the static file
  //   const weaknessMap = dbTypeChart.reduce((acc, entry) => {
  //     // Note: If your MySQL columns use alternative names like 'attacker_id' / 'defender_id', update them here!
  //     if (!acc[entry.defender_type_id]) {
  //       acc[entry.defender_type_id] = [];
  //     }
  //     acc[entry.defender_type_id].push(entry.attacker_type_id);
  //     return acc;
  //   }, {});

  //   const selectedTypeIds = new Set();
  //   const weaknessCounts = {};

  //   selectedPokemon.forEach((poke) => {
  //     const pokemonTypes = [poke.primary_type_id, poke.secondary_type_id].filter(Boolean);

  //     pokemonTypes.forEach((typeId) => {
  //       selectedTypeIds.add(typeId);
  //       const attackerTypes = weaknessMap[typeId] || [];

  //       attackerTypes.forEach((attackerTypeId) => {
  //         weaknessCounts[attackerTypeId] = (weaknessCounts[attackerTypeId] || 0) + 1;
  //       });
  //     });
  //   });

  //   const teamAttack = selectedPokemon.reduce((sum, poke) => sum + poke.base_attack, 0);
  //   const teamSpeed = selectedPokemon.reduce((sum, poke) => sum + poke.base_speed, 0);
  //   const teamBulk = selectedPokemon.reduce((sum, poke) => sum + poke.base_hp + poke.base_defense, 0);

  //   const sourcePokemon = pokemonList.length > 0 ? pokemonList : pokemonData.pokemon;
  //   const sourceCount = sourcePokemon.length || 1;
  //   const averageAttack = sourcePokemon.reduce((sum, poke) => sum + poke.base_attack, 0) / sourceCount;
  //   const averageSpeed = sourcePokemon.reduce((sum, poke) => sum + poke.base_speed, 0) / sourceCount;
  //   const averageHP = sourcePokemon.reduce((sum, poke) => sum + poke.base_hp, 0) / sourceCount;
  //   const averageDefense = sourcePokemon.reduce((sum, poke) => sum + poke.base_defense, 0) / sourceCount;

  //   const teamSize = selectedPokemon.length;
  //   const averageAttackTotal = averageAttack * teamSize;
  //   const averageSpeedTotal = averageSpeed * teamSize;
  //   const averageBulkTotal = (averageHP + averageDefense) * teamSize;

  //   const attackPercent = averageAttackTotal === 0 ? 0 : Math.round((teamAttack / averageAttackTotal) * 100);
  //   const speedPercent = averageSpeedTotal === 0 ? 0 : Math.round((teamSpeed / averageSpeedTotal) * 100);
  //   const bulkPercent = averageBulkTotal === 0 ? 0 : Math.round((teamBulk / averageBulkTotal) * 100);

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

  //   setEvaluation({
  //     summary: `${selectedPokemon.length}/6 selected. Team preview: ${selectedPokemon.map((poke) => poke.species_name).join(", ")}`,
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
  //   });
  // };

  const evaluate = () => {
    const selectedPokemon = lineup.filter(Boolean);

    if (selectedPokemon.length === 0) {
      setEvaluation({
        summary: "No Pokémon selected yet.",
        empty: true,
      });
      return;
    }

    const typeEntries = types.length > 0 ? types : pokemonData.types;
    const typeMap = typeEntries.reduce((acc, type) => {
      acc[type.type_id] = type.type_name;
      return acc;
    }, {});

    // 🚀 FIXED: Robust check matching your MySQL database column names
    const weaknessMap = dbTypeChart.reduce((acc, entry) => {
      // Handles 'damageMultiplier', 'damage_multiplier', or 'multiplier' from your backend response
      const multiplier = entry.damageMultiplier ?? entry.damage_multiplier ?? entry.multiplier;

      // Only count it as a weakness if it's an attacking type that deals amplified damage (> 1)
      if (Number(multiplier) > 1) {
        const defenderId = entry.defender_type_id ?? entry.defender_id;
        const attackerId = entry.attacker_type_id ?? entry.attacker_id;

        if (defenderId && attackerId) {
          if (!acc[defenderId]) {
            acc[defenderId] = [];
          }
          acc[defenderId].push(attackerId);
        }
      }
      return acc;
    }, {});

    const selectedTypeIds = new Set();
    const weaknessCounts = {};

    selectedPokemon.forEach((poke) => {
      const pokemonTypes = [poke.primary_type_id, poke.secondary_type_id].filter(Boolean);

      pokemonTypes.forEach((typeId) => {
        selectedTypeIds.add(typeId);
        const attackerTypes = weaknessMap[typeId] || [];

        attackerTypes.forEach((attackerTypeId) => {
          weaknessCounts[attackerTypeId] = (weaknessCounts[attackerTypeId] || 0) + 1;
        });
      });
    });

    const teamAttack = selectedPokemon.reduce((sum, poke) => sum + poke.base_attack, 0);
    const teamSpeed = selectedPokemon.reduce((sum, poke) => sum + poke.base_speed, 0);
    const teamBulk = selectedPokemon.reduce((sum, poke) => sum + poke.base_hp + poke.base_defense, 0);

    const sourcePokemon = pokemonList.length > 0 ? pokemonList : pokemonData.pokemon;
    const sourceCount = sourcePokemon.length || 1;
    const averageAttack = sourcePokemon.reduce((sum, poke) => sum + poke.base_attack, 0) / sourceCount;
    const averageSpeed = sourcePokemon.reduce((sum, poke) => sum + poke.base_speed, 0) / sourceCount;
    const averageHP = sourcePokemon.reduce((sum, poke) => sum + poke.base_hp, 0) / sourceCount;
    const averageDefense = sourcePokemon.reduce((sum, poke) => sum + poke.base_defense, 0) / sourceCount;

    const teamSize = selectedPokemon.length;
    const averageAttackTotal = averageAttack * teamSize;
    const averageSpeedTotal = averageSpeed * teamSize;
    const averageBulkTotal = (averageHP + averageDefense) * teamSize;

    const attackPercent = averageAttackTotal === 0 ? 0 : Math.round((teamAttack / averageAttackTotal) * 100);
    const speedPercent = averageSpeedTotal === 0 ? 0 : Math.round((teamSpeed / averageSpeedTotal) * 100);
    const bulkPercent = averageBulkTotal === 0 ? 0 : Math.round((teamBulk / averageBulkTotal) * 100);

    // 🚀 FIXED: Filters out types that don't match your local map values to eliminate "Unknown" text
    const sortedWeaknesses = Object.entries(weaknessCounts)
      .map(([typeId, count]) => {
        const numericTypeId = Number(typeId);
        return {
          typeId: numericTypeId,
          count,
          typeName: typeMap[numericTypeId],
        };
      })
      .filter((entry) => entry.typeName) // Discard any IDs that don't have a matching human name string
      .sort((a, b) => b[1] - a[1]);

    const uniqueTypeCount = selectedTypeIds.size;
    const topWeaknesses = sortedWeaknesses.slice(0, 3);
    const overlapWeaknesses = sortedWeaknesses.filter((entry) => entry.count > 1);

    setEvaluation({
      summary: `${selectedPokemon.length}/6 selected. Team preview: ${selectedPokemon.map((poke) => poke.species_name).join(", ")}`,
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
    });
  };

  const handleEvaluateClick = () => {
    if (!lineupComplete) {
      setShowEvaluationConfirm(true);
      return;
    }

    evaluate();
  };

  const confirmEvaluation = () => {
    setShowEvaluationConfirm(false);
    evaluate();
  };

  const handleSave = () => {
    if (!canSave) {
      return;
    }

    setShowSaveConfirm(true);
  };

  const handleNicknameChange = (slotIndex, nickname) => {
    onSelect(slotIndex, {
      ...lineup[slotIndex],
      nickname,
    });
  };

  const confirmSave = async () => {
    const saved = await onSaveTeam(teamName, selectedTrainerId);
    if (saved === false) {
      setSaveError("That team name is already saved for this trainer. Choose a different name or trainer.");
      setShowSaveConfirm(false);
      return;
    }

    setSaveError("");
    setShowSaveConfirm(false);
    setTeamName("");
  };

  return (
    <section className="lineup-container">
      <div className="lineup-header-row">
        <div>
          <h1 className="lineup-title">Choose Your Team</h1>
          <p className="lineup-copy">Each slot can hold one Pokémon. Pick from the list and save your lineup.</p>
        </div>

        <div className="lineup-status-box">
          <span className="lineup-status-label">Evaluate</span>
          <p className="lineup-status-text">{statusMessage}</p>
        </div>
      </div>

      <div className="lineup-controls">
            <div className="team-save-box">
          <label className="team-name-label" htmlFor="team-name">Save team name</label>
          <div className="team-save-row">
            <input
              id="team-name"
              className="team-name-input"
              type="text"
              placeholder="Enter team name"
              value={teamName}
              onChange={(event) => {
                setTeamName(event.target.value);
                if (saveError) {
                  setSaveError("");
                }
              }}
            />
            <button
              className="btn-primary"
              onClick={handleSave}
              type="button"
              disabled={!canSave}
            >
              {saveButtonLabel}
            </button>
          </div>
          <label className="team-name-label" htmlFor="trainer-select">Trainer</label>
          <div className="team-save-row">
            <select
              id="trainer-select"
              className="team-name-input"
              value={selectedTrainerId}
              onChange={(event) => {
                setSelectedTrainerId(event.target.value);
                if (saveError) {
                  setSaveError("");
                }
              }}
            >
              <option value="">Select a trainer</option>
              {savedTrainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.username}
                </option>
              ))}
            </select>
          </div>
          {!savedTrainers.length && (
            <p className="lineup-feedback-error">Create a trainer first in the Trainers tab before saving teams.</p>
          )}
          {saveError && <p className="lineup-feedback-error">{saveError}</p>}
        </div>
      </div>

      {showEvaluationConfirm && (
        <div className="save-confirm-backdrop" role="dialog" aria-modal="true">
          <div className="save-confirm-modal">
            <p className="save-confirm-title">Your team is incomplete</p>
            <p className="save-confirm-copy">Are you sure you want to evaluate with fewer than six Pokémon?</p>
            <div className="save-confirm-actions">
              <button className="save-confirm-cancel" type="button" onClick={() => setShowEvaluationConfirm(false)}>
                Cancel
              </button>
              <button className="save-confirm-save" type="button" onClick={confirmEvaluation}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {showSaveConfirm && (
        <div className="save-confirm-backdrop" role="dialog" aria-modal="true">
          <div className="save-confirm-modal">
            <p className="save-confirm-title">Save team?</p>
            <p className="save-confirm-copy">Are you sure you want to save <strong>{teamName.trim()}</strong>?</p>
            <div className="save-confirm-actions">
              <button className="save-confirm-cancel" type="button" onClick={() => {
                setShowSaveConfirm(false);
              }}>
                Cancel
              </button>
              <button className="save-confirm-save" type="button" onClick={confirmSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="lineup-grid">
        {lineup.map((poke, index) => {
          const sourcePokemon = pokemonList.length > 0 ? pokemonList : pokemonData.pokemon;
          const searchTerm = (slotSearchTerms[index] || "").trim().toLowerCase();
          const renderedPokemon = sourcePokemon.filter((item) =>
            item.species_name.toLowerCase().includes(searchTerm),
          );

          return (
            <article key={index} className="lineup-slot">
              <div className="slot-header">
                <div>
                  <p className="slot-number">Slot {index + 1}</p>
                  <p className="slot-subtitle">{poke ? poke.species_name : "Empty"}</p>
                </div>

                {poke && (
                  <button
                    className="remove-btn"
                    onClick={() => {
                      onRemove(index);
                      if (selectionError) {
                        setSelectionError("");
                      }
                    }}
                    type="button"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="slot-body">
                {poke ? (
                  <>
                    <div className={`slot-image-wrap type-${getPrimaryTypeSlug(poke)}`}>
                      <img className="slot-image" src={poke.image_url} alt={poke.species_name} />
                    </div>
                    <div className="slot-details">
                      <div className="slot-name">
                        {poke.nickname ? `${poke.nickname} (${poke.species_name})` : poke.species_name}
                      </div>
                      <div className="slot-types">
                        {getTypeLabels(poke).map((type) => (
                          <span key={type.slug} className={`slot-type type-${type.slug}`}>{type.name}</span>
                        ))}
                      </div>
                      <div className="slot-nickname-row">
                        <label className="slot-nickname-label" htmlFor={`nickname-${index}`}>Nickname</label>
                        <input
                          id={`nickname-${index}`}
                          className="slot-nickname-input"
                          type="text"
                          placeholder="Give it a name"
                          value={poke.nickname ?? ""}
                          onChange={(event) => handleNicknameChange(index, event.target.value)}
                        />
                      </div>
                      <div className="slot-stats">
                        <span>HP {poke.base_hp}</span>
                        <span>ATK {poke.base_attack}</span>
                        <span>DEF {poke.base_defense}</span>
                        <span>SPD {poke.base_speed}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="slot-empty-state">
                    <p>No Pokémon selected</p>
                    <span>Use the dropdown below</span>
                  </div>
                )}

                <label className="slot-select-wrap" htmlFor={`slot-${index}`}>
                  <span className="slot-select-label">Search Pokémon</span>
                  <input
                    id={`slot-search-${index}`}
                    className="slot-search-input"
                    type="search"
                    value={slotSearchTerms[index] || ""}
                    placeholder="Type to filter"
                    onChange={(event) => {
                      const value = event.target.value;
                      setSlotSearchTerms((current) => ({
                        ...current,
                        [index]: value,
                      }));
                    }}
                  />
                  <span className="slot-select-label">Choose Pokémon</span>
                  <select
                    id={`slot-${index}`}
                    className="slot-select"
                    value={poke ? poke.pokemon_id : ""}
                    onChange={(event) => {
                      const sourcePokemon = pokemonList.length > 0 ? pokemonList : pokemonData.pokemon;
                      const selectedPokemon = sourcePokemon.find((item) => item.pokemon_id === Number(event.target.value));

                      const selectedPokemonWithNickname = selectedPokemon
                        ? {
                            ...selectedPokemon,
                            nickname: poke?.nickname ?? "",
                          }
                        : null;

                      setSelectionError("");
                      onSelect(index, selectedPokemonWithNickname);
                    }}
                  >
                    <option value="">Select a Pokémon</option>
                    {renderedPokemon.map((item) => (
                      <option key={item.pokemon_id} value={item.pokemon_id}>
                        {item.species_name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </article>
          );
        })}
      </div>

      {selectionError && <p className="lineup-feedback-error">{selectionError}</p>}

      <div className="lineup-footer-actions">
        <button
          className="evaluate-button-wide"
          onClick={handleEvaluateClick}
          type="button"
        >
          Evaluate
        </button>
      </div>

      {evaluation && evaluation.empty ? (
        <p className="lineup-feedback-error">{evaluation.summary}</p>
      ) : null}

      {evaluation && !evaluation.empty && (
        <section className="evaluation-panel">
          <div className="evaluation-headline">
            <h2>Team evaluation</h2>
            <p>{evaluation.summary}</p>
          </div>

          <div className="evaluation-grid">
            <article className="evaluation-card">
              <div className="evaluation-card-title">Offense</div>
              <div className="evaluation-metric-row">
                <span>Attack</span>
                <strong>{evaluation.offense.attack}</strong>
              </div>
              <div className="evaluation-metric-row">
                <span>Speed</span>
                <strong>{evaluation.offense.speed}</strong>
              </div>
              <div className="evaluation-metric-row">
                <span>Against average</span>
                <strong>{evaluation.offense.attackPercent}% attack / {evaluation.offense.speedPercent}% speed</strong>
              </div>
              <p className="evaluation-qualitative">{evaluation.offense.qualitative}</p>
            </article>

            <article className="evaluation-card">
              <div className="evaluation-card-title">Defense</div>
              <div className="evaluation-metric-row">
                <span>Bulk</span>
                <strong>{evaluation.defense.bulk}</strong>
              </div>
              <div className="evaluation-metric-row">
                <span>Against average</span>
                <strong>{evaluation.defense.bulkPercent}%</strong>
              </div>
              <p className="evaluation-qualitative">{evaluation.defense.qualitative}</p>
            </article>

            <article className="evaluation-card evaluation-card-wide">
              <div className="evaluation-card-title">Coverage & weaknesses</div>
              <div className="evaluation-metric-row">
                <span>Unique types</span>
                <strong>{evaluation.coverage.uniqueTypes}</strong>
              </div>
              <div className="evaluation-metric-row">
                <span>Coverage</span>
                <strong>{evaluation.coverage.typeCoverage}</strong>
              </div>
              <div className="evaluation-metric-row">
                <span>Top threats</span>
                <strong>{evaluation.coverage.weaknessProfile}</strong>
              </div>
              <p className="evaluation-qualitative">{evaluation.coverage.overlap}</p>
            </article>
          </div>
        </section>
      )}
    </section>
  );
}