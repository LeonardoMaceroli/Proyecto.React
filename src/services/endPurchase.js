
//chequear stock, verificar que sean validos contra la cantidad del cart, actualizar cantidades de todos los productos y generar la orden (todo esta englobado
//dentro de una transaction)

import { addDoc, collection, doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const endPurchase = async (cart, customerData) => {
    const productsToUpdateRefs = [];

    // Crear un array de referencias a todos los productos en el carrito.
    for (const cartProduct of cart) {
        const productRef = doc(db, "products", cartProduct.id);
        productsToUpdateRefs.push({ ref: productRef, id: cartProduct.id });
    }

    // Crear una referencia para la colección de órdenes
    const orderCollectionRef = collection(db, "orders");

    try {
        const order = await runTransaction(db, async (transaction) => {
            // Crear un array auxiliar para los stocks que se actualizarán
            const stocksUpdated = [];

            // 1. Verificar el stock válido de cada producto en el carrito
            for (const productToUpdate of productsToUpdateRefs) {
                const { ref } = productToUpdate;
                const product = await transaction.get(ref);
                if (!product.exists()) {
                    throw new Error("Product does not exist!");
                }
                console.log({ data: { ...product.data() } });

                // Producto en el carrito para conocer la cantidad en el carrito
                const productInCart = cart.find(
                    (cartElement) => cartElement.id === product.id
                );

                console.log({ productInCart });

                // Verificar el stock resultante
                const resultStock =
                    product.data().stock - productInCart.quantity;

                if (resultStock < 0) {
                    throw new Error(
                        `Product: ${product.data().title}, doesn't have enough stock. Stock: ${product.data().stock}, quantity added to cart: ${productInCart.quantity}.`
                    );
                }

                // Agregar el stock resultante al array auxiliar
                stocksUpdated.push({
                    productId: product.id,
                    stock: resultStock,
                });
            }

            // 2. Actualizar el stock de los productos (los procedimientos de escritura deben ser después de los procedimientos de lectura)
            for (const product of productsToUpdateRefs) {
                const { ref, id } = product;
                const stockUpdated = stocksUpdated.find(
                    (stock) => stock.productId === id
                );
                console.log({ stockUpdated });
                transaction.update(ref, {
                    stock: stockUpdated.stock,
                });
            }

            // 3. Crear la orden
            const order = {
                products: cart,
                user: customerData,
                total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
                timestamp: serverTimestamp()
            };

            await addDoc(orderCollectionRef, order);
            return order;
        });

        console.log("Order created successfully!", order);
    } catch (e) {
        // Cualquier throw en el bloque try será capturado aquí
        console.error("Error creating order: ", e);
        throw e;
    }
};

export default endPurchase;
