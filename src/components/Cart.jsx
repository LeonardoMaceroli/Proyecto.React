import React, { useContext } from "react"
import CartContext from "../context/CartContext"
import CartItem from "./CartItem"
import styles from "../styles/cart.module.css"
import { NavLink } from "react-router-dom"

const Cart = () => {
    const { cart, clearCart, removeItem, totalPrice } = useContext(CartContext);
    const handleClear = () =>
        clearCart();

    return (
        
        <div className={styles.container}>

            {
                <>
                {cart.map((cartItem) => {
                    return <CartItem item={cartItem} key={cartItem.id} removeItem={removeItem} />
                    })}
                </>

            }
            {
            cart.length > 0 ?
                <div className={styles.cartSummary}>
                    <button onClick={handleClear}>Clear cart</button>
                    <NavLink to="/checkout" className={styles.checkout}>End purchase</NavLink>
                    <h2>Total Price: ${totalPrice()}</h2>
                </div> :
                    <h1>There are no products in the cart</h1>
            }
            
        
        </div>
    )
}


export default Cart
