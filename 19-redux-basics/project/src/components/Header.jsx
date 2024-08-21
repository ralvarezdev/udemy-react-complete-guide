import classes from './Header.module.css';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/authentication";

const Header = () => {
    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated)
    const dispatch = useDispatch()

    const logoutHandler = event => {
        event.preventDefault()

        dispatch(logout())
    }

    return (
        <header className={classes.header}>
            <h1>Redux Auth</h1>
            {isAuthenticated && (
                <nav>
                    <ul>
                        <li>
                            <a href='/'>My Products</a>
                        </li>
                        <li>
                            <a href='/'>My Sales</a>
                        </li>
                        <li>
                            <button onClick={logoutHandler}>Logout</button>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;
