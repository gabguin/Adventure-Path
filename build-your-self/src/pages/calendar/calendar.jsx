import { useState } from "react";
import { DaysOfTheMonth } from "./days";
import { Header } from "../../components/header/header";
import './calendar.css'
import leftArrow from '../../assets/left.png'
import rightArrow from '../../assets/right.png'
import { BackgroundImage } from "../../components/background/background";
import backGround from '../../assets/genshin-calendar.jpg'
export function CalendarJsx({ contributions }) {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const calendarMonths = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return (
    <>
    <Header></Header>
    <BackgroundImage src={backGround}></BackgroundImage>
    <div className="month-div">
      <h1 className="month-header">
        {calendarMonths[month]} {year}
      </h1>
    </div>
      <DaysOfTheMonth
        changingDate={{ month, year }}
        days={days}
        contributions={contributions}
      />
    
    <div className="button-div">
       <button onClick={() => {
          if (month === 0) {
            setMonth(11);
            setYear(prev => prev - 1);
            return;
          }
          setMonth(prev => prev - 1);
        }}
      >
        <img src={leftArrow}/>
      </button>
      <button onClick={() => {
          if (month === 11) {
            setMonth(0);
            setYear(prev => prev + 1);
            return;
          }
          setMonth(prev => prev + 1);
        }}
      >
        <img src={rightArrow}/>
      </button>
     </div>
    </>
  );
}