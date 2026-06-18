import { useState } from "react";
import { AddingQuest } from "../../components/addquest/addQuest";
import { LevelDisplay } from "../../components/levelup/levelUp";
import {Routes, Route} from 'react-router'
import "./homepage.css";
export function HomePage() {
  const [exp, setExp] = useState(0);
  const [openQuest, setOpenQuest] = useState(false);
  const [quest, setQuest] = useState([]);
  return (
    <>
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
          <div className="quest-progress">
            <div>Quest {index + 1}</div>
            <div>{item.name}</div>
            <div>{item.description}</div>
            <div>{item.duration}</div>
          </div>
        </div>
      ))}
    </>
  );
}