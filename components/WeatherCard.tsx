import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind, Eye, Droplets, Thermometer } from 'lucide-react';

interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  feelsLike: number;
  pressure: number;
  uvIndex: number;
  icon: string;
}

interface WeatherCardProps {
  weather: WeatherData | null;
  loading: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, loading }) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="w-16 h-16 text-yellow-400" />;
      case 'clouds':
        return <Cloud className="w-16 h-16 text-gray-400" />;
      case 'rain':
        return <CloudRain className="w-16 h-16 text-blue-400" />;
      case 'snow':
        return <CloudSnow className="w-16 h-16 text-blue-200" />;
      case 'thunderstorm':
        return <CloudLightning className="w-16 h-16 text-purple-400" />;
      default:
        return <Sun className="w-16 h-16 text-yellow-400" />;
    }
  };

  const getBackgroundGradient = (condition: string) => {
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

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30 animate-pulse">
        <div className="space-y-6">
          <div className="h-8 bg-white/30 rounded-lg"></div>
          <div className="h-16 bg-white/30 rounded-lg"></div>
          <div className="h-24 bg-white/30 rounded-lg"></div>
        </div>
      </div>
    );
  }

  // Return null if weather data is not available and not loading
  if (!weather) {
    return null;
  }

  return (
    <div className={`w-full max-w-md mx-auto bg-gradient-to-br ${getBackgroundGradient(weather.condition)} rounded-3xl p-8 shadow-2xl border border-white/30 transform hover:scale-105 transition-all duration-300`}>
      <div className="text-center space-y-6">
        {/* Location */}
        <div className="text-white">
          <h2 className="text-2xl font-bold">{weather.location}</h2>
          <p className="text-white/80 text-sm">{weather.country}</p>
        </div>

        {/* Weather Icon and Temperature */}
        <div className="flex items-center justify-center space-x-4">
          {getWeatherIcon(weather.condition)}
          <div className="text-white">
            <div className="text-5xl font-bold">{Math.round(weather.temperature)}°</div>
            <div className="text-white/80 text-sm">Feels like {Math.round(weather.feelsLike)}°</div>
          </div>
        </div>

        {/* Weather Description */}
        <div className="text-white text-center">
          <p className="text-lg font-semibold capitalize">{weather.description}</p>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-white/90">
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Droplets className="w-5 h-5" />
              <div>
                <div className="text-sm text-white/70">Humidity</div>
                <div className="font-semibold">{weather.humidity}%</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Wind className="w-5 h-5" />
              <div>
                <div className="text-sm text-white/70">Wind</div>
                <div className="font-semibold">{weather.windSpeed} km/h</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <div>
                <div className="text-sm text-white/70">Visibility</div>
                <div className="font-semibold">{weather.visibility} km</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-5 h-5" />
              <div>
                <div className="text-sm text-white/70">Pressure</div>
                <div className="font-semibold">{weather.pressure} hPa</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
