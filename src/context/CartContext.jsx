// import { createContext, useContext, useState } from "react";

// // 1. Crear el contexto
// const CartContext = createContext();

// // 2. Crear el componente que va a proveer ese contexto <NombreProvider>
// export const CartProvider = ({ children }) => {
//     const [cart, setCart] = useState([]);

//     const addItem = (item, quantity) => { 
//         setCart(prevCart => { const existingItem = prevCart.find(prod => prod.id === item.id); 
//             if (existingItem) { 
//                 return prevCart.map(prod => 
//                     prod.id === item.id ? { ...prod, quantity: prod.quantity + quantity } : prod 
//                 ); 
//             } else { 
//                 return [...prevCart, { ...item, quantity }]; } }); };

//     const removeItem = (itemId) => {
//         const cartUpdated = cart.filter(prod => prod.id !== itemId);
//         setCart(cartUpdated);
//     };

//     const clearCart = () => {
//         setCart([]);
//     };

//     const isInCart = (itemId) => {
//         return cart.some(prod => prod.id === itemId);
//     };

//     return (
//         <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// export default CartContext;


// import { createContext, useContext, useState } from "react";

// //1. Crear el contexto
// const CartContext = createContext();

// //2. Crear el componente que va a proveer ese contexto <NombreProvider>
// export const CartProvider = ({ children }) => {
//     const [cart, setCart] = useState([]);
//     // const [quantity, setQuantity] = useState(0);

//     console.log(cart);

//     const addItem = (item, quantity) => {
//         if (!isInCart(item.id)) {
//             setCart(prev => [...prev, { ...item, quantity }]);
//         } else {
//             console.error('El producto ya fue agregado');
//         }
//     };

//     const removeItem = (itemId) => {
//         const cartUpdated = cart.filter(prod => prod.id !== itemId);
//         setCart(cartUpdated);
//     };

//     const clearCart = () => {
//         setCart([]);
//     };

//     const isInCart = (itemId) => {
//         return cart.some(prod => prod.id === itemId);
//     };

//     return (
//         <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// export default CartContext;




import { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto
const CartContext = createContext();

// Crear el componente que va a proveer ese contexto <CartProvider>
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);
        setTotalQuantity(quantity);
    }, [cart]);

    const addItem = (item, quantity) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(prod => prod.id === item.id);
            if (existingItem) {
                return prevCart.map(prod =>
                    prod.id === item.id ? { ...prod, quantity: prod.quantity + quantity } : prod
                );
            } else {
                return [...prevCart, { ...item, quantity }];
            }
        });
    };

    const removeItem = (itemId) => {
        const cartUpdated = cart.filter(prod => prod.id !== itemId);
        setCart(cartUpdated);
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, totalQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
