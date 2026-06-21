import './questdiv.css'
import ScrollPaper from "../../assets/scroll-paper.png"

export function QuestDiv({item, index}) {
  return (
    <div className="quest-progress" style={{backgroundImage : `url(${ScrollPaper})`,
    backgroundSize: "cover", backgroundRepeat : "no-repeat", backgroundPosition: "center" }}>
      <div><p>Quest {index + 1} :</p></div>
      <div style={{fontSize : '20px'}}><p> {item.questName} </p></div>
      <div><p>Status: {item.status}</p></div>
      <div><p>Reward: {item.duration}xp</p></div>
      <div><p>{item.description}</p></div>
    </div>
  )
}