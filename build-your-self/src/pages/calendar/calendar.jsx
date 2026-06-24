import { useState } from "react";
import { DaysOfTheMonth } from "./days";
import { Header } from "../../components/header/header";
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
      <button
        onClick={() => {
          if (month === 0) {
            setMonth(11);
            setYear(prev => prev - 1);
            return;
          }
          setMonth(prev => prev - 1);
        }}
      >
        prev
      </button>
      <button
        onClick={() => {
          if (month === 11) {
            setMonth(0);
            setYear(prev => prev + 1);
            return;
          }
          setMonth(prev => prev + 1);
        }}
      >
        next
      </button>
      <h1>
        {calendarMonths[month]} {year}
      </h1>
      <DaysOfTheMonth
        changingDate={{ month, year }}
        days={days}
        contributions={contributions}
      />
    </>
  );
}