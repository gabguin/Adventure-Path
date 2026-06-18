import { HeaderApp } from "../components/header";
import { LineupPokemon } from "./Lineup";
import { SavedTeamsPage } from "./SavedTeamsPage";
import { TrainersPage } from "./TrainersPage";
import "./HomePage.css";

export function HomePage({
  lineup,
  pokemonList,
  types,
  onSelect,
  onRemove,
  onSaveTeam,
  savedTeams,
  savedTrainers,
  currentView,
  onChangeView,
  onUpdateTeam,
  onDeleteTeam,
  onSaveTrainer,
  onDeleteTrainer,
  editingTeamName,
  editingTeamTrainerId,
}) {
  return (
    <div className="home-page-shell">
      <HeaderApp
        teamCount={lineup.filter(Boolean).length}
        activeView={currentView}
        onNavigate={onChangeView}
      />

      <div className="home-page-content">
        {currentView === "saved" ? (
          <SavedTeamsPage
            savedTeams={savedTeams}
            savedTrainers={savedTrainers}
            onBackToBuilder={() => onChangeView("builder")}
            onUpdateTeam={onUpdateTeam}
            onDeleteTeam={onDeleteTeam}
          />
        ) : currentView === "trainers" ? (
          <TrainersPage
            savedTrainers={savedTrainers}
            savedTeams={savedTeams}
            onBackToBuilder={() => onChangeView("builder")}
            onSaveTrainer={onSaveTrainer}
            onDeleteTrainer={onDeleteTrainer}
          />
        ) : (
          <LineupPokemon
            lineup={lineup}
            pokemonList={pokemonList}
            types={types}
            onSelect={onSelect}
            onRemove={onRemove}
            onSaveTeam={onSaveTeam}
            savedTrainers={savedTrainers}
            editingTeamName={editingTeamName}
            editingTeamTrainerId={editingTeamTrainerId}
          />
        )}
      </div>
    </div>
  );
}