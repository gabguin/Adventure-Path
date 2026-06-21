import { useState } from "react";
import { RewardComponent } from "./displayreward";
import { RewardDiv } from "../../../components/rewardContainer/rewarddiv";
import './rewardpage.css'
import { Overlay } from "../../../components/overlay/overlay";
export function RewardPage({ setReward, reward }) {
  const [openReward, setOpenReward] = useState(false);
  return (
    <div className="rewardDisplay-div">
      <div><h1 className="title-quest"> Welcome to Events & Rewards</h1></div>
      <div className="reward-page-div">
        {reward.map((item, index) => {
          return (
            <div className="card" key={item.id} >
            <RewardDiv item={item} index={index} setReward={setReward}></RewardDiv>
            </div>
          )
        })}
      </div>
      <div style={{display : 'flex', justifyContent: 'center'}}>
       <button  className='add-reward-button' onClick={() => setOpenReward(true)}>+Add reward</button>
      {openReward &&
      <Overlay>
        <RewardComponent
          setReward={setReward}
          setOpenReward={setOpenReward}>
        </RewardComponent>
        </Overlay>}
        </div>
    </div>
  )
}