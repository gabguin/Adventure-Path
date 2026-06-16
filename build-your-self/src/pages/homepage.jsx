import { useState } from "react"
import { AddingQuest } from "../components/addQuest";
import { TimerQuest } from "../components/timer";
export function HomePage() {
  const [openQuest, setOpenQuest] = useState(false);
  const [quest, setQuest] = useState([]);

  return (
    <>
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
            ></TimerQuest>
          )
        })}
    </>
  )
}