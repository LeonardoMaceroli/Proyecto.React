import React, { useEffect, useState } from "react"
import mockProducts from "../assets/mockData.json"
import ItemList from "./ItemList"
import { useParams } from "react-router-dom"
import { db } from "../firebase/config"
import { collection, query, where, getDocs } from "firebase/firestore";

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { categoryId } = useParams();

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                let productsFiltered = []

                if (categoryId) {
                    const q = query(collection(db, "products"), where("category", "==", categoryId));

                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        productsFiltered.push({ id: doc.id, ...doc.data() })
                    });

                } else {
                    const querySnapshot = await getDocs(collection(db, "products"))
                    querySnapshot.forEach((doc) => {
                        productsFiltered.push({ id: doc.id, ...doc.data() })
                    })
                }
                setProducts(productsFiltered)
            } catch (error) {

            } finally {
                setLoading(false)
            }


        })()
    }, [categoryId])
    return loading  ? <h1>Loading..</h1> : <ItemList products={products} />
}

export default ItemListContainer