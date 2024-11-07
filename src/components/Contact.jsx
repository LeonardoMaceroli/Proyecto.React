import { useForm } from "react-hook-form";

const Contact = () => {

    const { register, handleSubmit } = useForm();

    const send = (data) => {
        
    }

    return (

        <div className="container">
            <h1 className="main-title">Contact</h1>
            <form className="form" onSubmit={handleSubmit(send)}>

                <input type="text" placeholder="Ingresá tu nombre" {...register("nombre")} />
                <input type="text" placeholder="Ingresá tu apellidp" {...register("apellido")} />
                <input type="phone" placeholder="Ingresá tu teléfono" {...register("telefono")} />
                <input type="email" placeholder="Ingresá tu e-mail" {...register("email")} />

                <button className="enviar" type="submit">Send</button>

            </form>
        </div>

    )
}

export default Contact