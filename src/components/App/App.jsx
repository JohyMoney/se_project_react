import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModel/ItemModel.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import {
  coordinates,
  apiKey,
  defaultClothingItems,
} from "../../utils/constants.js";
import CurrentTemperatureUnitContext from "../context/CurrentTemperatureUnitcontext.jsx";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 0, C: 0 },
    city: "",
    isDay: true,
    condition: "Clear",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCardId, setSelectedCardId] = useState({});
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCardId(card);
  };

  const handleAddClick = () => {
    setActiveModal("add garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      _id: Date.now().toString(),
      name: inputValues.name,
      weather: inputValues.weather,
      link: inputValues.imageUrl,
    };

    setClothingItems((currentItems) => [newCardData, ...currentItems]);
    closeActiveModal();
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch((err) => {
        console.error("Weather fetch failed:", err);
      });
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  currentTemperatureUnit={currentTemperatureUnit}
                  setCurrentTemperatureUnit={setCurrentTemperatureUnit}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
      </div>
      <AddItemModal
        isOpen={activeModal === "add garment"}
        onAddItem={onAddItem}
        onClose={closeActiveModal}
      />
      <ItemModal
        activeModal={activeModal}
        card={selectedCardId}
        onClose={closeActiveModal}
      />
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
