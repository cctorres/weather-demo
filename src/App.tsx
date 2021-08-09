import React, { useState, useEffect } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import "./App.css";
import Translator from "./components/translator/Translator";

const App = () => {
  const getTheme = () => {
    return JSON.parse(localStorage.getItem("theme") || "true") || false;
  };
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <div className={theme ? "theme-dark" : ""}>
      <div className="header">
        <div>WeatherAPI</div>
        <div className="header-buttons">
          {theme ? (
            <button className="theme-button" onClick={() => setTheme(!theme)}>
              ⛅
            </button>
          ) : (
            <button className="theme-button" onClick={() => setTheme(!theme)}>
              🌙
            </button>
          )}
          <Translator />
        </div>
      </div>
      <div className="main-content">
        <Dashboard />
      </div>
      <div className="footer">CCTorres</div>
    </div>
  );
};

export default App;
