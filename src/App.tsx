import React, { useState, useEffect } from "react";
import Dashboard from "./views/dashboard/Dashboard";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Translator from "./components/translator/Translator";
import "./App.css";

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
      <Header />
      <div className="app-buttons">
        {theme ? (
          <button className="button" onClick={() => setTheme(!theme)}>
            ⛅
          </button>
        ) : (
          <button className="button" onClick={() => setTheme(!theme)}>
            🌙
          </button>
        )}
        <Translator />
      </div>
      <div className="main-content">
        <Dashboard />
      </div>
      <Footer />
    </div>
  );
};

export default App;
