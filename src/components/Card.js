import styled, { keyframes } from "styled-components";
import fadeIn from "react-animations/lib/fade-in";


const CardWrapper = styled.div`
  font-size: 80%;
  max-width: 132px;
  min-height: 180px;
  width: 100%;
  color: white;
  border: 1px solid white;
  border-radius: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  transition: all 0.2s linear;
  animation: .6s ${keyframes`${fadeIn}`};
  :not(:first-child) {
    margin-left: 5px;
  }
  .card-body {
    flex: 1;
    padding: 5px 5px;
    .location{

    }
    img {
      margin-top: 10px;
      margin-bottom: -10px; 
      width: 40px;
    }
    .temperature {
      font-size: 200%;
    }
    .weather-info {
      margin-top: -5px;
    }
  }
  .card-footer {
    font-size: 70%;
    text-align: center;
    border: 1px solid white;
    bottom: 0;
    margin: 0;
  }
`;

export default function Card(props) {

  return (
    <>
      <CardWrapper>
        <div className="card-body" >
          <p className="location"> {`${props.data.name}, ${props.data.sys.country}`} </p>
          <img src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`} alt="weather icon" onError={() => alert("error loading image")} />
          <p className="temperature">{props.data.main.temp}&deg;</p>
          <p className="weather-info">{props.data.weather[0].description}</p>
        </div>
        <div className="card-footer">
          Checked at {Intl.DateTimeFormat("en", { hour12: true, hour: "numeric", minute: "numeric" }).format(new Date(props.data.dt * 1000))}
        </div>
      </CardWrapper>
    </>
  )
}