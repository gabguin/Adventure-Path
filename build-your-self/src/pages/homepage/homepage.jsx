import { AddingQuest } from "../../components/addquest/addQuest";
import { LevelDisplay } from "../../components/levelup/levelUp";
import { Header } from "../../components/header/header";
import { Link } from "react-router-dom";
import { Routes, Route } from 'react-router-dom'
import { RewardComponent } from "../quest/reward-display/displayreward";
import { QuestDiv } from "./questdiv";
import { RewardDiv } from "../../components/rewardContainer/rewarddiv";
import { BackgroundImage } from "../../components/background/background";
import TavernBackground from "../../assets/genshin-background.jpg"
import "./homepage.css";
import Eye from "../../assets/eye-image.png"

export function HomePage({ exp, quest, reward }) {
  return (
    <div className="homepage-div">
      <div className="title-div">
    <h1 className="title">Adventure: Own Path </h1>
    </div>
    <BackgroundImage src={TavernBackground}></BackgroundImage>
      <Header></Header>
      <LevelDisplay exp={exp} />
      <div className="event-div">
        <div><p className="event-text" style={{marginBottom: '25px'}}>Main Events : </p></div>
      <div className="reward-display">
        {[0, 1].map((index) => (
          <Link to='/quest' key={index}>
          <div className="blank-card" >
            {reward[index] ? (
              <RewardDiv
                item={reward[index]}
                index={index}
              />
            ) : (
              <span className="add-a-reward">+</span>
            )}
          </div>
          </Link>
        ))}
        <Link to='/quest'>
        <div className="blank-card">
          <img src={Eye} className="eye-image"></img>
        </div>
        </Link>
      </div>
      </div>
      <div className="request-board">
        <p className="request-text">QUEST BOARD </p>
      </div>
      <div className="quests-progress-div">
        {quest.map((item, index) => (
          <Link to='/quest' className="quest-link" key={index}>
            <QuestDiv item={item} index={index}></QuestDiv>
          </Link>
        ))}
      </div>
    </div>
  );
}