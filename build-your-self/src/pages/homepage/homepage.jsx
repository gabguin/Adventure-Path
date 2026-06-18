import { useState } from "react";
import { AddingQuest } from "../../components/addquest/addQuest";
import { LevelDisplay } from "../../components/levelup/levelUp";
import { Header } from "../../components/header/header";
import { Link } from "react-router-dom";
import { Routes, Route } from 'react-router-dom'
import "./homepage.css";
export function HomePage({ exp, quest, setQuest }) {
  const [openQuest, setOpenQuest] = useState(false);
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
      <div>
        <p>Quest in progress:</p>
      </div>
      <div className="quests-progress-div">
      {quest.map((item, index) => (

          <div className="quest-progress" key={index}>
            <Link to='/quest' className="quest-link">
              <div><p>Quest {index + 1} : {item.questName} </p></div>
              <div><p>Status: {item.status}</p></div>
              <div><p>Reward: {item.duration}xp</p></div>
              <div><p>{item.description}</p></div>
            </Link>
          </div>
      ))}
      </div>
    </>
  );
}