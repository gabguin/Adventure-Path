import './header.css'

export function HeaderApp({ teamCount = 0, activeView = 'builder', onNavigate }) {
  return (
    <header className="header-app">
      <div className="brand-block">
        <span className="brand-title">Pokemon Team Builder</span>
        <span className="brand-subtitle">Pick 6 Pokémon, save your team, and create trainers</span>
      </div>

      <nav className="header-nav" aria-label="Primary">
        <button
          className={`header-tab ${activeView === 'builder' ? 'active' : ''}`}
          type="button"
          onClick={() => onNavigate('builder')}
        >
          Team Builder
        </button>
        <button
          className={`header-tab ${activeView === 'saved' ? 'active' : ''}`}
          type="button"
          onClick={() => onNavigate('saved')}
        >
          Saved Teams
        </button>
        <button
          className={`header-tab ${activeView === 'trainers' ? 'active' : ''}`}
          type="button"
          onClick={() => onNavigate('trainers')}
        >
          Trainers
        </button>
      </nav>

      <div className="header-summary">
        <span className="header-summary-label">Selected</span>
        <span className="header-summary-value">{teamCount}/6</span>
      </div>
    </header>
  )
}
