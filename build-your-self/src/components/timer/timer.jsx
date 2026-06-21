import { useRef, useState, useEffect } from "react";
import "./timer.css";
import SettingsImage from "../../assets/settings-image.png";
import QuestPaper from "../../assets/quest-board-paper.png";

export function TimerQuest({
  quest,
  deleteThis,
  setExp,
  setQuest,
  setReward,
  index
}) {
  const storageKey = `timer-${quest.id}`;
  const [timer, setTimer] = useState(
    quest.duration ? quest.duration * 60 : 0
  );
  const [rewardGiven, setRewardGiven] = useState(false);
  const start = useRef(null);
  useEffect(() => {
    const data = localStorage.getItem(storageKey);
    if (data !== null) {
      setTimer(JSON.parse(data));
    }
  }, [storageKey]);
  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify(timer)
    );
  }, [timer, storageKey]);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const newSeconds =
    seconds < 10
      ? `0${seconds}`
      : seconds;
  const total =
    quest.duration
      ? quest.duration * 60
      : 0;
  const elapsed = total - timer;
  const degrees =
    total
      ? (elapsed / total) * 360
      : 0;
  useEffect(() => {
    if (timer !== 0 || rewardGiven) return;
    localStorage.removeItem(storageKey);
    setExp(prev =>
      prev + quest.duration
    );
    setReward(prev =>
      prev.map(item =>
        item.isActive
          ? {
            ...item,
            rewardExp:
              item.rewardExp +
              quest.duration
          }
          : item
      )
    );
    setQuest(prev =>
      prev.map((q, i) =>
        i === index
          ? {
            ...q,
            status: "finished"
          }
          : q
      )
    );
    setRewardGiven(true);
    clearInterval(start.current);
    start.current = null;
  }, [
    timer,
    rewardGiven,
    storageKey,
    quest.duration,
    index,
    setExp,
    setReward,
    setQuest
  ]);
  function startTimer() {
    start.current = setInterval(() => {
      setTimer(prev =>
        prev <= 0
          ? 0
          : prev - 1
      );
    }, 1);
  }
  function stopTimer() {
    clearInterval(start.current);
    start.current = null;
  }
  return (
    <div
      className="quest-in-progress"
      style={{
        backgroundImage: `url(${QuestPaper})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}
    >
      <p className="quest-name">
        Quest: {quest.questName}
      </p>
      <div
        className="timer-circle"
        style={{
          background: `conic-gradient(
            rgb(77, 75, 82)
            ${degrees}deg,
            #6b7dd5
            0deg
          )`
        }}
      >
        <div className="inside-circle">
          <p className="clock-time">
            {minutes}:{newSeconds}
          </p>
        </div>
      </div>
      <div>
        <span
          style={{
            fontSize: "25px"
          }}
        >
          +{quest.duration} exp
        </span>
      </div>
      <div className="buttons-timer">
        <button
          className="start-button"
          onClick={startTimer}
        >
          Start
        </button>
        <button
          className="stop-button"
          onClick={stopTimer}
        >
          Stop
        </button>
      </div>
      <div className="exit-button">
        <img
          className="setting-image"
          src={SettingsImage}
          onClick={() =>
            deleteThis(
              quest.id
            )
          }
        />
      </div>
      <div className="description-div">
        <p className="description-name">
          {quest.description}
        </p>
      </div>
    </div>
  );
}