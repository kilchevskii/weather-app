import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout, PageHeader } from "antd";
import HeaderBlock from "./components/HeaderBlock";
import WeatherCard from "./components/WeatherCard";
import {
  renderWeather,
} from "./components/redux/thunk/weatherThunk";
import BackGround from "./components/BackGround";
const { Content } = Layout;
function App() {
  const dispatch = useDispatch();
  const { data } = useSelector(({ weathers }) => weathers);
  useEffect(() => {
    dispatch(renderWeather());
    console.log('renderWeather');
  }, [dispatch]);
  return (
    <Content>
      <PageHeader>
        <div className="search-block">
          <HeaderBlock />
        </div>
      </PageHeader>
      <div className="weather-block">
        {data.length > 0 ? (
          data?.map((item, index) => (
            <WeatherCard
              key={index}
              nameCity={item?.data?.name}
              temperatureCity={item?.data?.main?.temp}
              humidityCity={item?.data?.main?.humidity}
              windPowerCity={item?.data?.wind?.speed}
              degWindCity={item?.data?.wind?.deg}
              pressureCity={item?.data?.main?.pressure}
              cityId={item?.data?.id}
              timeStamp={item?.data?.dt}
            />
          ))
        ) : (
          <BackGround />
        )}
      </div>
    </Content>
  );
}

export default App;
