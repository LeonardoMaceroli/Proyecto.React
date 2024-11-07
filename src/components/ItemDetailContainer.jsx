import React, { useEffect, useState } from "react";
import products from "../assets/mockData.json";
import ItemDetail from "./ItemDetail";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        (async () => {

            try {
                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    setProduct({...docSnap.data(), id})
                } else {
                    console.log("No such document!");
                    navigate("/product-not-found");
                }

            } catch (error) {
                console.log("error fetching product:", error);
                navigate("/product-not-found")
            }
        })()

    }, [id, navigate])

    return product && <ItemDetail product={product} />
}
export default ItemDetailContainer;
