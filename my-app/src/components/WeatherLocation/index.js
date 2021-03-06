import React, { Component } from "react"; //componente funcional o componente de funcion
// es el componente mas sencillo de realizar. antes este componente era funcional, ahora es componente de clase
import LinearProgress from "@material-ui/core/LinearProgress";
import { PropTypes } from "prop-types";
import getUrlWeatherByCity from "./../../services/getUrlWeatherByCity";
import transformWeather from "./../../services/transformWeather";
import Location from "./Location";
import WeatherData from "./WeatherData";
import "./styles.css";

class WeatherLocation extends Component {
  constructor(props) {
    super(props);
    const { city } = props;
    this.state = {
      city,
      data: null
    };
    console.log("constructor");
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.handleUpdate();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
  }

  handleUpdate = () => {
    const api_weather = getUrlWeatherByCity(this.state.city);
    fetch(api_weather)
      .then(resolve => {
        return resolve.json();
      })
      .then(data => {
        const newWeather = transformWeather(data);
        this.setState({ data: newWeather });
      });
  };
  render() {
    const { onWeatherLocationClick } = this.props;
    const { city, data } = this.state;
    return (
      <div className="weatherLocationCont" onClick={onWeatherLocationClick}>
        <Location city={city} />
        {data ? <WeatherData data={data} /> : <LinearProgress />}
      </div>
    );
  }
}
WeatherLocation.propTypes = {
  city: PropTypes.string.isRequired,
  onWeatherLocationClick: PropTypes.func
};

export default WeatherLocation;
