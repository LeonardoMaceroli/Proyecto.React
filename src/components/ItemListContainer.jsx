import React, { useEffect, useState } from "react"
import mockProducts from "../assets/mockData.json"
import ItemList from "./ItemList"
import { useParams } from "react-router-dom"
import { db } from "../firebase/config"
import { collection, query, where, getDocs } from "firebase/firestore";

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(false);
    const { categoryId } = useParams();

    useEffect(() => {
        (async () => {

            try {
                let productsFiltered = []

                if (categoryId) {
                    const q = query(collection(db, "products"), where("category", "==", categoryId));

                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        productsFiltered.push({ id: doc.id, ...doc.data() })
                    });

                } else {
                    const querySnapshot = await getDocs(collection(db, "products"))
                    querySnapshot.forEach((doc) => {
                        console.log(`${doc.id} => ${JSON.stringify(doc.data(), null, 2)}`)
                        productsFiltered.push({ id: doc.id, ...doc.data() })
                    })
                }
                setProducts(productsFiltered)
            } catch (error) {
                console.log(error)
            }


        })()

    }, [categoryId])
    return <ItemList products={products} />
}

//     useEffect(() => {
//         const promise1 = new Promise((res, rej) => {
//             setTimeout(() => {
//                 res(mockProducts);
//             }, 2000);
//         });

//         const getProducts = async () => {
//             try {
//                 setLoading(true);
//                 const products = await promise1;
//                 let productsFiltered;
//                 if (categoryId) {
//                     productsFiltered = products.filter(
//                         (product) => product.category === categoryId
//                     );
//                 } else {
//                     productsFiltered = products;
//                 }
//                 setProducts(productsFiltered);
//                 setLoading(false);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         getProducts();
//     }, [categoryId]);

//     return loading ? (
//         <h1>Loading... </h1>
//     ) : (
//         <ItemList products={products} />
//     );
// };

export default ItemListContainer