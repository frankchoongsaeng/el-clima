import styled from 'styled-components';
import LargeText from '../components/LargeText';
import SearchBar from '../components/SearchBar';
import History from '../components/History';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';


const HomeLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
`;

const MainWeatherInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: white;
  padding: 0;
`;

const WeatherIcon = styled.img`
  align-self: center;
`;

const WeatherTemperature = styled.h1`
  font-size: 4.5rem;
  font-weight: 300;
  display: flex;
  align-items: flex-start;
  ::after {
    content: "o";
    font-size: 1.2rem;
    font-weight: 500;
    margin-top: 18px;
  }
`;

const Unit = styled.div`
  margin-top: 18px;
  margin-left: 15px;
`;

const SmallText = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
`;

const WeatherDescriptionWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  letter-spacing: 0.8px;
`;

const WeatherDescription = styled.div`
  display: flex;
  margin: 0 10px;
`;

const WeatherDescriptionText = styled.p`
  font-size: 0.8rem;
  font-weight: 400;
  color: white;
  :not(:first-child){ margin-left: 8px; }
`;

const Footer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 20px;
  color: white;
  background-color: black;
  position: absolute;
  bottom: 0;
  font-size: 80%;
  i {
    color: red;
    vertical-align: top;
    font-size: 180%;
  }
`;

const callApi = (query) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=9113b13f98a13c2b00f8a5bd81dbacc0&units=metric`)
}


export default function Home(props) {

  const [weatherdata, setWeatherdata] = useState({});
  const [history, setHistory] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isRequesting, setIsRequesting] = useState(true);
  const weatherdataRef = useRef({});
  const isNewSearch = useRef(false);

  const onSearch = (query) => {
    setIsRequesting(true);
    
    callApi(query)
    .then( res => {
      setWeatherdata((oldWeatherData) => {
        if( JSON.stringify(weatherdataRef.current) === JSON.stringify(res.data) ){
          isNewSearch.current = false;
          return oldWeatherData;
        }
        isNewSearch.current = true;
        weatherdataRef.current = oldWeatherData;
        return res.data;
      });
    })
    .catch(err => alert("Error fetching data"))
    .then(() => setIsRequesting(false))

  }

  useEffect(() => {
    setDataLoaded(() => {
      if(Object.keys(weatherdata).length > 0) return true;
      return false;
    });

    if (Object.keys(weatherdataRef.current).length > 0) {
      setHistory(oldHistory => {

        if(!isNewSearch.current)
          return [weatherdataRef.current, ...oldHistory.slice(1)];
        
        return [weatherdataRef.current, ...oldHistory]
      });
    }

  }, [weatherdata])



  useEffect(() => {

    onSearch("Accra");

  }, [])


  return (
    <>
      <HomeLayout>
        <SearchBar onSearch={onSearch} isRequesting={isRequesting} defaultVal="Accra" />
        <LargeText>{dataLoaded ? weatherdata.name + ", " + weatherdata.sys.country : "Loading..."}</LargeText>
        <MainWeatherInfoContainer>
          <WeatherIcon src={dataLoaded ? `http://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png` : "-"} alt="weather icon" />
          <WeatherTemperature>{dataLoaded ? weatherdata.main.temp : "0"}</WeatherTemperature>
          <Unit>
            <LargeText>C</LargeText>
          </Unit>
        </MainWeatherInfoContainer>
        <LargeText>{dataLoaded ? weatherdata.weather[0].description : "Loading..."}</LargeText>
        <SmallText>Updated as of {dataLoaded ? Intl.DateTimeFormat('en', { hour: "numeric", minute: "numeric", hour12: true }).format(new Date(weatherdata.dt * 1000)) : "-:-"} </SmallText>
        <WeatherDescriptionWrapper>
          <WeatherDescription>
            <WeatherDescriptionText>Feels Like</WeatherDescriptionText>
            <WeatherDescriptionText>{dataLoaded ? weatherdata.main.feels_like : "-"} &deg;</WeatherDescriptionText>
          </WeatherDescription>
          <WeatherDescription>
            <WeatherDescriptionText>Wind</WeatherDescriptionText>
            <WeatherDescriptionText><i className='bx bxs-paper-plane'></i> {dataLoaded ? weatherdata.wind.speed : "-"}km/h</WeatherDescriptionText>
          </WeatherDescription>
          <WeatherDescription>
            <WeatherDescriptionText>Visibility</WeatherDescriptionText>
            <WeatherDescriptionText>{dataLoaded ? weatherdata.visibility / 1000 : "-"} km</WeatherDescriptionText>
          </WeatherDescription>
        </WeatherDescriptionWrapper>
        <History historylist={history} />
        <Footer>
          Made with <i className='bx bxs-heart'></i> - <span>Frank Choongsaeng</span>
        </Footer>
      </HomeLayout>
    </>
  )
}