// import React, { useState, useContext } from "react";
// import ItemCount from "./ItemCount";
// import CartContext from "../context/CartContext";
// import { NavLink } from "react-router-dom";
// import styles from "../styles/ItemDetail.module.css";

// const ItemDetail = ({ product }) => {
//     const { addItem } = useContext(CartContext);
//     const [itemCountVisibility, setItemCountVisibility] = useState(true);

//     const handleCart = (quantity) => {
//         console.log(quantity);
//         setItemCountVisibility(false);
//         addItem(product, quantity);
//     };

//     return (
//         <div className={styles.container}>
//             <div className={styles.content}>
//                 <h1>Item Detail</h1>
//                 <img className={styles.img} src={product.pictureUrl} alt={product.title} style={{ width: 300 }} />
//                 <h1 className={styles.title}>{product.title}</h1>
//                 <span className={styles.descr}>{product.description}</span>
//                 {itemCountVisibility ? (
//                     <ItemCount initial={1} stock={product.stock} onAdd={handleCart} />
//                 ) : (
//                     <NavLink to='/cart' className={styles.goCartButton}>Go to cart</NavLink>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ItemDetail;


import React, { useState, useContext } from "react";
import ItemCount from "./ItemCount";
import CartContext from "../context/CartContext"; // Importa CartContext correctamente
import { NavLink } from "react-router-dom";
import styles from "../styles/ItemDetail.module.css";

const ItemDetail = ({ product }) => {
    const { addItem } = useContext(CartContext); // Usa CartContext en lugar de Cart
    const [itemCountVisibility, setItemCountVisibility] = useState(true);
    console.log(product);

    const handleCart = (quantity) => {
        console.log(quantity);
        setItemCountVisibility(false);
        addItem(product, quantity); // Usa la cantidad seleccionada
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Item detail</h1>
                <img className={styles.img} src={product.pictureUrl} style={{ width: 300 }} />
                <h1 className={styles.title}>{product.title}</h1>
                <span className={styles.descr}>{product.description}</span>
                {itemCountVisibility ? (
                    <ItemCount initial={1} stock={10} onAdd={handleCart} /> // Pasa `handleCart` directamente
                ) : (
                    <button>
                        <NavLink to={'/cart'}>Go cart</NavLink>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ItemDetail
