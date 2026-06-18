import { useState } from "react"
import { AddingQuest } from "../components/addQuest";
import { TimerQuest } from "../components/timer";
import { LevelDisplay } from "../components/levelUp";
export function HomePage() {
  const[exp, setExp] = useState(0);
  const [openQuest, setOpenQuest] = useState(false);
  const [quest, setQuest] = useState([]);

  return (
    <>
    <LevelDisplay exp={exp}></LevelDisplay>
      <button
        onClick={() => setOpenQuest(true)}>
        Add Quest
      </button>
      {openQuest &&
        <AddingQuest
          close={() =>
            setOpenQuest(false)
          }
          setQuest={setQuest}
        />
}
      {quest.map((quest, index) => {
          return (
            <TimerQuest
              key={index}
              questName={quest.questName}
              duration={quest.duration}
              description={quest.description}
              setExp={setExp}
              deleteThis={ () =>
                setQuest(prev => prev.filter((_, i) => i !== index))
              }
            ></TimerQuest>
          )
        })}
    </>
  )
}