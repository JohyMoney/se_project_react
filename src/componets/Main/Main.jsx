
import "./Main.css"
import WeatherCard from "../WeatherCard/WeatherCard.jsx"
import { defaultClothingItems } from "../../utils/constants.js"
import ItemCard from "../ItemCard/ItemCard.jsx"
import App from "../App/App.jsx"


function Main({ weatherData, setWeatherData }) {
    return ( <Main>
       <WeatherCard/>
       <section className="cards">
        <p className="cards__text">Today is 75 &deg; / You may want to wear:</p>
      <ul className="cards__list">
        {defaultClothingItems.filter((item) => {
      return item.type === weatherData.type
        }).map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </ul>
       </section>
    </Main>
    )
    

    }

export default Main 