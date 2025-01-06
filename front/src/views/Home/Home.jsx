import styles from "./Home.module.css";

const Home = () => {
     
    return(
        <main className={styles.home}>
            <div className={styles.tarjeta}>
                <h1>Bienvenido a Bancomercio turno virtual</h1>
                <p>Podrás agendar turnos para agilizar atencion en oficinas</p>
            </div>
        </main>
    );    
};

export default Home;