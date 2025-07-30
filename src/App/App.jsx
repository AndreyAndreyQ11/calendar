import React, { useState, useEffect } from "react";
import s from "./App.module.css"

import Calendar from "./component/Calendar/Calendar.jsx";
import DateNavigator from "./component/DateNavigator/DateNavigator.jsx"
import getCalendarData from "./utils/getCalendarData.js"

export default function Lesson_5() {
    const [calendarData, setCalendarData] = useState([]);
    const [yearUser, setYearUser] = useState(2025);
    const [monthUser, setMonthUser] = useState("June");

    const onGetCalendarData = () => {
        getCalendarData(yearUser)
            .then((data) => setCalendarData(data))
            .catch((err) => console.error("Ошибка загрузки календарных данных:", err));

    }

    useEffect(() => {
        onGetCalendarData()
    }, [yearUser]);


    return (
        <div className={s.container}>
            <Calendar
                calendarData={calendarData}
                yearUser={yearUser}
                monthUser={monthUser}
                onGetCalendarData={onGetCalendarData}
            />
            <DateNavigator yearUser={yearUser}
                setYearUser={setYearUser}
                monthUser={monthUser}
                setMonthUser={setMonthUser} />
        </div>
    );
}

