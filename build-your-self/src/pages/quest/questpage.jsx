import { Header } from "../../components/header/header"
import { TimerQuest } from "../../components/timer/timer"
import './questpage.css'
export function QuestPage({quest, setExp, setQuest}) {
  function deleteThis(id) {
  setQuest(prev => prev.filter(q => q.id !== id));
  localStorage.removeItem(`timer-${id}`);
}
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
          deleteThis={deleteThis }
          ></TimerQuest>
        )
       })}
      </div>
    </>
  )
}