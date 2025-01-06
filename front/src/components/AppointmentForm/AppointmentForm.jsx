import { useContext } from "react";
import validateAppointmentForm from "../../helpers/validateAppointmentForm.js";
import styles from  "./AppointmentForm.module.css";
import {ErrorMessage, Field, Formik, Form} from "formik";
import { UserContext } from "../../context/UserContext";

function AppointmentForm() {

    const {createAppointment} = useContext (UserContext);

    const initialState = {
        date:"",
        time:"",
    };

    const handleSubmit = async (values) => {
        await createAppointment(values);
        
    };
        
    return (
    <Formik initialValues={initialState} validate={(values) => validateAppointmentForm(values)} onSubmit={handleSubmit}>
        <Form className={styles.form}>
        <label>Fecha</label>
        <Field type = 'date' name = 'date'/>
        <ErrorMessage name='date' component='p' className={styles.error}/>
        
        <label>Hora</label>
        <Field type = 'time' name = 'time' step = "900" min= "08:00" max= "18:00" required/>
        <ErrorMessage name='time' component='p' className={styles.error}/>

        <button type="submit">Agendar</button>

        </Form>    
    </Formik>

    );
};

export default AppointmentForm;