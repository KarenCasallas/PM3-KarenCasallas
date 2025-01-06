import { UserContext } from "../../context/UserContext";
import styles from "./AppointmentCard.module.css";
import { useContext } from "react";

function AppointmentCard({ appointment }) {

    const { id, date, time, status } = appointment;
    const {cancelAppointment} = useContext(UserContext);

    const handleCancel = async () =>{
        const response = await cancelAppointment(id);
        if(response.success){
            alert(response.message);
        }
        alert (response.message);
    }

    return (
        <div className={styles.card}>
            <h3>{id}</h3>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
            <p>Status: {status}</p>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    )
}

export default AppointmentCard;