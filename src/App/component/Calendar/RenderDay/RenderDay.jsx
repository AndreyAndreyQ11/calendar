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

        if (action === "push" && newTextRemider.trim()) {
            patchDataOnServer("push", day.id, newTextRemider)
                .then(() => {
                    console.log("Успешная отправка календарных данных");
                    setNewTextRemider("");
                    onGetCalendarData();
                })
                .catch(err => console.error("Ошибка загрузки календарных данных:", err));
            return;
        }
        if (action === "change") {
            patchDataOnServer("change", day.id, changeTewextRemider[index], index)
                .then(() => {
                    console.log("Успешная отправка календарных данных");
                    onGetCalendarData();
                    setChangeNewTextRemider({});
                })
                .catch(err => console.error("Ошибка загрузки календарных данных:", err));
            return;
        }
        if (action === "delete") {
            patchDataOnServer("delete", day.id, "", index)
                .then(() => {
                    console.log("Успешная отправка календарных данных");
                    onGetCalendarData();
                    setChangeNewTextRemider({});
                })
                .catch(err => console.error("Ошибка загрузки календарных данных:", err));
            return;
        }
    };

    return (
        <div key={day.id}
            className={`${s.day} ${dayNotFocused ? "" : s.dayNotFocused}`}
        >
            <span>{day.id}</span>
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