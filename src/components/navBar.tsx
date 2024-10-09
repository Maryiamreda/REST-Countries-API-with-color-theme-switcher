import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import icons

const NavBar: React.FC = () => {

    const themeContext = useContext(ThemeContext);
    const { theme, toggleTheme, elementColor } = themeContext;

    return (
        <nav
            className="flex items-center justify-between px-6 py-4 shadow-lg "
            style={{ backgroundColor: elementColor }} // Dynamic background color
        >
            <div className="text-base font-bold">Where in the world?</div>
            <button
                onClick={toggleTheme}
                className="text-sm p-2 bg-transparent outline-none focus:outline-none inline-flex gap-2"
            >
                {theme === 'light' ? <FaMoon className=" relative top-0.5" /> : <FaSun className=" relative top-0.5" />}
                <div className="font-medium">  {theme === 'light' ? 'Dark' : 'Light'} Mode</div>

            </button>
        </nav>
    );
};

export default NavBar;
