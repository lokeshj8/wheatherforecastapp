import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';

interface ForecastItem {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
}

interface ForecastCardProps {
  forecast: ForecastItem[];
  loading: boolean;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, loading }) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="w-8 h-8 text-yellow-400" />;
      case 'clouds':
        return <Cloud className="w-8 h-8 text-gray-400" />;
      case 'rain':
        return <CloudRain className="w-8 h-8 text-blue-400" />;
      case 'snow':
        return <CloudSnow className="w-8 h-8 text-blue-200" />;
      case 'thunderstorm':
        return <CloudLightning className="w-8 h-8 text-purple-400" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-400" />;
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">
        <div className="space-y-4">
          <div className="h-8 bg-white/30 rounded-lg w-48"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-white/30 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">
      <h3 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h3>
      
      <div className="space-y-4">
        {forecast.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-white font-semibold w-20">
                  {index === 0 ? 'Today' : item.day}
                </div>
                
                <div className="flex items-center space-x-3">
                  {getWeatherIcon(item.condition)}
                  <div className="text-white">
                    <div className="font-semibold capitalize">{item.description}</div>
                    <div className="text-sm text-white/70">
                      Humidity: {item.humidity}% • Wind: {item.windSpeed} km/h
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-white text-right">
                <div className="text-xl font-bold">
                  {Math.round(item.high)}°<span className="text-white/60">/{Math.round(item.low)}°</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
