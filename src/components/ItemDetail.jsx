import React, { useState, useEffect, useContext } from "react";
import ItemCount from "./ItemCount";
import CartContext from "../context/CartContext";
import { NavLink } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import styles from "../styles/ItemDetail.module.css";
import Swal from "sweetalert2";

const ItemDetail = ({ product }) => {
    const { addItem } = useContext(CartContext);
    const [itemCountVisibility, setItemCountVisibility] = useState(true);
    const [stock, setStock] = useState(null);
    const [totalPrice, setTotalPrice] = useState(product.price);

    const fetchStock = async () => {
        const productRef = doc(db, "products", product.id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
            setStock(productSnap.data().stock);
        }
    };

    useEffect(() => {
        fetchStock();
    }, [product.id]);

    const handleCart = (quantity) => {
        if (quantity > stock) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The quantity exceeds the available stock.',
            });
            return;
        }
        setItemCountVisibility(false);
        addItem(product, quantity);
        setTotalPrice(quantity * product.price);
        fetchStock(); // Vuelve a obtener el stock después de añadir al carrito
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>{product.title}</h1>
                <img className={styles.img} src={product.pictureUrl} alt={product.title} />
                <span className={styles.descr}>{product.description}</span>
                {stock !== null && <p className={styles.stock}>Stock available: {stock}</p>}
                <p className={styles.price}>Price: ${product.price}</p>
                {itemCountVisibility ? (
                    <ItemCount initial={1} stock={stock} onAdd={handleCart} />
                ) : (
                    <button>
                        <NavLink to="/cart">Go to cart</NavLink>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ItemDetail;
