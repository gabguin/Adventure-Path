import { useState } from "react";
import { AddingQuest } from "../../components/addquest/addQuest";
import { LevelDisplay } from "../../components/levelup/levelUp";
import { Header } from "../../components/header/header";
import { Link } from "react-router-dom";
import { Routes, Route } from 'react-router-dom'
import { RewardComponent } from "../../components/reward/reward";
import "./homepage.css";
export function HomePage({ exp, quest, setQuest, reward, setReward}) {
  const [openQuest, setOpenQuest] = useState(false);
  const [openReward, setOpenReward] = useState(false);
  return (
    <>
      <Header></Header>
      <LevelDisplay exp={exp} />
      <button onClick={() => setOpenQuest(true)}>
        Add Quest
      </button>
      {openQuest && (
        <AddingQuest
          close={() => setOpenQuest(false)}
          setQuest={setQuest}
        />
      )}
      <button onClick={() => setOpenReward(true)}>add reward</button>
      {openReward && 
      <RewardComponent 
      setReward={setReward}
      close={close} 
      setOpenReward={setOpenReward}>
        </RewardComponent>}
      {reward.map((item, index) => {
        return (
          <div key={index}>
            <img src={item.image}></img>
            <p>{item.price}</p>
            <p>{item.info}</p>
          </div>
        )
      })}
      <div>
        <p>Quest in progress:</p>
      </div>
      <div className="quests-progress-div">
      {quest.map((item, index) => (
          <Link to='/quest' className="quest-link" key={index}> 
          <div className="quest-progress">
              <div><p>Quest {index + 1} : {item.questName} </p></div>
              <div><p>Status: {item.status}</p></div>
              <div><p>Reward: {item.duration}xp</p></div>
              <div><p>{item.description}</p></div>
          </div>
             </Link>
      ))}
      </div>
    </>
  );
}