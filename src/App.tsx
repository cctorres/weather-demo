import React, { useState, useEffect } from "react";
import Dashboard from "./views/dashboard/Dashboard";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Translator from "./components/translator/Translator";
import ThemeButton from "./components/theme/ThemeButton";
import "./App.css";

const App = () => {
  const getTheme = () => {
    return JSON.parse(localStorage.getItem("theme") || "true") || false;
  };

  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  const closeMenus = () => {
    const ulElement = document.querySelector<HTMLElement>('.translator-container ul');
    if(ulElement) {
      if (ulElement.className.includes("enable")) {
        ulElement.className = ulElement.className.replace("enable", "disable")
      } 
    }
  };

  return (
    <div className={theme ? "theme-dark" : ""}>
      <Header />
      <div className="content">
        <div className="setting-buttons">
          <Translator />
          <ThemeButton theme={theme} toggleTheme={toggleTheme} />
        </div>
        <div className="main-content" onClick={() => closeMenus()}>
          <Dashboard />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
