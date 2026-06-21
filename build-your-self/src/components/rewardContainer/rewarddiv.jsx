import { AttachReward } from "../../pages/quest/reward-display/attachReward";
import './rewarddiv.css'
export function RewardDiv({ item, index, setReward }) {
  return (
    <div className="display-reward-exp">
      <div className="rewards-div">
        <img className="reward-image" src={item.image} alt="" />
        <div className="info-reward">
          <p>{item.price}</p>
          <p>{item.info}</p>
          <AttachReward item={item} setReward={setReward} />
          <div className="reward-level-div">
            <div
              className="reward-current-level"
              style={{
                width: `${Math.min(
                  (item.rewardExp / item.requiredExp) * 100,
                  100
                )}%`
              }}
            />
          </div>
          <div>
            <p>Progress : {item.rewardExp} / {item.requiredExp}</p></div>
        </div>
      </div>
    </div>
  );
}