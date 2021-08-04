import React from 'react';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
    const [t, i18n] = useTranslation("global");
    return (
        <div>
            <button onClick={() => i18n.changeLanguage("en")}>En</button>
            <button onClick={() => i18n.changeLanguage("es")}>Es</button>
        <h1>{t("dashboard.hello-world")}</h1>
        </div>
    )
}

export default Dashboard
