import React from "react";
import "./weather.style.css";
const Weather = props => {
  return (
    <div className="container">
      <div className="cards pt-4">
        <h1>{props.city}</h1>
        <h5 className="icon_tip py-4 d-flex">
          <i className={`wi ${props.weatherIcon} display-1`}></i>
          <p className="tip col-6">{props.tips}</p>
        </h5>

        {props.temp_celsius ? (
          <h1 className="py-2">Actual Temp {props.temp_celsius}&deg;</h1>
        ) : null}
        {/* {show max and min temp} */}
        {minmaxTemp(props.temp_max, props.temp_min)}
        {pressWind(props.pressure, props.wind)}
        {riseSet(props.sunrise, props.sunset)}
        <h4 className="py-3">{props.description}</h4>
      </div>
    </div>
  );
};

function riseSet(sunrise, sunset) {
  if (sunrise && sunset) {
    return (
      <div className="card-deck ">
        <div className="card bg-transparent border-0 p-2">
          <div className="card-title">
            <h3>
              Sunrise
              <img
                src="https://img.icons8.com/office/30/000000/sunrise.png"
                alt="rise"
              ></img>
            </h3>
          </div>
          <div className="card-text">
            <h4>{sunrise}</h4>
          </div>
        </div>
        <div className="card bg-transparent border-0 p-2">
          <div className="card-title">
            <h3>
              Sunset
              <img
                src="https://img.icons8.com/cotton/40/000000/sunset--v4.png"
                alt="set"
              ></img>
            </h3>
          </div>
          <div className="card-text">
            <h4>{sunset}</h4>
          </div>
        </div>
      </div>
    );
  }
}
function pressWind(pressure, wind) {
  if (pressure && wind) {
    return (
      <h3>
        <span className="px-4">Pressure: {pressure} hPa</span>
        <span className="px-4">Wind Speed: {wind} m/s</span>
      </h3>
    );
  }
}
function minmaxTemp(max, min) {
  if (min && max) {
    return (
      <h3>
        <span className="px-4">Min Temperature {min}&deg;</span>
        <span className="px-4">Max Temperature {max}&deg;</span>
      </h3>
    );
  }
}
export default Weather;
