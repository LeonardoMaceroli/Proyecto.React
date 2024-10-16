import '../styles/itemcount.css';
import { useState } from "react";

const ItemCount = ({ stock, initial, onAdd }) => {
    const [quantity, setQuantity] = useState(initial)

    const increment = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1)
    }
}

const decrement = () => {
    if (quantity > 1) {
        setQuantity(quantity - 1)
    }
}

return (
    <div className='counter'>
        <div className='controls'>
            <button onClick={decrement}>-</button>
            <h4 className='number'>{quantity}</h4>
            <button onClick={increment}>+</button>
        </div>
        <div>
            <button onClick={() => onAdd(quantity)} disabled={!stock}>Add to cart</button>
        </div>
    </div>
)

}

export default ItemCount