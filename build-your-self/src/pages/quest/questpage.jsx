import { Header } from "../../components/header/header"
import { TimerQuest } from "../../components/timer/timer"
import { useState } from "react";
import { AddingQuest } from "../../components/addquest/addQuest";
import './questpage.css'
import QuestBoard from '../../assets/quest-board.jpg'
import { BackgroundImage } from "../../components/background/background";
export function QuestPage({ quest, setExp, setQuest, setReward }) {
  const [openQuest, setOpenQuest] = useState(false);
  function deleteThis(id) {
    setQuest(prev => prev.filter(q => q.id !== id));
    localStorage.removeItem(`timer-${id}`);
  }
  return (
    <>
      <Header></Header>
      <BackgroundImage src={QuestBoard}></BackgroundImage>
      <div className="questpage-div">
        <button onClick={() => setOpenQuest(true)}>
          Commisssion a quest
        </button>
        {openQuest && (
          <AddingQuest
            close={() => setOpenQuest(false)}
            setQuest={setQuest}
          />
        )}
        <div className="quest-status">
          {quest.map((quest, index) => {
            return (
              <TimerQuest
                key={index}
                quest={quest}
                setExp={setExp}
                setQuest={setQuest}
                deleteThis={deleteThis}
                setReward={setReward}
              ></TimerQuest>
            )
          })}
        </div>
      </div>
    </>
  )
}