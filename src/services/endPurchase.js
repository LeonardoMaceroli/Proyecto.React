import { addDoc, collection, doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const endPurchase = async (cart, customerData) => {
    const productsToUpdateRefs = [];

    for (const cartProduct of cart) {
        const productRef = doc(db, "products", cartProduct.id);
        productsToUpdateRefs.push({ ref: productRef, id: cartProduct.id });
    }

    const orderCollectionRef = collection(db, "orders");

    try {
        const result = await runTransaction(db, async (transaction) => {
            const stocksUpdated = [];

            for (const productToUpdate of productsToUpdateRefs) {
                const { ref } = productToUpdate;
                const product = await transaction.get(ref);
                if (!product.exists()) {
                    throw new Error("Product does not exist!");
                }

                const productInCart = cart.find(
                    (cartElement) => cartElement.id === product.id
                );

                const resultStock = product.data().stock - productInCart.quantity;

                if (resultStock < 0) {
                    throw new Error(
                        `Product: ${product.data().title}, doesn't have enough stock. Stock: ${product.data().stock}, quantity added to cart: ${productInCart.quantity}.`
                    );
                }

                stocksUpdated.push({
                    productId: product.id,
                    stock: resultStock,
                });
            }

            for (const product of productsToUpdateRefs) {
                const { ref, id } = product;
                const stockUpdated = stocksUpdated.find(
                    (stock) => stock.productId === id
                );
                transaction.update(ref, {
                    stock: stockUpdated.stock,
                });
            }

            const order = {
                products: cart,
                user: customerData,
                total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
                timestamp: serverTimestamp()
            };

            const docRef = await addDoc(orderCollectionRef, order);
            return { order: { id: docRef.id, ...order }, stocksUpdated };
        });

        return result;
    } catch (e) {
        throw e;
    }
};

export default endPurchase;
