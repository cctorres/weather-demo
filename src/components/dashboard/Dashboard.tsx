import {  useState } from "react";
import { useTranslation } from "react-i18next";
import WheatherApi from "./WheatherApi";
import "./Dashboard.css";

const Dashboard = () => {
  const [city, setCity] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [t, i18n] = useTranslation("global");

  const handleInputChange = (e: any) => {
    setCity(e.target.value);
  };

  const updatePage = (e: any) => {
    e.preventDefault();
    setSearchValue(city);
  };
  return (
    <div className="dashboard-container">
      <h1>{t("dashboard.hello-world")}</h1>
      <form className="form-container" onSubmit={updatePage}>
        <input
          type="text"
          name="city"
          onChange={handleInputChange}
          placeholder={t("dashboard.input-search-placeholder")}
        />
        <button className="search-button" >{t("dashboard.button-search-text")}</button>
      </form>
      {searchValue.length > 0 ? <WheatherApi city={searchValue} /> : <div></div>}
    </div>
  );
};

export default Dashboard;
