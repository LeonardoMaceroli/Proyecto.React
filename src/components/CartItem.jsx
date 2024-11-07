import React from "react";
import styles from "../styles/cartItem.module.css";

const CartItem = ({ item, removeItem }) => {
    return (
        <div className={styles.cartItem}>
            <img src={item.pictureUrl} alt={item.title} />
            <h1 className={styles.title}>{item.title}</h1>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeItem(item.id)}>Delete</button>
        </div>
    );
};

export default CartItem;
