import Counter from './components/Counter.jsx';
import Auth from "./components/Auth.jsx";
import Header from "./components/Header.jsx";
import {useSelector} from "react-redux";
import UserProfile from "./components/UserProfile.jsx";

function App() {
    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated)

    return (
        <>
            <Header/>
            {!isAuthenticated && <Auth/>}
            {isAuthenticated && <UserProfile/>}
            <Counter/>
        </>
    );
}

export default App;
