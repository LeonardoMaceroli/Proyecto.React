import React from 'react'
import styles from '../styles/navbar.module.css'
import CartWidget from './CartWidget'
import Logo from './Logo'
import { Link, NavLink } from "react-router-dom"

const NavBar = () => {
    return (
        <nav>
            <ul className={styles.list}>
                <Logo
                    className={({ isActive }) => {
                        return isActive ? styles.isActive : styles.notActive
                    }}
                    to={"/"}>
                </Logo>
                <li>
                    <NavLink
                        className={({ isActive }) => {
                            return isActive ? styles.isActive : styles.notActive
                        }}
                        to={"/"}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => {
                            return isActive ? styles.isActive : styles.notActive
                        }}
                        to={"/category/jewelery"}
                    >
                        Jewelery
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => {
                            return isActive ? styles.isActive : styles.notActive
                        }}
                        to={"/category/electronics"}
                    >
                        Electronics
                    </NavLink>
                </li>
                <div className='cartposition'>
                    <CartWidget />
                </div>
            </ul>
        </nav>
    )
}

export default NavBar
