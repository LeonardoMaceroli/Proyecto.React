import React from 'react'
import '../styles/navbar.css'
import CartWidget from './CartWidget'
import Logo from './Logo'

const navBar = () => {
    return (
        <ul>
            <Logo/>
            <li><a className="active" href="#home">Home</a></li>
            <li><a href="news">News</a></li>
            <li><a href="contact">Contact</a></li>
            <li><a href="about">About</a></li>
            <div className='cartposition'>
            <CartWidget/>
            </div>
        </ul>
    )
}

export default navBar