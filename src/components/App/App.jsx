import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModel/ItemModel.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import {
  coordinates,
  apiKey,
  defaultClothingItems,
} from "../../utils/constants.js";

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
    <div className="page">
      <div className="page__content">
        <Header
          handleAddClick={handleAddClick}
          weatherData={weatherData}
        ></Header>
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
        />
        <Footer />
      </div>
      <ModalWithForm
        buttonText="Add a garment"
        title="New garment"
        isOpen={activeModal === "add garment"}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            name="name"
            placeholder="Name"
            required
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image URL
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            name="imageUrl"
            placeholder="Image URL"
            required
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type</legend>
          <label htmlFor="hot" className="modal__label modal__input_type_radio">
            <input
              type="radio"
              className="modal__radio-input"
              id="hot"
              name="weather"
              value="hot"
              required
            />
            Hot
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__input_type_radio"
          >
            <input
              type="radio"
              className="modal__radio-input"
              id="cold"
              name="weather"
              value="cold"
            />
            Cold
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__input_type_radio"
          >
            <input
              type="radio"
              className="modal__radio-input"
              id="warm"
              name="weather"
              value="warm"
            />
            Warm
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCardId}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
