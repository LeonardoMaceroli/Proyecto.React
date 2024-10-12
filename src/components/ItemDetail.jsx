import React from "react"
import ItemCount from "./ItemCount"


const ItemDetail = ({ product }) => {
    console.log(product)

    return <div>
        <img src={product.pictureUrl} style={{width: 300}}/>
        <h1>{product.title}</h1>
        <span>{product.description}</span>
        <ItemCount initial={1} stock={10} onAdd={(quantity) => console.log('Cantidad agregada ', quantity)}/>
    </div>
}

export default ItemDetail
