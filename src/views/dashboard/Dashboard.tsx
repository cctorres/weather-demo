import { useState, ChangeEvent, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import WheatherApi from "../../components/weatherAPI/WheatherApi";
import mockup from '../../utils/assets/images/mockup-image.jpg';
import "./Dashboard.css";


const Dashboard = () => {
  const [city, setCity] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [t] = useTranslation("global");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const updatePage = (e: FormEvent) => {
    e.preventDefault();
    setSearchValue(city);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-title">
        <h1>Real-Time</h1>
        <h2>Weather forecast & more</h2>
      </div>
      <form className="form-container" onSubmit={updatePage}>
        <input
          type="text"
          name="city"
          onChange={handleInputChange}
          placeholder={t("dashboard.inputSearchPlaceholder")}
        />
        <button className="search-button">
          {t("dashboard.buttonSearchText")}
        </button>
      </form>
      {searchValue.length > 0 ? (
        <WheatherApi city={searchValue} />
      ) : (
        <div className="mockup-weather">
          <img src={mockup} alt=""/>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
