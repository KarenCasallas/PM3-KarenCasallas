import './App.css'
import NavBar from './components/NavBar/NavBar';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import MyAppointments from './views/MyAppointments/MyAppointments';
import Register from './views/Register/Register';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';

function App() {
  return(
    <>
     <h1 className='logoContainer'>BANCOMERCIO</h1>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/appointments" element={<MyAppointments/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
        <Footer/>
    </>
  )
};

export default App
