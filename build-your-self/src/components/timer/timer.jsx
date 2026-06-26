import { useRef, useState, useEffect, useCallback } from "react";
import "./timer.css";
import SettingsImage from "../../assets/settings-image.png";
import QuestPaper from "../../assets/quest-board-paper.png";
export function TimerQuest({
  quest,
  deleteThis,
  setExp,
  setQuest,
  setReward,
  index,
  trackContribution
}) {
  
  const storageKey = `timer-${quest.id}`;
  const startEpochKey = `timer-epoch-${quest.id}`;
  const total = quest.duration * 60;
  const [timer, setTimer] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved !== null ? JSON.parse(saved) : total;
  });
  const rafRef = useRef(null);
  const rewardGiven = useRef(false);
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(timer));
  }, [timer, storageKey]);
  const tick = useCallback(() => {
    const epochStr = localStorage.getItem(startEpochKey);
    if (!epochStr) return; 
    const startEpoch = JSON.parse(epochStr);
    const initialRemaining = JSON.parse(
      localStorage.getItem(`${storageKey}-snapshot`) ?? String(total)
    );
    const elapsed = Math.floor((Date.now() - startEpoch) / 1000);
    const remaining = Math.max(0, initialRemaining - elapsed);
    setTimer(remaining);
    if (remaining > 0) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [startEpochKey, storageKey, total]);
  useEffect(() => {
    const epochStr = localStorage.getItem(startEpochKey);
    if (epochStr) {
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick, startEpochKey]);
  useEffect(() => {
    if (timer > 0 || rewardGiven.current) return;
    rewardGiven.current = true;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    localStorage.removeItem(storageKey);
    localStorage.removeItem(startEpochKey);
    localStorage.removeItem(`${storageKey}-snapshot`);
    setExp(prev => prev + quest.duration);
    trackContribution?.(quest.duration);
    setReward(prev =>
      prev.map(item =>
        item.isActive
          ? { ...item, rewardExp: item.rewardExp + quest.duration }
          : item
      )
    );
    setQuest(prev =>
      prev.map((q, i) =>
        i === index ? { ...q, status: "finished" } : q
      )
    );
  }, [timer, storageKey, startEpochKey, quest.duration, index, setExp, setReward, setQuest, trackContribution]);
  function startTimer() {
    if (localStorage.getItem(startEpochKey)) return; 
    localStorage.setItem(`${storageKey}-snapshot`, JSON.stringify(timer));
    localStorage.setItem(startEpochKey, JSON.stringify(Date.now()));
    rafRef.current = requestAnimationFrame(tick);
  }
  function stopTimer() {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    localStorage.removeItem(startEpochKey);
    localStorage.removeItem(`${storageKey}-snapshot`);
  }
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const newSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const elapsed = total - timer;
  const degrees = (elapsed / total) * 360;
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
      <p className="quest-name">Quest: {quest.questName}</p>
      <div
        className="timer-circle"
        style={{
          background: `conic-gradient(rgb(77,75,82) ${degrees}deg, #6b7dd5 0deg)`
        }}
      >
        <div className="inside-circle">
          <p className="clock-time">{minutes}:{newSeconds}</p>
        </div>
      </div>
      <span style={{ fontSize: "25px" }}>+{quest.duration} exp</span>
      <div className="buttons-timer">
        <button className="start-button" onClick={startTimer}>Start</button>
        <button className="stop-button" onClick={stopTimer}>Stop</button>
      </div>
      <div className="exit-button">
        <img
          className="setting-image"
          src={SettingsImage}
          onClick={() => deleteThis(quest.id)}
        />
      </div>
      <div className="description-div">
        <p className="description-name">{quest.description}</p>
      </div>
    </div>
  );
}