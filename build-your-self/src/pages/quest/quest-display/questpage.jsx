import { Header } from "../../../components/header/header"
import { TimerQuest } from "../../../components/timer/timer"
import { useState } from "react";
import { AddingQuest } from "../../../components/addquest/addQuest";
import './questpage.css'
import QuestBoard from './../../../assets/quest-board.jpg'
import { BackgroundImage } from "../../../components/background/background";
import { RewardPage } from "../reward-display/rewardpage";
import { Overlay } from "../../../components/overlay/overlay";
export function QuestPage({
  quest,
  setExp,
  setQuest,
  setReward,
  reward,
  trackContribution
}) {
  const [openQuest, setOpenQuest] = useState(false);
  function deleteThis(id) {
    setQuest(prev => prev.filter(q => q.id !== id));
    localStorage.removeItem(`timer-${id}`);
  }
  return (
    <>
      <Header />
      <BackgroundImage src={QuestBoard} />
      <RewardPage
        setReward={setReward}
        reward={reward}
      />
      <div className="questpage-div">
        <div className="quest-status">
          {quest.map((quest, index) => (
            <TimerQuest
              key={quest.id}
              quest={quest}
              setExp={setExp}
              setQuest={setQuest}
              deleteThis={deleteThis}
              setReward={setReward}
              index={index}
              trackContribution={trackContribution}
            />
          ))}
        </div>
         <div className="commission-div">
        <button onClick={() => setOpenQuest(true)} className="commission-button">
          Commission a quest
        </button>
        </div>
      </div>
      {openQuest && (
        <Overlay>
          <AddingQuest
            close={() => setOpenQuest(false)}
            setQuest={setQuest}
          />
        </Overlay>
      )}
      
    </>
  );
}