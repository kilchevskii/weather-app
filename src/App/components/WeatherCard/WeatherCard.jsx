import { Button } from "antd";
import React from "react";
import { deleteWeather, updateWeather } from "../redux/thunk/weatherThunk";
import { useDispatch } from "react-redux";
import { ArrowUpOutlined } from "@ant-design/icons";
const WeatherCard = ({
  nameCity,
  windPowerCity,
  temperatureCity,
  humidityCity,
  degWindCity,
  pressureCity,
  cityId,
  timeStamp,
  weatherIcon,
}) => {
  const dispatch = useDispatch();
  const updateWeatherCard = () => {
    dispatch(updateWeather(nameCity));
  };
  const deleteWeatherCard = () => {
    dispatch(deleteWeather(nameCity));
  };
  function getDirection(angle) {
    var directions = [360, 315, 270, 225, 180, 135, 90, 45];
    return directions[
      Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8
    ];
  }
  function convertTimestamp(milliseconds) {
    var d = new Date(milliseconds * 1000),
      yyyy = d.getFullYear(),
      mm = ("0" + (d.getMonth() + 1)).slice(-2),
      dd = ("0" + d.getDate()).slice(-2),
      hh = d.getHours(),
      h = hh,
      min = ("0" + d.getMinutes()).slice(-2),
      ampm = "AM",
      time;
    if (hh > 12) {
      h = hh - 12;
      ampm = "PM";
    } else if (hh === 12) {
      h = 12;
      ampm = "PM";
    } else if (hh === 0) {
      h = 12;
    }
    time = yyyy + "-" + mm + "-" + dd + ", " + h + ":" + min + " " + ampm;
    return time;
  }
  function imageIcon(weatherIcon) {
    switch (weatherIcon) {
      case "01d":
        return "http://openweathermap.org/img/wn/01d@2x.png";
      case "01n":
        return "http://openweathermap.org/img/wn/01n@2x.png";
      case "02d":
        return "http://openweathermap.org/img/wn/02d@2x.png";
      case "02n":
        return "http://openweathermap.org/img/wn/02n@2x.png";
      case "03d" || "03n":
        return "http://openweathermap.org/img/wn/03d@2x.png";
      case "04d" || "04n":
        return "http://openweathermap.org/img/wn/04d@2x.png";
      case "09d" || "09n":
        return "http://openweathermap.org/img/wn/09d@2x.png";
      case "10d":
        return "http://openweathermap.org/img/wn/10d@2x.png";
      case "10n":
        return "http://openweathermap.org/img/wn/10n@2x.png";
      case "11d" || "11n":
        return "http://openweathermap.org/img/wn/11d@2x.png";
      case "13d" || "13n":
        return "http://openweathermap.org/img/wn/13d@2x.png";
      case "50d" || "50n":
        return "http://openweathermap.org/img/wn/50d@2x.png";
      default:
        return "http://openweathermap.org/img/wn/01d@2x.png";
    }
  }
  return (
    <>
      <div className="wrapper-card">
        <p className="card-list">
          ?????????? <span className="cityName">{nameCity}</span>
          <img
            className="weather-icon"
            alt="weather-icon"
            src={imageIcon(weatherIcon)}
          ></img>
        </p>
        <p className="card-list">?????????????????????? {temperatureCity}??</p>
        <p className="card-list">?????????????????? {humidityCity}%</p>
        <p className="card-list">???????????????? {pressureCity}</p>
        <p className="card-list">
          ???????? ?????????? {windPowerCity} ?? ?????????????????????? ?????????? <br />
          <ArrowUpOutlined
            className="arrow-wind"
            style={{ transform: `rotate(${getDirection(degWindCity)}deg)` }}
          />
        </p>
        <p className="card-list">
          ?????????????????? ???????????????????? ????????????
          <br /> {convertTimestamp(timeStamp)}
        </p>
        <div className="control-btns">
          <Button onClick={deleteWeatherCard} type="primary" danger>
            ??????????????
          </Button>
          <Button onClick={updateWeatherCard} className="update-btn">
            ????????????????
          </Button>
        </div>
      </div>
      <div className="bird-container bird-container--one">
        <div className="bird bird--one"></div>
      </div>

      <div className="bird-container bird-container--two">
        <div className="bird bird--two"></div>
      </div>

      <div className="bird-container bird-container--three">
        <div className="bird bird--three"></div>
      </div>

      <div className="bird-container bird-container--four">
        <div className="bird bird--four"></div>
      </div>
    </>
  );
};

export default WeatherCard;
