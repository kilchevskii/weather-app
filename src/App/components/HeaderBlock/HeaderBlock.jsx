import React, { useEffect, useState } from "react";
import { Select, Button } from "antd";
import axios from "axios";
import { CloseOutlined, GithubOutlined, MailOutlined, LinkedinOutlined } from "@ant-design/icons";
import { API_KEY } from "../api/api";
import { weatherRequest } from "../redux/thunk/weatherThunk";
import { useDispatch } from "react-redux";
function HeaderBlock() {
  const { Option } = Select;
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [hideMenu, setHideMenu] = useState(false);
  const [hidePopup, setHidePopup] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (hidePopup) {
      setTimeout(() => setHidePopup(false), 1500);
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
        ? setHidePopup(!hidePopup) && setSelectedCity("") && setInputValue(0)
        : axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}&units=metric`
            )
            .then((res) => dispatch(weatherRequest(res)));
      setSelectedCity("");
      setInputValue(0);
    }
  }, [selectedCity]);

  function getCity(value) {
    axios
      .get(
        "https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json"
      )
      .then((res) => setCity(res.data[value]));
  }
  const handleCnangeInput = (val) => {
    setInputValue(val);
    if (inputValue?.length >= 2) {
      return setHideMenu(true);
    } else {
      return setHideMenu(false);
    }
  };
  const onHandleLocation = (val) => {
    setHideMenu(false);
    setSelectedCity(val);
  };
  return (
    <>
      <div className="find-wrapper">
        <Select
          allowClear={true}
          showSearch
          className="selectCountry"
          defaultValue="Выберите Страну"
          style={{ width: 120 }}
          onChange={getCity}
        >
          {country
            ? country.map((item, index) => {
                return (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                );
              })
            : null}
        </Select>
        <Select
          onSearch={handleCnangeInput}
          showSearch
          allowClear={true}
          onSelect={onHandleLocation}
          open={hideMenu}
          style={{ width: 200 }}
          defaultValue="Выберите Страну и введите Город"
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
            <a href="https://github.com/kilchevskii" target="_blank">
              <GithubOutlined />
            </a>
          </li>
          <li>
            <a href="https://t.me/westsmokes" target="_blank">
              <MailOutlined />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/westsmokes/" target="_blank">
            <LinkedinOutlined />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default HeaderBlock;
