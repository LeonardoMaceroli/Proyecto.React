import React from "react"
import ItemCount from "./ItemCount"
import styles from "../styles/itemdetail.module.css"


const ItemDetail = ({ product }) => {
    console.log(product)

    return <div className={styles.container}>
        <div className={styles.content}>
        <img className={styles.img} src={product.pictureUrl} style={{width: 300}}/>
        <h1 className={styles.title}>{product.title}</h1>
        <span className={styles.descr}>{product.description}</span>
        <ItemCount initial={1} stock={10} onAdd={(quantity) => console.log('Cantidad agregada ', quantity)}/>
        </div>
    </div>
}

export default ItemDetail


