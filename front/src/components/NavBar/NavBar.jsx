import { Link, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const NavBar = () => {
    const {user, logout} = useContext (UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    return(
        <div className={styles.navbar}>
            <nav className={styles.navLinks}>
                <Link to='/'>HOME</Link>
                {user ? (
                    <>
                    <Link to='/appointments'>TURNOS</Link>
                    <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                <>
                <Link to='/register'>REGISTER</Link>
                <Link to='/login'>LOGIN</Link>
                </>
                )}
            </nav>
        </div>
    );    
};

export default NavBar;