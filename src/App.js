import React from 'react';
import './App.css';
import {useState} from 'react';
import {useEffect} from 'react'
import{getWeatherData} from './app_component/weatherapi';
import {ScaleLoader} from 'react-spinners';


function App(){
  const [weatherdata, setWeatherData] = useState(null);
  const [city, setCity] = useState('Kampala');
  const [loading, setLoading] = useState(false);


  const getData = async () => {
    try{
      setLoading(true);
      const data = await getWeatherData(city);
      setWeatherData(data);
      setLoading(false);

    }catch(error) {
      console.log(error.message);
      setLoading(false);
    }
  }
  const override = `
  display:block;
  margin:0 auto;
  border-color:red;
  `;

  useEffect(() => {
    getData();
  
  },[]);
  return (
    <div className="App">
      <div className="card">
        <h2 className="title"><i className="far fa-cloud"></i>Weather App</h2>
            <div className="search-form">
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder = "Enter city name"/>
            <button type="button" onClick={() => getData()}>Get Weather</button>

      </div>
      <div className="main-container">
       <h4>Live Weather Condition</h4>
      </div>
      {loading ?(
        <div className="loader-container">
        <ScaleLoader
        css ={override}
        size = {200}
        color = {"#fff"}
        loading = {loading}
        />
      </div>

      ):(
         <>
          {weatherdata !== null ? (
          <div className="main-container">
            <div className="weather-icon">
            <i className="fal fa-sun-haze"></i>
            
            </div>
            <h3>{weatherdata.weather[0].main}</h3>
            <div className="temprature">
              <h1>{parseFloat(weatherdata.main.temp - 273.15).toFixed(1)}&deg;C</h1>
            </div>
            <div className="location">
              <h3><i className="fa fa-street-view"></i>{weatherdata.name} | {weatherdata.sys.country}</h3>
            </div>
            <div className="temprature-range">
              <h6>Min: {parseFloat(weatherdata.main.temp_min - 273.15).toFixed(1)}&deg;C 
              || Max: {parseFloat(weatherdata.main.temp_max - 273.15).toFixed(1)}&deg;C 
              || Humidity: {weatherdata.main.humidity}%</h6>
            </div>
        </div>
        ) : null}
          </>
        ) }       
      </div>
    </div>
  );
}

export default App;