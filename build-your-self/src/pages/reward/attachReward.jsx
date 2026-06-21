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
   <button onClick={() => startReward(item.id)}>
     {item.isActive
       ? "task ongoing"
       : "start this task"}
   </button>
 );
}