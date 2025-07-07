import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import SearchBar from './components/SearchBar';
import { getCurrentWeather, getForecast, getCurrentLocationWeather, WeatherData, ForecastItem } from './services/weatherService';
import { CloudRain } from 'lucide-react';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (location: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(location),
        getForecast(location)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError('Unable to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = async () => {
    setGettingLocation(true);
    setError(null);
    
    try {
      const { weather: weatherData, forecast: forecastData } = await getCurrentLocationWeather();
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to get location');
    } finally {
      setGettingLocation(false);
    }
  };

  // Load default weather on mount
  useEffect(() => {
    handleSearch('New York');
  }, []);

  const getBackgroundGradient = (condition?: string) => {
    if (!condition) return 'from-blue-400 via-blue-500 to-blue-600';
    
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'from-yellow-400 via-orange-400 to-red-400';
      case 'clouds':
        return 'from-gray-400 via-gray-500 to-gray-600';
      case 'rain':
        return 'from-blue-400 via-blue-500 to-blue-600';
      case 'snow':
        return 'from-blue-200 via-blue-300 to-blue-400';
      case 'thunderstorm':
        return 'from-purple-400 via-purple-500 to-purple-600';
      default:
        return 'from-blue-400 via-blue-500 to-blue-600';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient(weather?.condition)} transition-all duration-1000`}>
      <div className="relative min-h-screen">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <CloudRain className="w-10 h-10 text-white" />
              <h1 className="text-4xl md:text-6xl font-bold text-white">WeatherNow</h1>
            </div>
            <p className="text-white/80 text-lg">Beautiful weather forecasts for anywhere in the world</p>
          </div>

          {/* Search Bar */}
          <SearchBar
            onSearch={handleSearch}
            onGetLocation={handleGetLocation}
            loading={loading}
            gettingLocation={gettingLocation}
          />

          {/* Error Message */}
          {error && (
            <div className="max-w-md mx-auto mb-8 bg-red-500/20 backdrop-blur-lg rounded-2xl border border-red-500/30 p-4">
              <p className="text-white text-center">{error}</p>
            </div>
          )}

          {/* Weather Cards */}
          <div className="space-y-8">
            {/* Current Weather */}
            <WeatherCard weather={weather} loading={loading} />

            {/* Forecast */}
            <ForecastCard forecast={forecast} loading={loading} />
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-white/60">
            <p>&copy; 2025 WeatherNow. Built with React & Tailwind CSS.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;