import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from 'styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
        <div className={styles.headerContainer}>
            <div className={styles.logo}>
                <NavLink to={process.env.PUBLIC_URL + "/home"}>
                <img src={process.env.PUBLIC_URL + "/logo.svg"} alt="Lab Logo" />
                </NavLink>
            </div>
            <nav className={styles.nav}>
                <NavLink to={process.env.PUBLIC_URL + "/home"} className={({ isActive }) => isActive ? styles.activeNavLink : styles.navLink}>Home</NavLink>
                <NavLink to={process.env.PUBLIC_URL + "/people"} className={({ isActive }) => isActive ? styles.activeNavLink : styles.navLink}>People</NavLink>
                <NavLink to={process.env.PUBLIC_URL + "/publications"} className={({ isActive }) => isActive ? styles.activeNavLink : styles.navLink}>Publications</NavLink>
                <NavLink to={process.env.PUBLIC_URL + "/photos"} className={({ isActive }) => isActive ? styles.activeNavLink : styles.navLink}>Photos</NavLink>
                <NavLink to={process.env.PUBLIC_URL + "/contact"} className={({ isActive }) => isActive ? styles.activeNavLink : styles.navLink}>Contact</NavLink>
            </nav>
        </div>
    </header>
  );
};

export default Header;
