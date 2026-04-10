import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { coordinates, apiKey } from "../../utils/constants.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";
import { addItem, deleteItem, getItems } from "../../utils/api.js";

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
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((currentUnit) =>
      currentUnit === "F" ? "C" : "F",
    );
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
    addItem(inputValues)
      .then((savedItem) => {
        setClothingItems((items) => [savedItem, ...items]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to add item:", error);
      });
  };

  const handleDeleteItem = (card) => {
    if (!card?._id) {
      return;
    }

    deleteItem(card._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== card._id),
        );
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
      });
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

  useEffect(() => {
    getItems()
      .then(setClothingItems)
      .catch((err) => {
        console.error("Items fetch failed:", err);
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
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onAddClick={handleAddClick}
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
        onDelete={handleDeleteItem}
      />
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
