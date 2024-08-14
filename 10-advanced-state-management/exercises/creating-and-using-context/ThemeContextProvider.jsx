import React from "react"

export const ThemeContext = React.createContext({
    theme: "",
    toggleTheme: () => {
    }
})

export default function ThemeContextProvider({children}) {
    const [theme, setTheme] = React.useState("light")

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
    }

    const themeContextValue = {
        theme: theme,
        toggleTheme: () => toggleTheme()
    }

    return (
        <ThemeContext.Provider value={themeContextValue}>
            {children}
        </ThemeContext.Provider>
    )
}
