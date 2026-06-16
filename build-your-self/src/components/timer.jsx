import { useRef, useState } from "react"
import './timer.css'
export function TimerQuest({questName, description, duration}) {
  const [timer, setTimer] = useState(duration ? duration * 60: 0);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const newSeconds = seconds < 10 ? "0" + seconds : seconds
  const start = useRef(null);
  const degrees =duration? (timer / (duration * 60)) * 360 : 0;
  function startTimer() {
    if (start.current) return;
    start.current = setInterval(() => {
      setTimer((prev) => {
        if(prev === 0){
          clearInterval(start.current);
          return prev;
        }
        return prev - 1;
      })
    }, 1000);
  }
  function stopTimer() {
    clearInterval(start.current);
    start.current = null;
  }
  return (
    <div className="quest-in-progress">
        <div className='timer-circle' style={{
          background: `conic-gradient(
          rgb(63, 107, 210) ${degrees}deg,
          rgb(204, 206, 228) 0deg)`}}>
          <div className="inside-circle">
            <div><p className="clock-time">{minutes} : {newSeconds}</p></div>
          </div>
        </div>
        <div>
          <div><p className="quest-name">{questName}</p></div>
          <div><p className="description-name">{description}</p></div>
        </div>
        <div>
        <button className='start-button'onClick={() => startTimer()}>start</button>
        <button className='stop-button'onClick={() => stopTimer()}>stop</button>
        </div>
        <div>+{duration}exp</div>
      </div>
  )
}