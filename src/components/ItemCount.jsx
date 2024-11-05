import React, { useState } from "react";
import styles from "../styles/itemcount.module.css";

const ItemCount = ({ initial, stock, onAdd }) => {
    const [quantity, setQuantity] = useState(initial);

    const increment = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
        }
    };
    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.operators}>
                <button onClick={decrement}>-</button>
                <p>{quantity}</p>
                <button onClick={increment}>+</button>
            </div>
            <button className={styles.addcart} onClick={() => onAdd(quantity)}>Add to cart</button>
        </div>
    );
};

export default ItemCount;
