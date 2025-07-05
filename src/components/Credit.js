import React from "react";

export default function Credit() {
  return (
    <div className="text-center text-white/70 py-4 sm:py-6 mt-6 sm:mt-8 px-2">
      <p className="text-xs sm:text-sm leading-relaxed">
        Coded by
        <a 
          href="https://www.linkedin.com/in/subhro-mohanta/" 
          className="text-yellow-300 font-medium hover:text-yellow-200 mx-1 transition duration-300 underline"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Subhro Mohanta
        </a>
        •
        <a 
          href="https://github.com/shemmee/React-Weather-App" 
          className="text-yellow-300 font-medium hover:text-yellow-200 mx-1 transition duration-300 underline"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Open sourced on Github
        </a> 
        <br className="sm:hidden" />
        <span className="hidden sm:inline">•</span> Hosted on Render
      </p>
    </div>
  );
}