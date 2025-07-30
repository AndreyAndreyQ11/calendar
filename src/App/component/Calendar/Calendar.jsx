
import s from "./Calendar.module.css"
import getRelativeDay from "../../utils/getRelativeDay.js"
import RenderDay from "./RenderDay/RenderDay.jsx"

export default function Calendar({ calendarData, yearUser, monthUser, onGetCalendarData }) {

    const renderCalendarMonth = (calendarData, yearUser, monthUser) => {
        const month = calendarData.find(item => item.year === yearUser)[monthUser];
        const weekDayCheck = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        const arrayMonth = []
        for (let week = 0, weekdayNumberInMonth = 0, previousDeyWeek = 0, nextDeyWeek = 0; week < 6; week++) {
            const arrayWeek = []

            for (let weekDayNumber = 0; weekDayNumber < 7; weekDayNumber++) {
                if (!month[weekdayNumberInMonth]) {
                    arrayWeek.push(<RenderDay
                        key={"week:" + week + "; weekDayNumber:" + weekDayNumber}
                        day={getRelativeDay(calendarData, yearUser, monthUser, "next", nextDeyWeek)}
                        dayNotFocused={false}
                        onGetCalendarData={onGetCalendarData}
                    />);
                    nextDeyWeek++
                    continue;
                }

                if (month[weekdayNumberInMonth].weekDayName === weekDayCheck[weekDayNumber]) {
                    arrayWeek.push(
                        <RenderDay
                            key={"week:" + week + "; weekDayNumber:" + weekDayNumber}
                            day={month[weekdayNumberInMonth]}
                            dayNotFocused={true}
                            onGetCalendarData={onGetCalendarData}
                        />);
                    weekdayNumberInMonth++
                    continue;
                }
                if (month[weekdayNumberInMonth].weekDayName !== weekDayCheck[weekDayNumber]) {
                    arrayWeek.unshift(
                        <RenderDay
                            key={"week:" + week + "; weekDayNumber:" + weekDayNumber}
                            day={getRelativeDay(calendarData, yearUser, monthUser, "previous", previousDeyWeek)}
                            dayNotFocused={false}
                            onGetCalendarData={onGetCalendarData}
                        />);
                    previousDeyWeek++
                    continue;
                }
            };

            arrayMonth.push(<div className={s.week} key={week}>{arrayWeek}</div>)
        };
        return arrayMonth;
    }

    return (
        <div className={s.calendar}>
            {(calendarData.length === 3)
                ? renderCalendarMonth(calendarData, yearUser, monthUser)
                : <div>Загрузка календаря...

                    {JSON.stringify(calendarData)}
                </div>
            }
        </div>
    );
}
