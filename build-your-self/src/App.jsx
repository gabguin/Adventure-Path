import './App.css'
import { HomePage } from './pages/homepage/homepage'
import { QuestPage } from './pages/quest/quest-display/questpage'
import { Route, Routes } from 'react-router-dom'
import { useSaveStorage } from './reusable/localstorage'
import { CalendarJsx } from './pages/calendar/calendar'
function App() {
  const [exp, setExp] = useSaveStorage("exp", 0);
  const [quest, setQuest] = useSaveStorage("quest", []);
  const [reward, setReward] = useSaveStorage("reward", []);

  return (
    <Routes>
      <Route index element={
        <HomePage
          exp={exp} quest={quest} setQuest={setQuest} reward={reward} setReward={setReward}></HomePage>}></Route>
      <Route path='/quest' element={
        <QuestPage
          quest={quest} setExp={setExp} setQuest={setQuest} setReward={setReward} reward={reward}>
        </QuestPage>}></Route>
      <Route path='/calendar' element={<CalendarJsx></CalendarJsx>}></Route>
    </Routes>
  )
}

export default App
