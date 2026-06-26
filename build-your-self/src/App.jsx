import './App.css'
import { HomePage } from './pages/homepage/homepage'
import { QuestPage } from './pages/quest/quest-display/questpage'
import { CalendarJsx } from './pages/calendar/calendar'
import { Route, Routes } from 'react-router-dom'
import { useSaveStorage } from './reusable/localstorage'

function App() {
  const [exp, setExp] = useSaveStorage("exp", 0);
  const [contributions, setContributions] = useSaveStorage("contributions", {} );
  const [quest, setQuest] = useSaveStorage("quest", []);
  const [reward, setReward] = useSaveStorage("reward",[]);
  function trackContribution(amount) {
    const now =
      new Date();
    const dateKey =
      `${now.getFullYear()}-${ now.getMonth() + 1}-${now.getDate()}`;
    setContributions(prev => ({...prev, [dateKey]: (prev[dateKey] || 0) + amount }));
  }
  return (
    <Routes>
      <Route
        index
        element={
          <HomePage
            exp={exp}
            quest={quest}
            setQuest={setQuest}
            reward={reward}
            setReward={setReward}
          />
        }
      />
      <Route
        path="/quest"
        element={
          <QuestPage
            quest={quest}
            exp={exp}
            setExp={setExp}
            trackContribution={
              trackContribution
            }
            setQuest={setQuest}
            reward={reward}
            setReward={setReward}
          />
        }
      />
      <Route
        path="/calendar"
        element={
          <CalendarJsx
            contributions={
              contributions
            }
          />
        }
      />
    </Routes>
  );
}
export default App;