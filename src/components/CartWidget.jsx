import cartIcon from '../assets/cart.svg'
import React, { useContext } from 'react'
import CartContext from '../context/CartContext'
import { NavLink } from 'react-router-dom'


const CartWidget = () => {
    const { totalQuantity } =useContext(CartContext)
    return (
        <NavLink to='/cart' style={{ display: totalQuantity > 0 ? 'block' : 'none'}}>
        <img src={cartIcon} alt='cart' style={{width: 40}}/>
        { totalQuantity }
        </NavLink>
    )
}

export default CartWidget