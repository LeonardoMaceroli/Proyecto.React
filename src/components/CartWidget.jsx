import cartIcon from '../assets/cart.svg'
import React, { useContext } from 'react'
import CartContext from '../context/CartContext'
import { NavLink } from 'react-router-dom'
import styles from '../styles/cartwidget.module.css'; // Asegúrate de importar tu archivo CSS

const CartWidget = () => {
    const { totalQuantity } = useContext(CartContext);
    return (
        <NavLink to='/cart' className={styles.cartLink}>
            <img src={cartIcon} alt='cart' className={styles.cartIcon} />
            {totalQuantity > 0 && <span className={styles.cartQuantity}>{totalQuantity}</span>}
        </NavLink>
    );
}

export default CartWidget;
