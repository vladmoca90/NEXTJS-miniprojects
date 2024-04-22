import { createContext, useState } from "react";
import { ClassContextComponent } from "./themeContext/ClassContextComponent";
import { FunctionContextComponent } from "./themeContext/FunctionContextComponent";

export const ThemeContext = createContext(null);

export default function Theme() {
    const [darkTheme, setDarkTheme] = useState(true);

    function toggleTheme() {
        setDarkTheme(prevDarkTheme => !prevDarkTheme);
    }

    return (
        <div>
            <ThemeContext.Provider value={darkTheme}>
                <button onClick={toggleTheme}>Toggle theme</button>
                <FunctionContextComponent />
                <ClassContextComponent />
            </ThemeContext.Provider>
        </div>
    );
}