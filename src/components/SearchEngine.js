import React from "react";

export default function SearchEngine({ query, setQuery, search }) {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search(event);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 sm:mb-8">
      <input
        type="text"
        className="flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl border-none bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-500 placeholder-opacity-75 focus:outline-none focus:ring-4 focus:ring-white/50 focus:bg-white transition duration-300 text-base sm:text-lg shadow-lg w-full"
        placeholder="Search any city, town, or village..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 w-full sm:w-auto font-medium"
        onClick={search}
        aria-label="Search weather"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="sm:hidden">Search Weather</span>
      </button>
    </div>
  );
}