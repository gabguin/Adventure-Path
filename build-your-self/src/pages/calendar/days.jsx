import "./days.css";
import backGround from '../../assets/calendar-design.jpg'
export function DaysOfTheMonth({ changingDate, days, contributions = {} }) {
  const month = changingDate.month;
  const year = changingDate.year;
  function getNumberDays(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }
  const numberDays = getNumberDays(month, year);
  const firstday = new Date(year, month, 1).getDay();
  return (
    <div className="grid-div" style={{backgroundImage : `url(${backGround})`,
              backgroundSize: "cover", backgroundRepeat : "no-repeat", backgroundPosition: "center" }}>
      {days.map((day, index) => (
        <div key={`day-${index}`} className="days-calendar">
          {day}
        </div>
      ))}
      {Array(firstday)
        .fill("")
        .map((_, index) => (
          <div key={`blank-${index}`} />
        ))}
      {Array(numberDays)
        .fill("")
        .map((_, index) => {
          const dateKey = `${year}-${month + 1}-${index + 1}`;
          const exp = contributions[dateKey] || 0;
          const intensity = Math.min(exp / 100, 1);
          return (
            <div 
              key={`date-${index}`}
              className="date-cell"
              style={{
                backgroundColor:
                  exp > 0 ? `rgba(0, 180, 0, ${intensity})` : "",
                color: "black",
              }}
            >
              {index + 1}
            </div>
          );
        })}
    </div>
  );
}