import React from "react";
import "./weather.style.css";
const Weather = props => {
  return (
    <div className="wrapper container">
      <div className="cards ">
        <h1 className="description">
          <p>{props.city}</p> <p>{props.description}</p>
        </h1>
        <div className="icon_tip  d-flex">
          <i className={`wi ${props.weatherIcon} display-1`}></i>
          {tips(props.tips)}
        </div>
        {props.temp_celsius ? (
          <h1>Actual Temp {props.temp_celsius}&deg;</h1>
        ) : null}
        {/* {show max and min temp} */}
        {minmaxTemp(props.temp_max, props.temp_min)}
        {pressWind(props.pressure, props.wind)}
        {riseSet(props.sunrise, props.sunset, props.timezone, props.localTime)}

        <div className="col-12">{footer(props.city)}</div>
      </div>
    </div>
  );
};
function tips(tips) {
  if (tips) {
    return (
      <h5 className="tip col-6">
        <p>
          <span>&rdquo;</span>
          {tips}
          <span>&bdquo;</span>
        </p>
      </h5>
    );
  }
}
function footer(city) {
  if (city) {
    return (
      <footer>
        <h5>
          <p>Welcome in {city} Weather Center !</p>
          <div className="providers">
            <p className="left">
              App powered by
              <a href="https://reactjs.org/"> REACT </a>
            </p>
            <p className="right">
              All data provided by
              <a href="https://openweathermap.org/"> WeatherMap </a>
            </p>
          </div>
        </h5>
      </footer>
    );
  }
}
function riseSet(sunrise, sunset, timezone, localTime) {
  if (sunrise && sunset) {
    return (
      <div className="card-deck ">
        <div className="card bg-transparent border-0 p-2">
          <div className="card-title">
            <h3>
              Sunrise
              <img
                className="sunrise"
                src="https://img.icons8.com/nolan/40/000000/smiling-sun.png"
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
                className="sunset"
                src="https://img.icons8.com/nolan/40/000000/sad-sun.png"
                alt="set"
              ></img>
            </h3>
          </div>
          <div className="card-text">
            <h4>{sunset}</h4>
          </div>
        </div>
        <div className="card bg-transparent border-0 p-2">
          <div className="card-title">
            <h3>
              Time
              <img
                className="time"
                src="https://img.icons8.com/nolan/40/000000/time.png"
                alt="time"
              ></img>
            </h3>
          </div>
          <div className="card-text">
            <h4>
              {localTime} (UTC+ {timezone})
            </h4>
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
