import { Header } from "../../components/header/header"
import { TimerQuest } from "../../components/timer/timer"
export function QuestPage({quest, setExp}) {
  return (
    <>
      <Header></Header>
      <div>
       {quest.map((quest, index) => {
        return(
          <TimerQuest
          key={index}
          quest={quest}
          setExp={setExp}
          ></TimerQuest>
        )
       })}
      </div>
    </>
  )
}