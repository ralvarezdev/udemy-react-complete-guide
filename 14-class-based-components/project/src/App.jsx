import UserFinder from "./components/UserFinder/UserFinder.jsx";
import UsersContext from "./store/users-context.js";

const DUMMY_USERS = [
    {id: 'u1', name: 'Max'},
    {id: 'u2', name: 'Manuel'},
    {id: 'u3', name: 'Julie'},
];

function App() {
    const usersContext = {
        users: DUMMY_USERS
    }

    return (
        <UsersContext.Provider value={usersContext}>
            <UserFinder/>
        </UsersContext.Provider>
    );
}

export default App;
