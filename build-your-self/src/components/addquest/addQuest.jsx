import './addQuest.css'
import { useState } from 'react';
import { Overlay } from '../overlay/overlay'
export function AddingQuest({ close, setQuest }) {
  const [questName, setQuestName] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  function addQuest() {
    if (!questName || !duration) return;
    setQuest(prev => [...prev, {
      questName,
      duration: Number(duration),
      description,
      status: "ongoing"
    }]);
    close();
  }
  return (
    <Overlay>
      <div className="quest-div">
        <h2>
          Quest
        </h2>
        <div>
          <input placeholder="quest name" onChange={(event) => setQuestName(event.target.value)}>
          </input>
        </div>
        <div>
          <input placeholder="duration" onChange={(event) => setDuration(event.target.value)}></input>
        </div>
        <div>
          <textarea placeholder='desription' onChange={(event) => setDescription(event.target.value)} />
        </div>
        <button className='quest-button' onClick={addQuest}>confirm</button>
        <div className='exit-div'>
          <button className='exit-button' onClick={close}>exit</button>
        </div>
      </div>
    </Overlay>
  )
}