import validateLogin from "../../helpers/validateLogin";
import styles from "./login.module.css";
import {ErrorMessage, Field, Formik, Form} from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function Login(){
    const {login} = useContext(UserContext);
    const navigate = useNavigate();
    
    const initialState = {
        userName:"",
        password:"",
    };
    
    const handleSubmit = async (values) => {
        const response = await login(values);
        if (response.success) {
            return navigate("/");
        }
        
        alert (response.message);
    };

    return (

        <div className = {styles.login}>
            <h2>Login</h2>
            <Formik 
                initialValues={initialState} 
                validate={validateLogin} 
                onSubmit={handleSubmit}>
                    <Form className={styles.form}>
                        <label>Nombre de usuario</label>
                        <Field type = 'text' name = 'userName' placeholder = 'Ejemplo'/>
                        <ErrorMessage name='userName' component='p' style={{color:'orangered'}}/>

                        <label>Contraseña</label>
                        <Field type = 'password' name = 'password' placeholder = '******' />
                        <ErrorMessage name='password' component='p' style={{color:'orangered'}} />

                        <button type = 'submit'>Enviar</button>
                    </Form>

            </Formik>
        </div>
    );
}

export default Login;