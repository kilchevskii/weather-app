import React, { useEffect, useState } from "react";
import { Select, Button } from "antd";
import axios from "axios";
import {
  CloseOutlined,
  GithubOutlined,
  MailOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { API_KEY } from "../api/api";
import { weatherRequest } from "../redux/thunk/weatherThunk";
import { useDispatch } from "react-redux";
function HeaderBlock() {
  const { Option } = Select;
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [inputValue, setInputValue] = useState("Выберите Страну и введите Город");
  const [inputValueLength, setInputValueLength] = useState(0)
  const [selectedCity, setSelectedCity] = useState("");
  const [hideMenu, setHideMenu] = useState(false);
  const [hidePopup, setHidePopup] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (hidePopup) {
      setTimeout(() => setHidePopup(false), 2000);
    }
  }, [hidePopup]);
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json"
      )
      .then((res) => setCountry(Object.keys(res.data)));
  }, [dispatch]);
  useEffect(() => {
    if (selectedCity) {
      localStorage.getItem(selectedCity)
        ? setHidePopup(false) && setSelectedCity("") && setInputValue(null) && setInputValueLength(0)
        : axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}&units=metric`
            )
            .then((res) => dispatch(weatherRequest(res)));
      setSelectedCity("");
      setInputValue('Введите новый город');
      setInputValueLength(0)
    }
  }, [selectedCity, dispatch]);

  function getCity(value) {
    axios
      .get(
        "https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json"
      )
      .then((res) => setCity(res.data[value]));
  }
  const handleCnangeInput = (event) => {
    setInputValueLength(event?.length)
    setInputValue(event);
    if (setCountry && inputValueLength >= 2) {
      return setHideMenu(true);
    } else {
      return setHideMenu(false);
    }
  };
  const onHandleLocation = (name) => {
    setHideMenu(false);
    setSelectedCity(name);
    setInputValueLength(0)
  };
  return (
    <>
      <div className="find-wrapper">
        <Select
          allowClear={true}
          showSearch
          className="selectCountry"
          placeholder="Выберите Страну"
          style={{ width: 120 }}
          onChange={getCity}
        >
          {country
            ? country.sort().slice(1).map((item, index) => {
                return (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                );
              })
            : null}
        </Select>
        <Select
          onChange={handleCnangeInput}
          showSearch
          onSearch={(event) => handleCnangeInput(event)}
          allowClear={true}
          onSelect={onHandleLocation}
          open={hideMenu}
          value={inputValue}
          style={{ width: 200 }}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
        >
          {city
            ? city.map((item, index) => {
                return (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                );
              })
            : null}
        </Select>
        {/* <Button >Очистить</Button> */}
      </div>
      <div className="popup-wrapper">
        {hidePopup && (
          <p className="popup-block">
            Интересующая вас локация уже отображена :::)
            <Button className="hide-popup-btn">
              <CloseOutlined
                className="hide-popup-btn-icon"
                onClick={() => setHidePopup(!hidePopup)}
              />
            </Button>
          </p>
        )}
      </div>
      <div className="link-group">
        <ul>
          <li>
            <a
              rel="noreferrer"
              href="https://github.com/kilchevskii"
              target="_blank"
            >
              <GithubOutlined />
            </a>
          </li>
          <li>
            <a rel="noreferrer" href="https://t.me/westsmokes" target="_blank">
              <MailOutlined />
            </a>
          </li>
          <li>
            <a
              rel="noreferrer"
              href="https://www.linkedin.com/in/westsmokes/"
              target="_blank"
            >
              <LinkedinOutlined />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default HeaderBlock;
