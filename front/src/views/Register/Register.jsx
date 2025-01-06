import { useEffect, useState } from "react";
import styles from "./Register.module.css";
import validateRegister from "../../helpers/validateRegister";
import axios from "axios";

function Register(){

    const initialState = {
        name: "",
        email:"",
        birthdate:"",
        nDni:"",
        password:"",
        confirmPassword:"",
        userName:"",
    };

    const [form, setForm] = useState(initialState);
    const [errors,setErrors] = useState(initialState);
    const [touched, setTouched] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const errors = validateRegister(form);
        setErrors(errors);
        
        if (Object.keys(errors).length === 0) {

            try {
                const response = await axios.post("http://localhost:3000/users/register",form);
                alert(`El usuario ${response.data.name} ha sido registrado con éxito`)
            } catch (error){
                console.log(error);
                alert(error.data.message);
            }
        }    
    };

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        console.log(form[property]);
        
        setForm({
            ...form,
            [property]:value,
        });

        setTouched({
            ...touched,
            [property]:true,
        })
    };

    useEffect (() =>{
        const errors = validateRegister (form);
        setErrors(errors)
    }, [form]);
    
    return (
        <div className = {styles.register}>
            <h2>Formulario de registro</h2>
            <form onSubmit={handleSubmit} className = {styles.form}>
                {[
                    {label:"Name", type: "text", name:"name"},
                    {label:"Email", type: "email", name:"email"},
                    {label:"Nombre de usuario", type: "text", name:"userName"},
                    {label:"Contraseña", type: "password", name:"password"},
                    {label:"Confirmar contraseña", type: "password", name:"confirmPassword"},
                    {label:"Fecha de nacimiento", type: "date", name:"birthdate"},
                    {label:"Numero de DNI", type: "number", name:"nDni"}
                ].map(({ label, type, name}) => (
                    <div key={name}> 
                        <label>{label}</label>
                        <input type = {type} name = {name} value={form[name]} onChange={handleChange} className = {styles.input}></input>
                        {touched[name] && errors[name] && <p className = {styles.errors}>{errors[name]}</p>}
                    </div>
                ))}
                <button type = "submit">Enviar</button>
            </form>
        </div>
    );
}

export default Register;