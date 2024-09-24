import React, { useState, useEffect } from "react";
import axios from "axios";
import './index.css'; // Import the CSS file to apply the background image

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [foodImages, setBankImages] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("payment");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true);
      fetchBankImages(); // Fetch images on login
    }
  };

  const fetchBankImages = async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        headers: {
          Authorization: 'Client-ID XQU8xxCychhdTDNdCaSz7q--tyZil0CEJkMon4Nh_E8'
        },
        params: {
          query: searchQuery,
          per_page: 12
        }
      });
      if (response.data.results.length > 0) {
        setBankImages(response.data.results.map(img => img.urls.small));
        setError(null); // Clear any previous errors
      } else {
        setBankImages([]); // Clear previous images
        setError("No food images found.");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setBankImages([]); // Clear previous images
      setError("Failed to load images. Please try again later.");
    }
  };

  const showPassword = () => {
    alert(`Your password is: ${password}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBankImages();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-custom">
      {/* Welcome card */}
      <div className="absolute top-4 bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md">
        Welcome to Transaction Images
      </div>

      {/* Main container */}
      <div className={`bg-gray-800 p-8 rounded-lg shadow-lg ${isLoggedIn ? 'w-full max-w-4xl' : 'w-full max-w-md'}`}>
        {!isLoggedIn ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md shadow-sm bg-gray-700 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md shadow-sm bg-gray-700 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-200">Welcome, {username}!</h2>
              <button
                onClick={showPassword}
                className="bg-gray-600 text-gray-200 py-2 px-4 rounded-md shadow hover:bg-gray-500 transition-colors"
              >
                Show Password
              </button>
            </div>
            <form onSubmit={handleSearch} className="mb-4 flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 w-full border rounded-md shadow-sm bg-gray-700 text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search for payment images..."
              />
              <button
                type="submit"
                className="ml-2 bg-green-600 text-white py-2 px-4 rounded-md shadow hover:bg-green-700 transition-colors"
              >
                Search
              </button>
            </form>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : foodImages.length > 0 ? (
              <div className="grid grid-cols-4 gap-4">
                {foodImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Delicious food ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Loading images...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;