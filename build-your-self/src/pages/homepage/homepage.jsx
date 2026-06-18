import { useState } from "react";
import { AddingQuest } from "../../components/addquest/addQuest";
import { LevelDisplay } from "../../components/levelup/levelUp";
import { Header } from "../../components/header/header";
import { Link } from "react-router-dom";
import {Routes, Route} from 'react-router-dom'
import "./homepage.css";
export function HomePage({exp, quest, setQuest}) {
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
      {quest.map((item, index) => (
        <div
          key={index}
          className="quests-progress-div"
        >
        <Link to='/quest' className="quest-link">
          <div className="quest-progress">
            <div>Quest {index + 1}</div>
            <div>{item.name}</div>
            <div>{item.description}</div>
            <div>{item.duration}</div>
          </div>
        </Link>
        </div>
      ))}
    </>
  );
}