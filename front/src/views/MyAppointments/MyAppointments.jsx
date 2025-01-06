import styles from "./MyAppointments.module.css";
import { useContext, useEffect} from "react";
import AppointmentCard from "../../components/AppointmentCard/Appointmentcard";
import { UserContext } from "../../context/UserContext";
import AppointmentForm from "../../components/AppointmentForm/AppointmentForm";


function MyAppointments(){
    const {user, userAppointments, getAllAppointmentsByUserId } = useContext(UserContext);
    
    useEffect(() => {
        if (user && user.id){
        getAllAppointmentsByUserId();
        }
    }, [user]);

    if (!user || !user.id){
        return <div>Loading user data...</div>
    }

    return (
        <div className={styles.appointmentViewport}>
            <AppointmentForm/>
                {userAppointments.length == 0 ? (
                <h2>No hay citas agendadas</h2>
                ) : (
                userAppointments.map((appoint) => 
                    <div className={styles.containerCard}> <AppointmentCard key={appoint.id} appointment={appoint}/> </div>)
                )}
        </div>
    );
}

export default MyAppointments; 