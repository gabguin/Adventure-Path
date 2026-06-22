import { useState } from "react";
import { DaysOfTheMonth } from "./days";
export function CalendarJsx(){
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const calendarMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', ]
  const displayMonth = calendarMonths[month];
  return(
    <>
     <button onClick={() => {
      if(month === 0){
        setYear(prev => prev - 1);
        setMonth(11);
        return;
      }
      setMonth(prev => prev - 1);
    }}>prev</button>
    <button onClick={() => {
      if(month === 11){
        setYear(prev => prev + 1);
        setMonth(0);
        return;
      }
      setMonth(prev => prev + 1);
      console.log(month);
    }}>next</button>
    {year} {displayMonth}
    <DaysOfTheMonth month={month} year={year} days={days}></DaysOfTheMonth>
    </>
  )
}