import { Button } from "antd";
import React, { useEffect } from "react";
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
}) => {
  const dispatch = useDispatch();
  const updateWeatherCard = () => {
    dispatch(updateWeather(nameCity));
  };
  useEffect(() => {
    return () => {
      console.log(`demontage ${nameCity}`);
    };
  }, []);
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
  return (
    <div className="wrapper-card">
      <p className="card-list">Город <span className="cityName">{nameCity}</span></p>
      <p className="card-list">Температура {temperatureCity}°</p>
      <p className="card-list">Влажность {humidityCity}%</p>
      <p className="card-list">Давление {pressureCity}</p>
      <p className="card-list">
        Сила ветра {windPowerCity} и направление ветра <br />
          <ArrowUpOutlined  className="arrow-wind" style={{transform: `rotate(${getDirection(degWindCity)}deg)`}}/>
      </p>
      <p className="card-list">
        Последнее обновление данных
        <br /> {convertTimestamp(timeStamp)}
      </p>
      <div className="control-btns">
        <Button onClick={deleteWeatherCard} type="primary" danger>
          Удалить
        </Button>
        <Button onClick={updateWeatherCard} className="update-btn">
          Обновить
        </Button>
      </div>
    </div>
  );
};

export default WeatherCard;
