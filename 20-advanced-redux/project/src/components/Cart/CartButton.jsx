import classes from './CartButton.module.css';
import {useDispatch, useSelector} from "react-redux";
import {uiToggle} from "../../store/ui-slice";

const CartButton = (props) => {
    const dispatch = useDispatch()
    const cartQuantity = useSelector(state => state.cart.totalQuantity)

    const cartToggleHandler = () => dispatch(uiToggle())

    return (
        <button className={classes.button} onClick={cartToggleHandler}>
            <span>My Cart</span>
            <span className={classes.badge}>{cartQuantity}</span>
        </button>
    );
};

export default CartButton;
