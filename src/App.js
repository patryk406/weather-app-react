import React from 'react';
import Weather from './app_component/weather.component';
import Form from './app_component/form.component';
import './App.css';

import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//api.openweathermap.org/data/2.5/weather?q=London
const API_key = 'e614a40be0d49993168759d8b8e25e37';

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
      description: '',
      pressure: '',
      wind: '',
      sunrise: '',
      sunset: '',
      error: false
    };
    //setting icons for our app.
    this.weatherIcon = {
      Thunderstorm: 'wi-thunderstorm',
      Drizzle: 'wi-sleet',
      Rain: 'wi-storm-shower',
      Snow: 'wi-snow',
      Atmosphere: 'wi-fog',
      Clear: 'wi-day-sunny',
      Clouds: 'wi-day-fog'
    };
  }
  calcRise(sunrise) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    console.log({ sunriseTime });
    return sunriseTime;
  }
  calcSet(sunset) {
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
    console.log({ sunsetTime });
    return sunsetTime;
  }
  //changing F to celsius.
  calcCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  //Specific parrameters to set corect icon for our app.

  //nesting needed data to link for our app.
  get_WeatherIcon(icons, rangeId) {
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

  getWeather = async e => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if (city && country) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
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
        description: response.weather[0].main
      });
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
    } else {
      this.setState.error = 'true';
    }
  };

  //Rendering properties from weather and reforming them using the data from serv then setting to our app.
  render() {
    return (
      <div className='App'>
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
        />
      </div>
    );
  }
}
export default App;
