import classes from './Counter.module.css';
import {decrement, increment, toggle} from "../store/counter";
import {useDispatch, useSelector} from "react-redux";

const Counter = () => {
    const counter = useSelector(state => state.counter.value)
    const show = useSelector(state => state.counter.show)
    const dispatch = useDispatch()

    const incrementHandler = (payload) => dispatch(increment(payload))
    const decrementHandler = (payload) => dispatch(decrement(payload))
    const toggleHandler = () => dispatch(toggle())

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            {show && <div className={classes.value}>{counter}</div>}
            <div>
                <button onClick={() => incrementHandler(1)}>Increment</button>
                <button onClick={() => decrementHandler(1)}>Decrement</button>
            </div>
            <button onClick={toggleHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;
