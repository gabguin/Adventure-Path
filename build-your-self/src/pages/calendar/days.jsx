import "./days.css";
export function DaysOfTheMonth({changingDate, days, contributions = {}}) {
  const month = changingDate.month;
  const year = changingDate.year;
  function getNumberDays(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }
  const numberDays =
    getNumberDays(month, year);
  const firstday =
    new Date(year, month, 1).getDay();
  return (
    <div className="grid-div">
      {days.map((day, index) => (
        <p key={`day-${index}`}>
          {day}
        </p>
      ))}
      {Array(firstday)
        .fill("")
        .map((_, index) => (
          <p key={`blank-${index}`}></p>
      ))}
      {Array(numberDays)
        .fill("")
        .map((_, index) => {
          const dateKey =
            `${year}-${month + 1}-${index + 1}`;
          const exp =
            contributions[dateKey] || 0;
          const intensity =
            Math.min(exp / 100, 1);
          return (
            <p
              key={`date-${index}`}
              style={{
                backgroundColor:
                  exp > 0
                    ? `rgba(0, 180, 0, ${intensity})`
                    : "",
                color: "black"
              }}
            >
              {index + 1}
            </p>
          );
      })}
    </div>
  );
}