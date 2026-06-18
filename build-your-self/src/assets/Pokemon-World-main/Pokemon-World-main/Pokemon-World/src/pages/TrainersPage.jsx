import { useState } from "react";

export function TrainersPage({ savedTrainers = [], savedTeams = [], onBackToBuilder, onSaveTrainer, onDeleteTrainer }) {
  const [username, setUsername] = useState("");
  const [selectedTrainerId, setSelectedTrainerId] = useState("");
  const [saveError, setSaveError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const canSave = username.trim().length > 0;

  const handleSaveClick = () => {
    if (!canSave) return;
    setShowConfirm(true);
  };

  const confirmSave = async () => {
    const saved = await onSaveTrainer(username);
    if (!saved.success) {
      if (saved.error === 'duplicate') {
        setSaveError("That trainer name is already saved. Choose a different name.");
      } else if (saved.error === 'backend') {
        setSaveError(saved.message || "Unable to save trainer. Check your backend connection.");
      } else {
        setSaveError("Unable to save trainer. Please try again.");
      }
      setShowConfirm(false);
      return;
    }

    setSaveError("");
    setUsername("");
    setShowConfirm(false);
  };

  const selectedTrainer = savedTrainers.find((trainer) => trainer.id === selectedTrainerId);
  const teamsForTrainer = savedTeams.filter((team) => team.trainerId === selectedTrainerId);

  return (
    <section className="saved-teams-view">
      <div className="saved-teams-view-header">
        <div>
          <h1 className="saved-teams-view-title">Trainers</h1>
          <p className="saved-teams-view-copy">Create trainer profiles for your teams and track who owns each lineup.</p>
        </div>

        <button className="saved-teams-back-button" type="button" onClick={onBackToBuilder}>
          Back to Builder
        </button>
      </div>

      <div className="team-save-box">
        <label className="team-name-label" htmlFor="trainer-name">Trainer username</label>
        <div className="team-save-row">
          <input
            id="trainer-name"
            className="team-name-input"
            type="text"
            placeholder="Enter trainer name"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
              if (saveError) {
                setSaveError("");
              }
            }}
          />
          <button className="btn-primary" onClick={handleSaveClick} type="button" disabled={!canSave}>
            Save Trainer
          </button>
        </div>
        {saveError && <p className="lineup-feedback-error">{saveError}</p>}
      </div>

      {showConfirm && (
        <div className="save-confirm-backdrop" role="dialog" aria-modal="true">
          <div className="save-confirm-modal">
            <p className="save-confirm-title">Create new trainer?</p>
            <p className="save-confirm-copy">Are you sure you want to save <strong>{username.trim()}</strong> as a trainer?</p>
            <div className="save-confirm-actions">
              <button className="save-confirm-cancel" type="button" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
              <button className="save-confirm-save" type="button" onClick={confirmSave}>
                Save Trainer
              </button>
            </div>
          </div>
        </div>
      )}

      {savedTrainers.length === 0 ? (
        <div className="saved-teams-empty-state">
          <p>No trainers added yet. Save a new trainer to get started.</p>
        </div>
      ) : (
        <div className="saved-teams-grid">
          {savedTrainers.map((trainer, index) => (
            <article
              className="saved-team-card"
              key={`${trainer.id ?? trainer.username}-${index}`}
              onClick={() => setSelectedTrainerId(trainer.id)}
              style={{
                cursor: 'pointer',
                borderColor: trainer.id === selectedTrainerId ? '#2563eb' : undefined,
                boxShadow: trainer.id === selectedTrainerId ? '0 0 0 2px rgba(37,99,235,0.2)' : undefined,
              }}
            >
              <div className="saved-team-card-header">
                <div>
                  <div className="saved-team-name">{trainer.username}</div>
                  <div className="saved-team-meta">
                    Trainer ID: {trainer.id}
                    {teamsForTrainer.length > 0 && trainer.id === selectedTrainerId ? ` • ${teamsForTrainer.length} teams` : ''}
                  </div>
                </div>
              </div>

              <div className="saved-team-actions">
                <button
                  className="saved-team-action-btn saved-team-delete-btn"
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDeleteTrainer(trainer);
                    if (selectedTrainerId === trainer.id) {
                      setSelectedTrainerId("");
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {selectedTrainer ? (
        <div className="saved-teams-view" style={{ marginTop: '24px' }}>
          <div className="saved-teams-view-header">
            <div>
              <h2 className="saved-teams-view-title">Teams for {selectedTrainer.username}</h2>
              <p className="saved-teams-view-copy">These are the saved teams that belong to this trainer.</p>
            </div>
          </div>

          {teamsForTrainer.length === 0 ? (
            <div className="saved-teams-empty-state">
              <p>This trainer has not created any teams yet.</p>
            </div>
          ) : (
            <div className="saved-teams-grid">
              {teamsForTrainer.map((team, index) => (
                <article className="saved-team-card" key={`${team.id}-${index}`}>
                  <div className="saved-team-card-header">
                    <div>
                      <div className="saved-team-name">{team.name}</div>
                      <div className="saved-team-meta">{team.pokemon.length} Pokémon saved</div>
                    </div>
                    <span className="saved-team-badge">Owned</span>
                  </div>

                  <ul className="saved-team-members">
                    {team.pokemon.map((poke, pokeIndex) => (
                      <li key={`${poke.pokemon_id}-${pokeIndex}`}>{poke.species_name}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          )}
        </div>
      ) : (
        savedTrainers.length > 0 && (
          <div className="saved-teams-empty-state" style={{ marginTop: '24px' }}>
            <p>Click a trainer card above to view their saved teams.</p>
          </div>
        )
      )}
    </section>
  );
}
