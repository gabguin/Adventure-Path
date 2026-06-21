import './attachReward.css'
export function AttachReward({ item, setReward }) {
 function startReward(id){
   setReward(prev =>
     prev.map(reward =>
       reward.id === id
         ? { ...reward, isActive: true }
         : { ...reward, isActive: false }
     ));
 }
 return (
  <div className="attachReward-div">
   <button onClick={() => startReward(item.id)} className='button-task'>
     {item.isActive
       ? "Status : Ongoing"
       : "Start"}
   </button>
   </div>
 );
}