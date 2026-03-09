import React, { useState, useEffect } from 'react';
import { Search, MapPin, Wind, Droplets, Thermometer, CloudRain, Sun, Cloud, Snowflake, Zap, AlertCircle, X } from 'lucide-react';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_BASE = 'https://api.openweathermap.org/data/2.5/';

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchWeather = async (city) => {
        if (!API_KEY) {
            setError('API Key missing. Please check the .env file.');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE}weather?q=${city}&units=metric&APPID=${API_KEY}`);
            if (response.status === 401) {
                throw new Error('Invalid API Key. Please check your OpenWeatherMap credentials.');
            }
            if (!response.ok) {
                throw new Error('City not found. Please try again.');
            }
            const data = await response.json();
            setWeather(data);
            setQuery('');
        } catch (err) {
            setError(err.message);
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            fetchWeather(query);
        }
    };

    useEffect(() => {
        fetchWeather('London'); // Default city
    }, []);

    const getWeatherIcon = (main) => {
        switch (main) {
            case 'Clear': return <Sun className="w-16 h-16 text-yellow-400" />;
            case 'Clouds': return <Cloud className="w-16 h-16 text-gray-400" />;
            case 'Rain': return <CloudRain className="w-16 h-16 text-blue-400" />;
            case 'Snow': return <Snowflake className="w-16 h-16 text-blue-200" />;
            case 'Thunderstorm': return <Zap className="w-16 h-16 text-purple-400" />;
            default: return <Cloud className="w-16 h-16 text-gray-400" />;
        }
    };

    return (
        <main className="dashboard-container animate-fade-in">
            {/* App Header */}
            <div className="app-branding">
                <h1 className="app-title">Modern Weather Dashboard</h1>
                <p className="app-subtitle">Real-time insights for any city worldwide</p>
            </div>

            {/* Search Header */}
            <header className="search-section glass-panel">
                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-input-wrapper">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search for a city..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <button type="submit" className="search-button">
                        Search
                    </button>
                </form>
            </header>

            {/* Error Message */}
            {error && (
                <div className="error-banner glass-panel">
                    <AlertCircle className="error-icon" />
                    <p>{error}</p>
                    <button onClick={() => setError(null)} className="error-close">
                        <X size={16} />
                    </button>
                </div>
            )}

            {/* Main Weather Content */}
            {weather && !loading && (
                <div className="weather-content">
                    <section className="current-weather glass-panel">
                        <div className="location-info">
                            <MapPin size={24} className="accent-text" />
                            <h1>{weather.name}, {weather.sys.country}</h1>
                        </div>

                        <div className="weather-main-display">
                            <div className="temp-section">
                                <span className="temperature">{Math.round(weather.main.temp)}°</span>
                                <span className="condition">{weather.weather[0].description}</span>
                            </div>
                            <div className="icon-wrapper">
                                {getWeatherIcon(weather.weather[0].main)}
                            </div>
                        </div>

                        <div className="weather-stats-grid">
                            <div className="stat-card">
                                <Wind className="stat-icon" />
                                <div className="stat-info">
                                    <span className="stat-value">{weather.wind.speed} m/s</span>
                                    <span className="stat-label">Wind Speed</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <Droplets className="stat-icon" />
                                <div className="stat-info">
                                    <span className="stat-value">{weather.main.humidity}%</span>
                                    <span className="stat-label">Humidity</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <Thermometer className="stat-icon" />
                                <div className="stat-info">
                                    <span className="stat-value">{Math.round(weather.main.feels_like)}°C</span>
                                    <span className="stat-label">Feels Like</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {loading && (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Fetching weather data...</p>
                </div>
            )}
        </main>
    );
}

export default App;
