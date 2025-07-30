import React from "react";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function DateNavigator({ yearUser, setYearUser, monthUser, setMonthUser }) {

    const handleMonthChange = (direction) => {
        const currentIndex = months.indexOf(monthUser);

        let newIndex = currentIndex + direction;
        let newYear = yearUser;

        if (newIndex < 0) {
            newIndex = 11;
            newYear -= 1;
        } else if (newIndex > 11) {
            newIndex = 0;
            newYear += 1;
        }

        setMonthUser(months[newIndex]);
        setYearUser(newYear);
    };

    const handleYearChange = (direction) => {
        setYearUser(prev => prev + direction);
    };

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "20px"
        }}>
            <button onClick={() => handleYearChange(-1)}>««</button>
            <button onClick={() => handleMonthChange(-1)}>«</button>

            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                {monthUser} {yearUser}
            </span>

            <button onClick={() => handleMonthChange(1)}>»</button>
            <button onClick={() => handleYearChange(1)}>»»</button>
        </div>
    );
}