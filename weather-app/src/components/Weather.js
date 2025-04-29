import React, { useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.svg';
import humidity_icon from '../assets/humidity.svg';
import wind_icon from '../assets/wind.svg';

 const Weather=() =>{
  const [city,setCity]=useState('');
  const [weatherData,setWeatherData]=useState(false);
  const [icon,setIcon]=useState('');
  const [errorMessage,setErrorMessage]=useState('');

  const search= async(city)=>{
    if(city !== ''){
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      try {
        const response=await fetch(url);
        const data=await response?.json();
        console.log(data)
        if(!response.ok){
          setErrorMessage('Please enter valid city name.')
        }
        setWeatherData({
          humidity: data?.main?.humidity,
          windSpeed: data?.wind?.speed,
          temperature: Math.floor(data?.main?.temp),
          location: data?.name,
          description: data?.weather[0]?.main
        })
        setIcon(data?.weather[0]?.icon)
      } catch (error) {
        setWeatherData(false)
        console.log(error,'Error')
      }
    }
  }
  const iconUrl=`https://openweathermap.org/img/wn/${icon}@2x.png`;
  return (
    <div className='weather'>
      <h3>Please enter city name to check weather.</h3>
      <div className='search-bar'>
      <input type='text' value={city} placeholder='search' onChange={
        (e)=>{
          setCity(e.target.value)
        }
      } />
      <img src={search_icon} alt='search' onClick={()=>{
        search(city);
        setCity('')
        }}/>
      </div>
      {weatherData? 
        <>
          <img src={iconUrl} alt='clear' className='weather-icon'/>
          <p className='temprature'>{weatherData.temperature} C</p>
          <p className='description'>{weatherData.description} </p>
          <p className='location'>{weatherData.location} </p>
          <div className='weather-data'> 
            <div className='col'>
              <img src={humidity_icon} alt='' />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={wind_icon} alt='' />
              <div>
                <p>{weatherData.windSpeed} km/hr</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
        :
        <>
        <h3 className='errorMsg'>{errorMessage}</h3>
        </>
        }
      
    </div>
  )
}
export default Weather;
