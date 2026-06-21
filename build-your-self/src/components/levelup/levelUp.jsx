import './levelUp.css'
import profilePic from '../../assets/profile-pic.webp'
import { BackgroundImage } from '../background/background';
export function LevelDisplay({ exp }) {
  let level = 0
  let requiredExp = 25
  let remainingExp = exp
  while (remainingExp >= requiredExp) {
    remainingExp -= requiredExp
    level++
    requiredExp += 150
  }
  const percentage =
    (remainingExp / requiredExp) * 100
  return (
    <div className="levelup-div">
      <div
        className="levelup-circle"
        style={{
          background: `conic-gradient(
            #f5ad80 ${percentage * 3.6}deg,
            #341f16 0deg
          )`
        }}
      >
        <div className="inside-circle">
          <img
            src={profilePic}
            className="profile-pic"
            alt=""
          />
        </div>
      </div>
      <div className='levelstatus-div'>
        <div><p className='name'> Gabbi lvl. {level}</p></div>
        <div className="level-div">
          <div
            className="level-status"
            style={{
              width: `${percentage}%`
            }}
          />
        </div>
        <div className="level-up">
          <div>
            {remainingExp} / {requiredExp}
          </div>
          <div>
            {requiredExp - remainingExp}
            {" "}more until level up
          </div>
        </div>
      </div>
    </div>
  )
}