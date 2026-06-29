import { useState } from "react";
import "./dailyRewards.css";

export function DailyQuest({ dailyquest, setOpenDaily, setExp, setReward }) {
  const [claimed, setClaimed] = useState(() => {
    const saved = localStorage.getItem("daily-claimed");
    if (!saved) return [];
    const { date, indices } = JSON.parse(saved);
    const today = new Date().toDateString();
    return date === today ? indices : [];
  });
  function handleClaim(index, exp) {
    if (claimed.includes(index)) return;
    const next = [...claimed, index];
    setClaimed(next);
    setExp((prev) => prev + exp);
    setReward((prev) =>
      prev.map((r) => ({
        ...r,
        rewardExp: r.isActive ? r.rewardExp + exp : r.rewardExp,
      })),
    );
    localStorage.setItem(
      "daily-claimed",
      JSON.stringify({
        date: new Date().toDateString(),
        indices: next,
      }),
    );
  }
  return (
    <div className="wiki">
      <div className="main-div">
        <h2 className="daily-quest-title">Daily Quest</h2>
        {dailyquest.map((quest, index) => (
          <div className="dailyquest-div" key={index}>
            <div>
              <img src={quest.img} style={{ width: "50px" }} />
            </div>
            <div>{quest.title}</div>
            <div>+ {quest.exp} exp</div>
            <button
              className={
                claimed.includes(index) ? "claimed-button" : "claim-button"
              }
              onClick={() => handleClaim(index, quest.exp)}
              disabled={claimed.includes(index)}
            >
              {claimed.includes(index) ? "claimed" : "claim"}
            </button>
          </div>
        ))}
        <button className="close-button" onClick={() => setOpenDaily(false)}>
          close
        </button>
      </div>
    </div>
  );
}
