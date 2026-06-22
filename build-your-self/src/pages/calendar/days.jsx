import './days.css'
export function DaysOfTheMonth({month, year, days}){
  const numberOfDays = [];
  const blankCards = [];
  const currentMonthFirst = new Date(year, month, 1)
  const firstday = currentMonthFirst.getDay();
  function getNumberDays(month, year){
  const days = new Date(year, month + 1, 0)
  const day = days.getDate();
  return day;
  }
  const numberDays = getNumberDays(month,year)
  for(let i = 0; i < numberDays; i++){
    numberOfDays.push(i)
  }
   for(let i = 0; i < firstday; i++){
    blankCards.push("");
  }
  return(
    <div className="grid-div">
      {days.map((days,index) => {
      return (
        <p key={index}>{days}</p>
      )
    })}
        {blankCards.map((item, index) => {
        return(
          <p key={index}>{item}</p>
        )
      })}
      {numberOfDays.map((item, index) => {
        return(
          <p key={index}>{item + 1}</p>
        )
      })}
    </div>
  )
}
