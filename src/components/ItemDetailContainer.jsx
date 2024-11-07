import React, { useEffect, useState } from "react";
import products from "../assets/mockData.json";
import ItemDetail from "./ItemDetail";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        (async () => {
            setLoading(true)
            try {
                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct({...docSnap.data(), id})
                } else {
                    navigate("/product-not-found");
                }

            } catch (error) {
                navigate("/product-not-found")
            } finally {
                setLoading(false)
            }
        })()

    }, [id, navigate])

    return loading ? <h1>Loading..</h1> : product && <ItemDetail product={product} />
}
export default ItemDetailContainer;
