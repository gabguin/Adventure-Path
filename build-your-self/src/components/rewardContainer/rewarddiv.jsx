import { AttachReward } from "../../pages/reward/attachReward";
import './rewarddiv.css'
export function RewardDiv({ item, index, setReward }) {
  return (
    <div className="rewards-div" key={index}>
      <img className="reward-image" src={item.image} alt="" />
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
    </div>
  );
}