import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
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
  const [clothingItems] = useState(defaultClothingItems);
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
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    const onAddItem = (inputValues) => {
      const newCardData = {
        _id: Date.now().toString(),
        name: inputValues.name,
        weather: inputValues.weather,
        image: inputValues.image,
      };
    setClothingItem([...clothingItems, inputValues]);
    closeAllModals();
    };

    addItemModal(newCardData);
    .then((data) => {
      setClothingItem([...clothingItems, data]);
      closeActiveModal();
    })
    .catch((err) => {
      console.error("Add item failed:", err);
    });

      const handleOverlayClose = (evt) => {
        if (evt.target.classList.contains("modal")) {
          closeActiveModal();
        }
      };

      document.addEventListener("click", handleOverlayClose);

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("click", handleOverlayClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch((err) => {
        console.error("Weather fetch failed:", err);
      });
  }, []);

  getitems(). then((data) => {
    setClothingItem(data);
  }).catch((err) => {
    console.error("Items fetch failed:", err);
  });

  co

  return (
    <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange}}>
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
          />
          <Routes>
            <Route path="/preview/:id" element={<Profile card={selectedCardId} onClose={closeActiveModal} />} />
          </Routes>
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          currentTemperatureUnit={currentTemperatureUnit}
          setCurrentTemperatureUnit={setCurrentTemperatureUnit}
        />
        <Footer />
        </div>
      </div>
      <AddItemModal
        isOpen={activeModal === "add garment"}
        onAddItem={onAddItem}
        onClose={closeActiveModal}
      />
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
