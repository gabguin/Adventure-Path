import { useState } from "react";
import { RewardComponent } from "./displayreward";
import { Header } from "../../components/header/header";
import { RewardDiv } from "../../components/rewardContainer/rewarddiv";
import './rewardpage.css'
export function RewardPage({setReward, reward}){
  const [openReward, setOpenReward] = useState(false);
  return(
    <>
    <Header></Header>
    <div>
       <button onClick={() => setOpenReward(true)}>add reward</button>
            {openReward && 
            <RewardComponent 
            setReward={setReward}
            setOpenReward={setOpenReward}>
              </RewardComponent>}
    </div>
    <div className="reward-page-div">
      {reward.map((item, index) => {
        return(
          <RewardDiv item={item} index={index} key={index} setReward={setReward}></RewardDiv>
        )
      })}
    </div>
    </>
  )
}