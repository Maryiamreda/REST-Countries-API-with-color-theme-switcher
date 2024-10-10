import React, { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import NavBar from './components/navBar';
import Countries from './components/countries/countries';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from './components/countryDetails/details';

const App: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  // Handle the case where ThemeContext is undefined
  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return (
    <BrowserRouter>
      <div>
        <div style={{ position: "fixed", top: "0", zIndex: "1", width: "100%" }}>
          <NavBar />
        </div>
        <div style={{ position: "relative", top: "100px" }}>
          {/* Wrap Route components inside Routes */}
          <Routes>
            <Route path="/" element={<Countries />} />
            <Route path="/country/details/:name" element={<Details />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
