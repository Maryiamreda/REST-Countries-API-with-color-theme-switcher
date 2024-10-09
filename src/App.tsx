import React, { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import NavBar from './components/navBar';
import Countries from './components/countries/countries';
const App: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  // Handle the case where ThemeContext is undefined
  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }


  return (
    <div>
      <NavBar />
      <Countries />
    </div>
  );
};

export default App;
