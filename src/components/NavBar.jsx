import React from 'react';
import styles from '../styles/navbar.module.css';
import CartWidget from './CartWidget';
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <ul className={styles.list}>
                <li className={styles.logo}>
                    <NavLink
                        className={({ isActive }) => isActive ? styles.isActive : styles.notActive}
                        to={"/"}
                    >
                        LM Shop
                    </NavLink>
                </li>
                <div className={styles.categories}>
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? styles.isActive : styles.notActive}
                        to={"/"}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? styles.isActive : styles.notActive}
                        to={"/category/men's clothing"}
                    >
                        Men's clothing
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? styles.isActive : styles.notActive}
                        to={"/category/women's clothing"}
                    >
                        Women's clothing
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? styles.isActive : styles.notActive}
                        to={"/category/jewelery"}
                    >
                        Jewelery
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? styles.isActive : styles.notActive}
                        to={"/category/electronics"}
                    >
                        Electronics
                    </NavLink>
                </li>
                </div>
                <div className={styles.cartposition}>
                    <CartWidget />
                </div>
            </ul>
        </nav>
    );
}

export default NavBar;
