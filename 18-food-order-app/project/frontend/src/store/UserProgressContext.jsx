import {createContext, useState} from "react";

const UserProgressContext = createContext({
    progress: "",
    showCart: () => {
    },
    hideCart: () => {
    },
    showCheckout: () => {
    },
    hideCheckout: () => {
    }
});
export default UserProgressContext

export function UserProgressContextProvider({children}) {
    const [userProgress, setUserProgress] = useState("")

    const showCart = () => setUserProgress("cart")
    const hideCart = () => setUserProgress("")
    const showCheckout = () => setUserProgress("checkout")
    const hideCheckout = () => setUserProgress("")

    const cartContext = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return (
        <UserProgressContext.Provider value={cartContext}>
            {children}
        </UserProgressContext.Provider>
    )
}