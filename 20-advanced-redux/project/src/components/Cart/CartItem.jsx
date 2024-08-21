import classes from './CartItem.module.css';
import {useDispatch} from "react-redux";
import {cartAddItem, cartRemoveItem} from "../../store/cart-slice.js";

const CartItem = (props) => {
    const {id, title, quantity, total, price} = props.item;
    const dispatch = useDispatch()

    const cartAddItemHandler = () => dispatch(cartAddItem({id, title, price}))

    const cartRemoveItemHandler = () => dispatch(cartRemoveItem(id))

    return (
        <li className={classes.item}>
            <header>
                <h3>{title}</h3>
                <div className={classes.price}>
                    ${total.toFixed(2)}{' '}
                    <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
                </div>
            </header>
            <div className={classes.details}>
                <div className={classes.quantity}>
                    x <span>{quantity}</span>
                </div>
                <div className={classes.actions}>
                    <button onClick={cartRemoveItemHandler}>-</button>
                    <button onClick={cartAddItemHandler}>+</button>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
