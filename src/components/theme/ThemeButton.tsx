import React from "react";
import "./ThemeButton.css"; // Asegúrate de tener un archivo de estilo para el componente

interface ThemeButtonProps {
    theme: boolean;
    toggleTheme: () => void;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ theme, toggleTheme }) => {
    return (
        <div className={`${theme ? "theme-toggle-dark" : "theme-toggle-light"}`} onClick={toggleTheme}>
            <picture/>
            <span className="light-button">⛅</span>
            <span className="dark-button">🌙</span>
        </div>
    );
};

export default ThemeButton;
