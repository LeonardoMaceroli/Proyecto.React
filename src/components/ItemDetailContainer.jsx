import React, { useEffect, useState } from "react";
import products from "../assets/mockData.json";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = () => {
            const productFound = products.find(product => product.id === parseInt(id, 10));
            setProduct(productFound);
        };
        
        setTimeout(fetchProduct, 1000); // Simula un retraso de 1 segundo
    }, [id]);

    return product ? (
        <ItemDetail product={product} />
    ) : (
        <p>Producto no encontrado</p>
    );
};

export default ItemDetailContainer;


// import React, { useEffect, useState } from "react"
// import products from "../assets/mockData.json"
// import ItemDetail from "./ItemDetail"
// import { useParams } from "react-router-dom"

// const ItemDetailContainer = () => {
//     const [product, setProduct] = useState(null)
//     const {id} = useParams()

//     useEffect(() => {
//         const productFound = products.find(product => product.id === Number(id))
//         setProduct(productFound)
//     }, [id])

//     return product && <ItemDetail product={product}/>
// }

// export default ItemDetailContainer
