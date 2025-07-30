export default function generateCalendarData(yearUser) {
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

  const isLeapYear = (year) =>
    year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

  const getWeekDayName = (year, monthIndex, day) => {
    const date = new Date(year, monthIndex, day);
    return date.toLocaleString("en-US", { weekday: "long" });
  };

  const daysInMonth = {
    January: 31,
    February: isLeapYear(yearUser) ? 29 : 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  };

  const yearObject = { year: yearUser };

  months.forEach((monthName, monthIndex) => {
    const daysArray = [];

    for (let day = 1; day <= daysInMonth[monthName]; day++) {
      daysArray.push({
        id: `${yearUser}_${monthName}_${day}`,
        weekDayName: getWeekDayName(yearUser, monthIndex, day),
        reminder: [],
      });
    }

    yearObject[monthName] = daysArray;
  });

  // localStorage
  const existingData = JSON.parse(localStorage.getItem("calendarData")) || [];
  existingData.push(yearObject);
  existingData.sort((a, b) => a.year - b.year);
  localStorage.setItem("calendarData", JSON.stringify(existingData));

  return yearObject;
}
