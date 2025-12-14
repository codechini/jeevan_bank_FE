import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center px-4">
      {/* SVG Background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="200" cy="150" r="80" fill="none" stroke="#6e11b0" strokeWidth="2" />
        <circle cx="1000" cy="600" r="120" fill="none" stroke="#6e11b0" strokeWidth="2" />
        <rect x="400" y="300" width="150" height="150" fill="none" stroke="#6e11b0" strokeWidth="2" />
        <path d="M 100 500 Q 300 300 500 500 T 900 500" fill="none" stroke="#6e11b0" strokeWidth="2" />
      </svg>

      {/* Content Container */}
      <div className="relative z-10 text-center max-w-md">
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-9xl font-black text-purple-600 drop-shadow-lg">404</h1>
          <div className="h-1 w-24 bg-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg"
          >
            Go Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
