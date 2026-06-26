import { useState } from "react";
import { AttachReward } from "../../pages/quest/reward-display/attachReward";
import './rewarddiv.css'

export function RewardDiv({ item, index, setReward, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

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
            <p>Progress : {item.rewardExp} / {item.requiredExp}</p>
          </div>

          {!confirmDelete ? (
            <button
              className="delete-btn"
              onClick={() => setConfirmDelete(true)}
            >
              Delete
            </button>
          ) : (
            <div className="confirm-delete">
              <p>Are you sure?</p>
              <button
                className="confirm-yes"
                onClick={() => onDelete(index)}
              >
                Yes
              </button>
              <button
                className="confirm-no"
                onClick={() => setConfirmDelete(false)}
              >
                No
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}