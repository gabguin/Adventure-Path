import { useRef, useState, useEffect } from "react"
import './timer.css'
export function TimerQuest({
  quest,
  deleteThis, setExp
}) {
  const [timer, setTimer] =
    useState(quest.duration ? quest.duration * 60 : 0);
  const [rewardGiven, setRewardGiven] =
    useState(false);
  const start = useRef(null);
  const minutes =
    Math.floor(timer / 60);
  const seconds =
    timer % 60;
  const newSeconds =
    seconds < 10
      ? "0" + seconds
      : seconds;
  const degrees =
    quest.duration
      ? (timer / (quest.duration * 60)) * 360
      : 0;
  useEffect(() => {
    if (timer === 0 && !rewardGiven) {
      setExp(prev => prev + quest.duration);
      setRewardGiven(true);
      clearInterval(start.current);
      start.current = null;
    }
  }, [timer, quest.duration, setExp, rewardGiven]);
  function startTimer() {
    start.current = setInterval(() => {
      setTimer(prev => {
        if (prev === 0) {
          return prev;
        }
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
      <div
        className='timer-circle'
        style={{
          background:
            `conic-gradient(
              rgb(63,107,210) ${degrees}deg,
              rgb(204,206,228) 0deg
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
        <p className="quest-name">
          {quest.questName}
        </p>
        <p className="description-name">
          {quest.description}
        </p>
      </div>
      <div>
        <button
          className='start-button'
          onClick={startTimer}
        >
          start
        </button>
        <button
          className='stop-button'
          onClick={stopTimer}
        >
          stop
        </button>
        <button className="delete-button" onClick={() => deleteThis()}>delete</button>
      </div>
      <div>
        +{quest.duration} exp
      </div>

    </div>
  )
}