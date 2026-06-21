import './addQuest.css'
import { useState } from 'react';
import Book from '../../assets/Book-Page.jpg'
export function AddingQuest({ close, setQuest }) {
  const [questName, setQuestName] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
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
      <div className="quest-div" style={{backgroundImage : `url(${Book})`,
          backgroundSize: "cover", backgroundRepeat : "no-repeat", backgroundPosition: "center" }}>
        <h1>
          Quest
        </h1>
        <div>
          <input className='input-text' placeholder="Quest Name" onChange={(event) => setQuestName(event.target.value)}>
          </input>
        </div>
        <div>
          <input placeholder="Duration" className='input-text'  onChange={(event) => setDuration(event.target.value)}></input>
        </div>
        <div>
          <textarea placeholder='Desription' className='input-text'  onChange={(event) => setDescription(event.target.value)} />
        </div>
        <div>
        <button className='quest-button' onClick={addQuest}>confirm</button>
        </div>
        <div className='exit-div'>
          <button className='exit-button' onClick={close}>x</button>
        </div>
      </div>
  )
}