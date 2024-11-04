import React, { useContext } from "react";
import CartContext from "../context/CartContext";
import CartItem from "./CartItem";
import styles from "../styles/cart.module.css";
import { NavLink } from "react-router-dom";

const Cart = () => {
    const { cart, clearCart, removeItem } = useContext(CartContext);
    console.log(cart); // Verifica el contenido del carrito

    if (cart.length === 0) {
        return (
            <div>
                <h1>No hay items en el carrito</h1>
                <NavLink to="/">Home</NavLink>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {cart.map(item => (
                <CartItem key={item.id} item={item} removeItem={removeItem} />
            ))}
            <button onClick={clearCart}>Limpiar carrito</button>
            <NavLink to="/checkout">Checkout</NavLink>
        </div>
    );
};

export default Cart;


// import React, { useContext } from "react"
// import CartContext from "../context/CartContext";// Importa CartContext correctamente
// import CartItem from "./CartItem"
// import styles from "../styles/cart.module.css"
// import { NavLink } from "react-router-dom"

// const Cart = () => {
//     const { cart, clearCart, totalQuantity, total } = useContext(CartContext)
//     console.log({ cart })

//     if(totalQuantity === 0) {
//         return (
//             <div>
//                 <h1>No hay items en el carrito</h1>
//                 <NavLink to={"/"}>Home</NavLink>
//             </div>
//         )
//     }

//     return (
//         <div>
//             { cart.map(p => <cartItem key={p.id} {...p}/>) }
//             <h2>Total: ${total}</h2>
//             <button onClick={() => clearCart()}>Limpiar carrito</button>
//             <NavLink to='/cheackout'>Cheackout</NavLink>
//         </div>
//     )

//     return (
//         <div className={styles.container}>
//             {cart.length ? (
//                 cart.map((cartItem) => {
//                     return <CartItem item={cartItem} key={cartItem.id} />;
//                 })
//             ) : (
//                 <>
//                     <h1>No hay productos en el cart</h1>
//                     <NavLink to={"/"}>Home</NavLink>
//                 </>
//             )}
//         </div>
//     );
// };

// export default Cart;
