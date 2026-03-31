import { useState } from "react"


import './App.css'
import Header from "../Header/Header.jsx"
import Main from "../Main/Main.jsx"

function App() {
const [weatherData, setWeatherData] = useState({type: "hot"})

  return (
    <div className="page">
      <div className="page__content"><Header></Header> </div>
      <Main weatherData={weatherData} setWeatherData={setWeatherData} />
      <footer/>
    </div>
  )
}

export default App
