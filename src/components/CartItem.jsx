import React from "react";
import styles from "../styles/cartItem.module.css";

const CartItem = ({ item, removeItem }) => {
    return (
        <div className={styles.cartItem}>
            <img src={item.pictureUrl} alt={item.title} />
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <p>Precio: ${item.price}</p>
            <p>Cantidad: {item.quantity}</p>
            <button onClick={() => removeItem(item.id)}>Eliminar</button>
        </div>
    );
};

export default CartItem;


// import React from "react"
// import styles from "../styles/cartItem.module.css"

// const CartItem = ({ item }) => {
//     return (
//         <div className={styles.cartItem} >
//             <img src={item.pictureUrl} />
//             <h1>{item.title}</h1>
//             <p>{item.description}</p>
//             <p>{item.price}</p>
//             <p>{item.quantity}</p>
//             <button>Delete</button>
//         </div>
//     )
// }

// export default CartItem
