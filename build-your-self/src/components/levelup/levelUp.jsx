import './levelUp.css'
import profilePic from '../../assets/profile-pic.jpg'
import { BackgroundImage } from '../background/background';
export function LevelDisplay({ exp }) {
  let level = 0
  let requiredExp = 50
  let remainingExp = exp
  while (remainingExp >= requiredExp) {
    remainingExp -= requiredExp
    level++
    requiredExp += 120
  }
  const percentage =
    (remainingExp / requiredExp) * 100
  return (
    <div className="levelup-div">
      <div
        className="levelup-circle"
        style={{
          background: `conic-gradient(
            #abff74 ${percentage * 3.6}deg,
            #362016 0deg
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
            <p className='text'>
            {remainingExp} / {requiredExp}
            </p>
          </div>
          <div>
            <p className='text'>
            {requiredExp - remainingExp}
            {" "}more until level up
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}