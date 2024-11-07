import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import CartContext from '../context/CartContext';
import styles from '../styles/checkout.module.css';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

const Checkout = () => {
    const [pedidoId, setPedidoId] = useState("");

    const { cart, totalPrice, clearCart } = useContext(CartContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const purchase = async (data) => {
        const order = {
            client: data,
            products: cart,
            total: totalPrice(),
            timestamp: serverTimestamp()
        };

        const pedidosRef = collection(db, "orders");

        try {
            const docRef = await addDoc(pedidosRef, order);
            setPedidoId(docRef.id);
            clearCart();
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const email = watch('email');
    const emailConfirm = watch('emailConfirm');

    if (pedidoId) {
        return (
            <div className={styles.container}>
                <h1 className={styles.mainTitle}>Thank you for your purchase</h1>
                <p>Your order number is: {pedidoId}</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1>End purchase</h1>
            <form className={styles.formulario} onSubmit={handleSubmit(purchase)}>
                <div className={styles.cartDetails}>
                    {cart.map((item, index) => (
                        <div key={index} className={styles.cartItem}>
                            <p>{item.name} Quantity: {item.quantity}</p>
                        </div>
                    ))}
                    <p>Total: ${totalPrice()}</p>
                </div>

                <input type="text" placeholder="Ingresá tu nombre" {...register("nombre", { required: true })} />
                {errors.nombre && <p className={styles.error}>Nombre es obligatorio</p>}

                <input type="text" placeholder="Ingresá tu apellido" {...register("apellido", { required: true })} />
                {errors.apellido && <p className={styles.error}>Apellido es obligatorio</p>}

                <input type="text" placeholder="Ingresá tu teléfono" {...register("telefono", { required: true })} />
                {errors.telefono && <p className={styles.error}>Teléfono es obligatorio</p>}

                <input type="email" placeholder="Ingresá tu email" {...register("email", { required: true })} />
                {errors.email && <p className={styles.error}>Email es obligatorio</p>}

                <input 
                    type="email" 
                    placeholder="Repite tu email" 
                    {...register("emailConfirm", { 
                        required: true, 
                        validate: value => value === email || "Los correos electrónicos no coinciden" 
                    })} 
                />
                {errors.emailConfirm && <p className={styles.error}>{errors.emailConfirm.message}</p>}

                <button className={styles.enviar} type="submit">Buy</button>
            </form>
        </div>
    );
};

export default Checkout;
