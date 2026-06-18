import './levelUp.css'
import profilePic from '../../assets/profile-pic.webp'
export function LevelDisplay({ exp }) {
  let requiredExp = 25;
  let remainingExp = exp;
  let level = 0;
  let levelUp = Math.ceil(exp / 50);
  while (remainingExp >= requiredExp) {
    requiredExp += 50 * levelUp;
    remainingExp = requiredExp - exp;
    level = level + levelUp;
  }
  const barPercentage = (exp / requiredExp) * 100;
  const circlePercentage = (exp / requiredExp) * 360;
  return (
    <div className='levelup-div'>
      <div className='levelup-circle' style={{
        background: `conic-gradient(
        red ${circlePercentage}deg,
        black 0deg)`}}>
        <div className='inside-circle'>
          <img src={profilePic} className='profile-pic'></img>
        </div>
      </div>
      <div>
        <div className='level-div'>
          <div className='level-status' style={{
            width: `${barPercentage}%`
          }} >
          </div>
        </div>
         <div className='level-up'>
            <div>{exp} / {requiredExp}</div>
            <div>{remainingExp} more until level up</div>
          </div>
      </div>
    </div>
  )
}