import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import CartContext from "../context/CartContext";
import styles from "../styles/checkout.module.css";
import endPurchase from "../services/endPurchase";
import Swal from "sweetalert2";

const Checkout = () => {
    const [pedidoId, setPedidoId] = useState("");
    const [clientData, setClientData] = useState({});
    const { cart, totalPrice, clearCart } = useContext(CartContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const purchase = async (data) => {
        if (cart.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El carrito está vacío, por favor añade productos antes de proceder con la compra.",
            });
            return;
        }

        // Mostrar mensaje de "Generando orden..."
        Swal.fire({
            title: "Generando orden...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const result = await endPurchase(cart, data);
            setPedidoId(result.order.id);
            setClientData({ ...data, total: totalPrice() });
            clearCart();
            Swal.close(); // Cerrar el SweetAlert una vez que se tengan los datos de pedidoId
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "There was a problem processing your purchase. Please try again",
            });
        }
    };

    const email = watch("email");
    const emailConfirm = watch("emailConfirm");

    if (pedidoId) {
        return (
            <div className={styles.container}>
                <h1 className={styles.mainTitle}>Thanks you for your purchase</h1>
                <div className={styles.client}>
                    <h2>Your order number is: {pedidoId}</h2>
                    <h3>Client data:</h3>
                    <ul>
                        <li>Name: {clientData.name}</li>
                        <li>Last name: {clientData.lastname}</li>
                        <li>Phone: {clientData.phone}</li>
                        <li>Email: {clientData.email}</li>
                        <li>Total purchase price: ${clientData.total}</li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1>End Purchase</h1>
            <form className={styles.formulario} onSubmit={handleSubmit(purchase)}>
                <div className={styles.cartDetails}>
                    {cart.map((product, index) => (
                        <div key={index} className={styles.cartItem}>
                            <p>{product.title}: {product.quantity}</p>
                        </div>
                    ))}
                    <p>Total: ${totalPrice()}</p>
                </div>
                <input
                    type="text"
                    placeholder="Enter your name"
                    {...register("name", { required: true })}
                />
                {errors.name && <p className={styles.error}>Name is required</p>}
                <input
                    type="text"
                    placeholder="Enter last name"
                    {...register("lastname", { required: true })}
                />
                {errors.lastname && <p className={styles.error}>Last name is required</p>}
                <input
                    type="text"
                    placeholder="Enter your phone"
                    {...register("phone", { required: true })}
                />
                {errors.phone && <p className={styles.error}>Phone is required</p>}
                <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", { required: true })}
                />
                {errors.email && <p className={styles.error}>Email is required</p>}
                <input
                    type="email"
                    placeholder="Repeat your email"
                    {...register("emailConfirm", {
                        required: true,
                        validate: (value) =>
                            value === email || "Emails do not match",
                    })}
                />
                {errors.emailConfirm && (
                    <p className={styles.error}>{errors.emailConfirm.message}</p>
                )}
                <button className={styles.enviar} type="submit">Buy</button>
            </form>
        </div>
    );
};

export default Checkout;
