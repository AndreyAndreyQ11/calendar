import s from "./DeleteReminder.module.css"

export default function DeleteReminder({ index, onSendDataOnServer }) {


    return (
        <div className={s.deleteReminder}
            onClick={() => onSendDataOnServer("delete", index)}>
            -
        </div>
    );
}