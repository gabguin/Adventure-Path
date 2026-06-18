import './App.css'
import { HomePage } from './pages/homepage/homepage'
import { QuestPage } from './pages/quest/questpage'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
function App() {
  const [exp, setExp] = useState(0);
  const [quest, setQuest] = useState([]);
  useEffect(() => {
    const data = window.localStorage.getItem('quest-app');
    if(data) setQuest(JSON.parse(data))
  }, [])
  useEffect(() => {
    window.localStorage.setItem('quest-app', JSON.stringify(quest))
  },[quest])
  useEffect(() => {
    const expData = window.localStorage.getItem('exp-app');
    if(expData){
      setExp(JSON.parse(expData))
    }
  }, [])
  useEffect(() => {
    window.localStorage.setItem('exp-app', JSON.stringify(exp))
  }, [exp])
  return (
    <Routes>
    <Route index element={
      <HomePage 
    exp={exp} quest={quest} setQuest={setQuest}></HomePage>}></Route>
    <Route path='quest' element={
      <QuestPage
      quest={quest} setExp={setExp}>
      </QuestPage>}></Route>
    </Routes>
  )
}

export default App
