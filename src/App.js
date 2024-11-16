import React, { useEffect, useState } from 'react'
const api={
  key:"bd2280e0de19ba94653620a94060eb70",
  base:"http://api.openweathermap.org/data/2.5/",
}
function App() {
  const [query,setQuery]=useState('');
  const [wheather,setWheather]=useState({});

  const search = (e) => {
    if (e.key === "Enter" && query) { // Trigger fetch only on Enter key
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWheather(result);
          setQuery(''); // Clear the search input after fetching data
          console.log(result);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    }
  };
  const dateBuilder = (d) =>{
    let months=["Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sup","Oct","Nov","Dec"];
    let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    let day=days[d.getDay()];
    let date=d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`
  
  }
  return (
    <div className={(typeof wheather.main != 'undefined') ? ((wheather.main.temp > 16)? 'app warm' : 'app'):'app'}>
      <main>
        <div className='search-box'>
          <input
          type='text'
          className='search-bar'
          placeholder='search...'
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof wheather.main != "undefined") ? (
          <div>
          <div className='location-box'>
          <div className='location'>{wheather.name},{wheather.sys.country}</div>
          <div className='date'>{dateBuilder(new Date())}</div>
        </div>
        <div className='wheather-box'>
          <div className='temp'>{Math.round(wheather.main.temp)}°C</div>
          <div className='wheather'>{wheather.weather[0].main}</div>
        </div>
        </div>
        ):(
          <div className='invalid'>
            <h1>Enter Valid City</h1>
          </div>
        )}
      </main>
    </div>
  )
}

export default App