import React, { createContext, useState, ReactNode } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
    elementColor: string;

};

//. It takes the context object created with createContext as an argument 
//and returns the current context value for that context.
export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => { },
    elementColor: "white",

});


//Creates and exports the context with a default value.
interface ThemeProviderProps {
    //Type: ReactNode is a type provided by React that represents 
    //any node that can be rendered in a React application. 
    children: ReactNode;
}

//Defines the ThemeProvider component, typed with React.FC and the props interface.
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>("light");

    //Creates a state variable for the theme with "light" as the default.
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    //Defines a function to switch between light and dark themes.
    const color = theme === "light" ? "hsl(200, 15%, 8%)" : "white";
    const backgroundColor = theme === "light" ? "hsl(0, 0%, 98%)" : "hsl(207, 26%, 17%)";
    const elementColor = theme === "light" ? "white" : "hsl(209, 23%, 22%)";
    //Sets color values based on the current theme.
    React.useEffect(() => {
        document.body.style.color = color;
        document.body.style.backgroundColor = backgroundColor;
    }, [theme, color, backgroundColor]);
    //Updates the document body styles when the theme changes.

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, elementColor }}>
            {children}
        </ThemeContext.Provider>
    );
};