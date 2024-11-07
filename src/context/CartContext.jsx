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

    const totalPrice = () => {
        return cart.reduce((acc, prod) => acc + prod.price * prod.quantity, 0);
    }

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, totalPrice, totalQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
