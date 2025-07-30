export default function getRelativeDay(
  calendarData,
  yearUser,
  monthUser,
  direction,
  deyWeek
) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthIndex = months.indexOf(monthUser);
  let newMonth;
  let newYear;
  if (direction === "previous") {
    if (monthUser !== "January") {
      newMonth = months[monthIndex - 1];
      newYear = yearUser;
    } else {
      newMonth = "December";
      newYear = yearUser - 1;
    }

    const monthDays = calendarData.find((item) => item.year === newYear)[
      newMonth
    ];
    return monthDays[monthDays.length - 1 - deyWeek];
  }
  if (direction === "next") {
    if (monthUser !== "December") {
      newMonth = months[monthIndex + 1];
      newYear = yearUser;
    } else {
      newMonth = "January";
      newYear = yearUser + 1;
    }

    const monthDays = calendarData.find((item) => item.year === newYear)[
      newMonth
    ];
    return monthDays[deyWeek];
  }
}
