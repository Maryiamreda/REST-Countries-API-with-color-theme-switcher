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
      <div style={{ position: "fixed", top: "0", zIndex: "1", width: "100%" }}>      <NavBar />
      </div>
      <div style={{ position: "relative", top: "100px" }}>      <Countries />
      </div>
    </div>
  );
};

export default App;
