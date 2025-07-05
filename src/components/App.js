import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";
import Credit from "./Credit";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false,
  });

  const toDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  const search = async (event) => {
    if (event) {
      event.preventDefault();
    }
    
    if (!event || event.type === "click" || (event.type === "keypress" && event.key === "Enter")) {
      setWeather({ ...weather, loading: true, error: false });
      const searchQuery = query.trim() || "Kolkata";
      
      // Try multiple search approaches for better location coverage
      const searchTerms = [
        searchQuery,
        `${searchQuery}, India`,
        `${searchQuery}, USA`,
        `${searchQuery}, UK`,
        `${searchQuery}, Canada`,
        `${searchQuery}, Australia`
      ];

      let found = false;
      
      for (const term of searchTerms) {
        if (found) break;
        
        try {
          const url = `https://api.shecodes.io/weather/v1/current?query=${encodeURIComponent(term)}&key=b03a640e5ef6980o4da35b006t5f2942`;
          const res = await axios.get(url);
          
          if (res.data && res.data.city) {
            setWeather({ data: res.data, loading: false, error: false });
            found = true;
            break;
          }
        } catch (error) {
          console.log(`Failed to find: ${term}`);
          continue;
        }
      }
      
      if (!found) {
        setWeather({ ...weather, data: {}, error: true, loading: false });
        console.error("Location not found with any search variation");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.shecodes.io/weather/v1/current?query=Kolkata&key=b03a640e5ef6980o4da35b006t5f2942`;

      try {
        const response = await axios.get(url);
        setWeather({ data: response.data, loading: false, error: false });
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        console.error("Error fetching initial weather data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 relative overflow-hidden">
      {/* Animated background elements - responsive */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-pink-300/10 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-yellow-300/10 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 drop-shadow-lg px-2">
            Weather App
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 drop-shadow px-2">Get real-time weather updates</p>
        </div>
        
        <div className="bg-white/20 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto border border-white/30">
          <SearchEngine query={query} setQuery={setQuery} search={search} />

          {weather.loading && (
            <div className="text-center py-8 sm:py-12">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-white mx-auto"></div>
                <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-white/30 mx-auto"></div>
              </div>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl font-medium text-white drop-shadow px-2">
                Searching for weather data...
              </p>
            </div>
          )}

          {weather.error && (
            <div className="text-center py-8 sm:py-12">
              <div className="bg-red-500/20 border border-red-400/50 rounded-xl p-4 sm:p-6 mx-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-lg sm:text-xl font-bold text-white">
                  Sorry, location not found. Try with country name (e.g., "Paris, France")
                </p>
                <p className="text-sm sm:text-base text-white/80 mt-2">
                  We search globally for cities, towns, and villages
                </p>
              </div>
            </div>
          )}

          {weather && weather.data && weather.data.condition && (
            <Forecast weather={weather} toDate={toDate} />
          )}
        </div>
        <Credit />
      </div>
    </div>
  );
}

export default App;