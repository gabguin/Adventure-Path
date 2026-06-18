import { useRef, useState, useEffect } from "react";
import "./timer.css";
import SettingsImage from "../../assets/settings-image.png";

export function TimerQuest({
  quest,
  deleteThis,
  setExp,
  setQuest,
  index
}) {
  const storageKey = `timer-${quest.id}`;

  const [timer, setTimer] = useState(
    quest.duration ? quest.duration * 60 : 0
  );

  const [rewardGiven, setRewardGiven] = useState(false);
  const start = useRef(null);

  useEffect(() => {
    const data = window.localStorage.getItem(storageKey);
    if (data) setTimer(JSON.parse(data));
  }, [storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(timer));
  }, [timer, storageKey]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const newSeconds = seconds < 10 ? "0" + seconds : seconds;

  const total = quest.duration ? quest.duration * 60 : 0;
  const elapsed = total - timer;
  const degrees = total ? (elapsed / total) * 360 : 0;

  useEffect(() => {
    if (timer === 0 && !rewardGiven) {
      setExp(prev => prev + quest.duration);

      setQuest(prev =>
        prev.map((q, i) =>
          i === index ? { ...q, status: "finished" } : q
        )
      );

      setRewardGiven(true);
      clearInterval(start.current);
      start.current = null;
    }
  }, [
    timer,
    rewardGiven,
    quest.duration,
    setExp,
    setQuest,
    index
  ]);

  function startTimer() {
    start.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1);
  }

  function stopTimer() {
    clearInterval(start.current);
    start.current = null;
  }

  return (
    <div className="quest-in-progress">
      <p className="quest-name">
        Quest : {quest.questName}
      </p>

      <div
        className="timer-circle"
        style={{
          background: `conic-gradient(
            rgb(204,206,228) ${degrees}deg,
            rgb(63,107,210) 0deg
          )`
        }}
      >
        <div className="inside-circle">
          <p className="clock-time">
            {minutes}:{newSeconds}
          </p>
        </div>
      </div>

      <div>+{quest.duration} exp</div>

      <div>
        <button className="start-button" onClick={startTimer}>
          start
        </button>

        <button className="stop-button" onClick={stopTimer}>
          stop
        </button>
      </div>

      <div className="exit-button">
        <img className="setting-image" src={SettingsImage} />
        <div className="delete-div">
          <button
            className="delete-button"
            onClick={() => deleteThis(quest.id)}
          >
            remove
          </button>
        </div>
      </div>

      <div className="description-div">
        <p className="description-name">
          {quest.description}
        </p>
      </div>
    </div>
  );
}