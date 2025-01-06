import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>&copy; 2024 Bancomercio. Todos los derechos reservados.</p>
            <p>Turno virtual para una atención ágil.</p>
        </footer>
    );
};

export default Footer;