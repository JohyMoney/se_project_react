import "./ToggleSwitch.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

const ToggleSwitch = ({ currentTemperatureUnit, handleToggleSwitchChange }) => {
    return <label className="toggle-switch">
       
       <input type="checkbox" onChange={handleToggleSwitchChange} className="toggle-switch__box" />
        <span className="toggle-switch__circle"></span>
        <span className={`toggle-switch__text toggle-switch__text_F ${currentTemperatureUnit === "F" ? "toggle-switch__text_color_white" : ""}`}>F</span>
        <span className={`toggle-switch__text toggle-switch__text_C ${currentTemperatureUnit === "C" ? "toggle-switch__text_color_white" : ""}`}>C</span>
    </label>
}


export default ToggleSwitch;