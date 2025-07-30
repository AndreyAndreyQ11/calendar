export default function patchDataOnServer(action, dayId, value, index = null) {
  return new Promise((resolve, reject) => {
    try {
      // Эмулятор задержки обработки
      setTimeout(() => {
        const keys = dayId.split("_");
        const data = JSON.parse(localStorage.getItem("calendarData")) || [];
        const yearData = data.find((el) => el.year === Number(keys[0]));
        const monthData = yearData[keys[1]];
        const dayData = monthData.find((el) => el.id === dayId);

        switch (action) {
          case "push":
            dayData.reminder.push(value);
            break;
          case "change":
            dayData.reminder[index] = value;
            break;
          case "delete":
            dayData.reminder.splice(index, 1);
            break;
        }
        localStorage.setItem("calendarData", JSON.stringify(data));

        resolve("Успешная отправка календарных данных");
      }, 200);
    } catch (error) {
      reject(error);
    }
  });
}
