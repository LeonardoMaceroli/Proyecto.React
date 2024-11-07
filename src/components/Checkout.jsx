import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import CartContext from '../context/CartContext';
import styles from '../styles/checkout.module.css';
import endPurchase from '../services/endPurchase';
import Swal from 'sweetalert2';

const Checkout = () => {
    const [pedidoId, setPedidoId] = useState("");
    const [clientData, setClientData] = useState({});

    const { cart, totalPrice, clearCart } = useContext(CartContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const purchase = async (data) => {
        if (cart.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The cart is empty, please add products before proceeding with the purchase',
            });
            return;
        }

        try {
            const result = await endPurchase(cart, data);
            setPedidoId(result.order.id);
            setClientData({ ...data, total: totalPrice() });
            clearCart();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was a problem processing your purchase. Please try again.',
            });
        }
    };

    const email = watch('email');
    const emailConfirm = watch('emailConfirm');

    if (pedidoId) {
        return (
            <div className={styles.container}>
                <h1 className={styles.mainTitle}>Thank you for your purchase</h1>
                <div className={styles.client}>
                    <h2>Your order number is: {pedidoId}</h2>
                    <h3>Client data:</h3>
                    <ul>
                        <li>Name: {clientData.nombre}</li>
                        <li>Last Name: {clientData.apellido}</li>
                        <li>Phone: {clientData.telefono}</li>
                        <li>Email: {clientData.email}</li>
                        <li>Total Purchase Price: ${clientData.total}</li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1>End purchase</h1>
            <form className={styles.formulario} onSubmit={handleSubmit(purchase)}>
                <div className={styles.cartDetails}>
                    {cart.map((product, index) => (
                        <div key={index} className={styles.cartItem}>
                            <p>{product.title}: {product.quantity}</p>
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
