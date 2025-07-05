import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Forecast({ weather, toDate }) {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [celsius, setCelsius] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      if (weather.data && weather.data.city) {
        try {
          const url = `https://api.shecodes.io/weather/v1/forecast?query=${weather.data.city}&key=b03a640e5ef6980o4da35b006t5f2942`;
          const response = await axios.get(url);
          setForecast(response.data.daily.slice(0, 5));
          setLoading(false);
        } catch (error) {
          console.error("Error fetching forecast data:", error);
          setLoading(false);
        }
      }
    };

    fetchForecast();
  }, [weather.data]);

  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  };

  const toggleTemperature = () => {
    setCelsius(!celsius);
  };

  const convertTemp = (temp) => {
    if (celsius) {
      return Math.round(temp);
    } else {
      return Math.round((temp * 9) / 5 + 32);
    }
  };

  if (!weather.data || !weather.data.city) {
    return null;
  }

  return (
    <div className="text-white">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 drop-shadow-lg px-2">
          {weather.data.city}, {weather.data.country}
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-white/80 font-medium drop-shadow px-2">
          {toDate()}
        </p>
      </div>

      <div className="flex flex-col xl:flex-row items-center justify-center gap-6 sm:gap-8 mb-8 sm:mb-10">
        <div className="text-center order-2 xl:order-1">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl">
            <img 
              src={weather.data.condition.icon_url} 
              alt={weather.data.condition.description}
              className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto drop-shadow-lg"
            />
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mt-3 sm:mt-4 capitalize drop-shadow px-2">
              {weather.data.condition.description}
            </p>
          </div>
        </div>

        <div className="text-center order-1 xl:order-2">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold flex items-center justify-center drop-shadow-lg">
            {convertTemp(weather.data.temperature.current)}
            <span 
              className="text-2xl sm:text-3xl lg:text-4xl ml-1 sm:ml-2 cursor-pointer hover:text-yellow-300 transition duration-300"
              onClick={toggleTemperature}
              title="Click to toggle temperature unit"
            >
              °{celsius ? "C" : "F"}
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/80 mt-2 px-2">
            Feels like {convertTemp(weather.data.temperature.feels_like)}°{celsius ? "C" : "F"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
        <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 flex items-center shadow-lg">
          <div className="bg-blue-500/30 rounded-full p-2 sm:p-3 mr-3 sm:mr-4 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base sm:text-lg font-semibold text-white truncate">Humidity</p>
            <p className="text-xl sm:text-2xl font-bold text-white">{weather.data.temperature.humidity}%</p>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 flex items-center shadow-lg">
          <div className="bg-green-500/30 rounded-full p-2 sm:p-3 mr-3 sm:mr-4 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base sm:text-lg font-semibold text-white truncate">Wind Speed</p>
            <p className="text-xl sm:text-2xl font-bold text-white">{Math.round(weather.data.wind.speed)} km/h</p>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 flex items-center shadow-lg sm:col-span-2 lg:col-span-1">
          <div className="bg-yellow-500/30 rounded-full p-2 sm:p-3 mr-3 sm:mr-4 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base sm:text-lg font-semibold text-white truncate">Pressure</p>
            <p className="text-xl sm:text-2xl font-bold text-white">{weather.data.temperature.pressure || 'N/A'} hPa</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-6 sm:py-8">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-white mx-auto"></div>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/80">Loading forecast...</p>
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-white drop-shadow">5-Day Forecast</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {forecast.map((day, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 text-center hover:bg-white/30 transition duration-300 shadow-lg">
                <p className="font-semibold text-white mb-2 text-sm sm:text-base">{formatDay(day.time)}</p>
                <div className="flex justify-center mb-2 sm:mb-3">
                  <img 
                    src={day.condition.icon_url} 
                    alt={day.condition.description}
                    className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow"
                  />
                </div>
                <p className="text-white text-sm sm:text-base">
                  <span className="font-bold text-base sm:text-lg">{convertTemp(day.temperature.maximum)}°</span>
                  <br />
                  <span className="text-white/70 text-xs sm:text-sm">{convertTemp(day.temperature.minimum)}°</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}