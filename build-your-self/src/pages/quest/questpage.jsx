import { Header } from "../../components/header/header"
import { TimerQuest } from "../../components/timer/timer"
import './questpage.css'
export function QuestPage({quest, setExp, setQuest}) {
  return (
    <>
      <Header></Header>
      <div className="quest-status">
       {quest.map((quest, index) => {
        return(
          <TimerQuest
          key={index}
          quest={quest}
          setExp={setExp}
          setQuest={setQuest}
          deleteThis={() => setQuest(prev => prev.filter((_, i) => i !== index ))}
          ></TimerQuest>
        )
       })}
      </div>
    </>
  )
}