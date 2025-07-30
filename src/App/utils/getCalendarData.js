import generateCalendarData from "./generateCalendarData.js";

export default function getCalendarData(yearUser) {
  return new Promise((resolve, reject) => {
    try {
      const data = JSON.parse(localStorage.getItem("calendarData")) || [];

      let selectedYears = [];
      for (let i = -1; i <= 1; i++) {
        const foundYear = data.find((el) => {
          return el.year === yearUser + i;
        });
        foundYear
          ? selectedYears.push(foundYear)
          : selectedYears.push(generateCalendarData(yearUser + i));
      }
      // Эмулятор задержки запроса
      setTimeout(() => {
        resolve(selectedYears);
      }, 200);
    } catch (error) {
      reject(error);
    }
  });
}
