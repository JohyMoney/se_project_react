import { useEffect, useState } from "react"



import './App.css'
import Header from "../Header/Header.jsx"
import Main from "../Main/Main.jsx"
import Footer from "../Footer/Footer.jsx"
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx"
import ItemModal from "../ItemModel/ItemModel.jsx"
import { getWeather } from "../../utils/weatherApi.js"
import { coordinates,APIKey} from "../../utils/constants.js"
import { filterWeatherData } from "../../utils/weatherApi.js"
import { defaultClothingItems } from "../../utils/constants.js"


function App() {
const [weatherData, setWeatherData] = useState({type: "", temp: { F: "",  C: "",  city: "" }})
const [activeModal, setActiveModal] = useState("preview")
const [selectedCardId, setSelectedCardId] = useState({})
const [clothingItems, setClothingItems] = useState(defaultClothingItems)

const handleCardClick = (card) => {
  setActiveModal("preview");
  setSelectedCardId(card);
}


const handleAddClick = () => {  setActiveModal("add garment")
}

const closeActiveModal = () => {  setActiveModal("")
}


useEffect(() => {
  getWeather(coordinates, APIKey)
    .then((response) => response.json())
    .then((data) => {
      setWeatherData(filterWeatherData(data));
    });
}, [])

  return (
    <div className="page">
      <div className="page__content"><Header
        handleAddClick={handleAddClick} activeModal={activeModal}>
          </Header> 
      <Main weatherData={weatherData} handleCardClick={handleCardClick}
      />
      <Footer />
      </div>
      <ModalWithForm buttonText="Add a garment"
       title="New garment" 
      activeModal={activeModal}
      onClose={closeActiveModal}
       setActiveModal={setActiveModal}>
        onClick={closeActiveModal}
               <label htmlFor="Name" className="modal__label">Name 
       <input type="text" className="modal__input" id="Name" placeholder="Name"
       /></label>
         <label htmlFor="imageUrl" className="modal__label">Image{""}
       <input type="text" className="modal__input" id="imageUrl" placeholder="Image URL"
       /></label>
        <fieldset className ="modal__radio-buttons">
    <legend className="modal__legend">Select the weather type</legend>
        <label htmlFor="Hot" className="modal__label modal__input_type_radio">
        <input type="radio" className="modal__radio-input" id="Hot" name="weather" value="hot" />
        Hot
        </label>
        <label htmlFor="Cold" className="modal__label modal__input_type_radio">
        <input type="radio" className="modal__radio-input" id="Cold" name="weather" value="cold" />
        Cold
        </label>
        <label htmlFor="Warm" className="modal__label modal__input_type_radio">
        <input type="radio" className="modal__radio-input" id="Warm" name="weather" value="warm" />
        Warm
        </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal activeModal={activeModal} card={selectedCardId} onClose={closeActiveModal} />
    </div>
  )
}

export default App
