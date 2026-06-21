import { AddingQuest } from "../../components/addquest/addQuest";
import { LevelDisplay } from "../../components/levelup/levelUp";
import { Header } from "../../components/header/header";
import { Link } from "react-router-dom";
import { Routes, Route } from 'react-router-dom'
import { RewardComponent } from "../reward/displayreward";
import { QuestDiv } from "./questdiv";
import { RewardDiv } from "../../components/rewardContainer/rewarddiv";
import { BackgroundImage } from "../../components/background/background";
import TavernBackground from "../../assets/genshin-background.jpg"
import "./homepage.css";
export function HomePage({ exp, quest, reward }) {
  return (
    <div className="homepage-div">
      <div className="title-div">
    <h1 className="title">Adventure: Own Path </h1>
    </div>
    <BackgroundImage src={TavernBackground}></BackgroundImage>
      <Header></Header>
      <LevelDisplay exp={exp} />
      <div className="event-div"><p className="event-text">Events : </p></div>
      <div className="reward-display">
        {[0, 1].map((index) => (
          <Link to='/reward' key={index}>
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
        <Link to='/reward'>
        <div className="blank-card">
          see more rewards
        </div>
        </Link>
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