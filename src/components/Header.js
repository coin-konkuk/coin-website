import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from 'styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
        <div className={styles.headerContainer}>
            <div className={styles.logo}>
                <NavLink to={"/home"}>
                <img src={process.env.PUBLIC_URL + "/logo.svg"} alt="Lab Logo" />
                </NavLink>
            </div>
            <nav className={styles.nav}>
                <NavLink to={"/home"} className={({ isActive }) => isActive ? styles.activeNavLink : styles.navLink}>Home</NavLink>
                <NavLink to={"/people"} className={({ isActive }) => isActive ? styles.activeNavLink : styles.navLink}>People</NavLink>
                <NavLink to={"/publications"} className={({ isActive }) => isActive ? styles.activeNavLink : styles.navLink}>Publications</NavLink>
                <NavLink to={"/photos"} className={({ isActive }) => isActive ? styles.activeNavLink : styles.navLink}>Photos</NavLink>
                <NavLink to={"/contact"} className={({ isActive }) => isActive ? styles.activeNavLink : styles.navLink}>Contact</NavLink>
            </nav>
        </div>
    </header>
  );
};

export default Header;
