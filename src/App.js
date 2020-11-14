import React from "react";
import Weather from "./components/weather.component";
import Form from "./components/form.component";
import "./App.css";

import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

//api.openweathermap.org/data/2.5/weather?q=London

class App extends React.Component {
  constructor() {
    super();

    //defining state to our app, then sending them to rendering section and to our app after seting needed data
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      pressure: "",
      wind: "",
      sunrise: "",
      sunset: "",
      tips: "",
      timezone: "",
      localTime: "",
      error: false
    };
    //setting icons for our app.
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-shower",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  calcRise(sunrise) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    return sunriseTime;
  }
  calcSet(sunset) {
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
    return sunsetTime;
  }
  //Calculating timeZone
  calcZone(timezone) {
    const zoneValue = (timezone / 3600).toLocaleString();
    return zoneValue;
  }
  //Uploading Local time
  calcLocal() {
    let currentTime = new Date().toLocaleTimeString();
    return currentTime;
  }

  //changing F to celsius.
  calcCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  //Specific parrameters to set corect icon for our app.

  //nesting needed data to link for our app.
  get_WeatherIcon(rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }
  }
  getTip(Id) {
    switch (true) {
      case Id >= 200 && Id <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        this.setState({
          tips:
            "Beatifull sigh of nature, powerfull and devatating power. Just something incredible but better stay at home today, don't risk your life for stupid stroll"
        });
        break;
      case Id >= 300 && Id <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        this.setState({
          tips:
            "Refreshing drizzle but be careful , visibility in roads geting worse!"
        });
        break;
      case Id >= 500 && Id <= 531:
        this.setState({
          tips:
            "There is no better time to watch TV in warm blanked near fireplace or listen to music of falling rain drops."
        });
        break;
      case Id >= 600 && Id <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        this.setState({
          tips:
            "Perfect day to have fun in snor like in old times, take a ride in sleigh to forest, tage a trip to mountains or have romantic dinner with your love surrounded by light of candle"
        });
        break;
      case Id >= 701 && Id <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        this.setState({
          tips:
            "Be careful, visibility is bad, better don't drive to fast and watch out for yourself. That what we don't see is the scariest thing."
        });
        break;
      case Id === 800:
        this.setState({ icon: this.weatherIcon.Clear });
        this.setState({
          tips:
            "Clear beatifull day, perfect moment to take a stroll or sightseeing something near. Don't waste than time"
        });
        break;
      case Id >= 801 && Id <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        this.setState({
          tips:
            "Clouds are beatifull sight of nature with many interesting but also scary shapes. Find fun of guess what you see!"
        });
        break;
      default:
        this.setState({ tips: "its rainy" });
    }
  }
  getWeather = async e => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    console.log(city, country)
    if (city && country) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.REACT_APP_API_KEY}`
      );
      // Waiting fo response from serv , setting properties to our data from feedback.
      const response = await api_call.json();
      console.log(response);
      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        celsius: this.calcCelsius(response.main.temp),
        temp_max: this.calcCelsius(response.main.temp_max),
        temp_min: this.calcCelsius(response.main.temp_min),
        pressure: response.main.pressure,
        wind: response.wind.speed,
        sunrise: this.calcRise(response.sys.sunrise),
        sunset: this.calcSet(response.sys.sunset),
        timezone: this.calcZone(response.timezone),
        localTime: this.calcLocal(),
        description: response.weather[0].main
      });
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
      this.getTip(response.weather[0].id);
    } else {
      this.setState.error = "true";
    }
  };

  //Rendering properties from weather and reforming them using the data from serv then setting to our app.
  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.error} />
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          pressure={this.state.pressure}
          wind={this.state.wind}
          sunrise={this.state.sunrise}
          sunset={this.state.sunset}
          description={this.state.description}
          weatherIcon={this.state.icon}
          tips={this.state.tips}
          timezone={this.state.timezone}
          localTime={this.state.localTime}
        />
      </div>
    );
  }
}
export default App;
