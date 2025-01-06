import { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext({
    user:[],
    userAppointments: [],
});

export function UserProvider({children}) {
    const [user, setUser]= useState(null);
    const [userAppointments, setUserAppointments]= useState([]);

    const login = async(userData) => {
        try{
            const response = await axios.post("http://localhost:3000/users/login", userData);

            if (response.data.login){
                setUser(response.data.user);
                setUserAppointments(response.data.user.appointments);
                return {success:true, data: response.data.user};
            }

            return {success:false, message: response.data.message};

        } catch(error) {
            console.log(error);
            return {success:false, message: error.response.data.message};
        }
    };

    const logout = () =>{
        setUser(null);
    };

    const getAllAppointmentsByUserId = async () => {
        if (!user || !user.id) {
            console.warn("El usuario no se encuentra registrado");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/appointments/${user.id}`);
            setUserAppointments(response.data);
            } catch (error) {
                console.error(error);
            }
    };

    const createAppointment = async (userData) => {
        if (!user || !user.id) {
            console.warn("El usuario no se encuentra registrado");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3000/appointments/schedule`, {...userData, userId: user.id});
            setUserAppointments([...userAppointments,response.data]);
            alert(`Su cita fue agendada con éxito`);
            } catch (error) {
                console.error(error);
            }
    };

    const cancelAppointment = async(id) => {
        try {
            const response = await axios.put(`http://localhost:3000/appointments/cancel/${id}`);
            setUserAppointments((prevState) => prevState.map((elem)=>{
                if (elem.id == id){
                    elem.status = "cancelled";
                }
                return elem;
            }))
            return {success:true, message:response.data.message};
        } catch(error){
            console.error(error);
            return {success:false, message:error.response.data.message};
        }
    }

    const value = {
        user,
        userAppointments,
        login,
        logout,
        getAllAppointmentsByUserId,
        createAppointment,
        cancelAppointment,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
