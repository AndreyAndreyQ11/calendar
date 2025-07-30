import { useState } from "react";
import patchDataOnServer from "../../../utils/patchDataOnServer.js";


import s from "./RenderDay.module.css"
import DeleteReminder from "./DeleteReminder.jsx"

export default function RenderDay({ day, dayNotFocused, onGetCalendarData }) {
    const [newTextRemider, setNewTextRemider] = useState("")
    const [changeTewextRemider, setChangeNewTextRemider] = useState({})

    const inputNewText = (el) => {
        setNewTextRemider(el.target.value);
    }

    const inputChangeText = (index, value) => {
        setChangeNewTextRemider(prev => ({
            ...prev,
            [index]: value
        }));
    };

    const onSendDataOnServer = (action, index = null) => {
        switch (action) {
            case "push":
                if (!newTextRemider.trim()) return;
                patchDataOnServer("push", day.id, newTextRemider)
                    .then(() => {
                        console.log("Успешная отправка календарных данных");
                        setNewTextRemider("");
                        onGetCalendarData();
                    })
                    .catch(err => console.error("Ошибка загрузки календарных данных:", err));
                break;

            case "change":
                patchDataOnServer("change", day.id, changeTewextRemider[index], index)
                    .then(() => {
                        console.log("Успешная отправка календарных данных");
                        onGetCalendarData();
                        setChangeNewTextRemider({});
                    })
                    .catch(err => console.error("Ошибка загрузки календарных данных:", err));
                break;

            case "delete":
                patchDataOnServer("delete", day.id, "", index)
                    .then(() => {
                        console.log("Успешная отправка календарных данных");
                        onGetCalendarData();
                        setChangeNewTextRemider({});
                    })
                    .catch(err => console.error("Ошибка загрузки календарных данных:", err));
                break;

            default:
                console.warn(`Неизвестное действие: ${action}`);
                break;
        }
    };

    const monthAndDay = (day) => {
        const [, month, dayNum] = day.split("_");
        return `${month} ${dayNum}`;
    };

    return (
        <div key={day.id}
            className={`${s.day} ${dayNotFocused ? "" : s.dayNotFocused}`}
        >
            <span>{monthAndDay(day.id)}</span>
            <div className={s.list}>

                {day.reminder.map((item, index) => (
                    <div key={item + index} className={s.items} >
                        <input
                            value={changeTewextRemider[index] ?? item}
                            onChange={(e) => inputChangeText(index, e.target.value)}
                            onBlur={() => onSendDataOnServer("change", index)}
                        />
                        <DeleteReminder
                            index={index}
                            onSendDataOnServer={onSendDataOnServer}
                        />
                    </div>
                ))}

                <div className={s.items} >
                    <input
                        placeholder="text..."
                        value={newTextRemider}
                        onChange={inputNewText}
                        onBlur={() => onSendDataOnServer("push")}
                    />
                </div>
            </div>
        </div >
    );
}