const API_KEY = '8b7c4b5d8e9f2a3c6d1e7f8g9h0i1j2k'; // You'll need to get your own API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
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

export interface ForecastItem {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
}

// Mock data for demonstration (replace with actual API calls)
export const getCurrentWeather = async (location: string): Promise<WeatherData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock weather data
  const mockWeather: WeatherData = {
    location: location || 'New York',
    country: 'United States',
    temperature: 22,
    condition: 'Clear',
    description: 'Sunny',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    feelsLike: 25,
    pressure: 1013,
    uvIndex: 6,
    icon: '01d'
  };
  
  return mockWeather;
};

export const getForecast = async (location: string): Promise<ForecastItem[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock forecast data
  const mockForecast: ForecastItem[] = [
    {
      date: new Date().toISOString(),
      day: 'Today',
      high: 25,
      low: 18,
      condition: 'Clear',
      description: 'Sunny',
      humidity: 65,
      windSpeed: 12
    },
    {
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      day: 'Tomorrow',
      high: 23,
      low: 16,
      condition: 'Clouds',
      description: 'Partly cloudy',
      humidity: 70,
      windSpeed: 8
    },
    {
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      day: 'Wednesday',
      high: 21,
      low: 14,
      condition: 'Rain',
      description: 'Light rain',
      humidity: 85,
      windSpeed: 15
    },
    {
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      day: 'Thursday',
      high: 19,
      low: 12,
      condition: 'Rain',
      description: 'Heavy rain',
      humidity: 90,
      windSpeed: 20
    },
    {
      date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      day: 'Friday',
      high: 24,
      low: 17,
      condition: 'Clear',
      description: 'Clear sky',
      humidity: 60,
      windSpeed: 10
    }
  ];
  
  return mockForecast;
};

export const getCurrentLocationWeather = async (): Promise<{ weather: WeatherData; forecast: ForecastItem[] }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // In a real app, you'd use the coordinates to fetch weather data
          const weather = await getCurrentWeather('Your Location');
          const forecast = await getForecast('Your Location');
          resolve({ weather, forecast });
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        reject(new Error('Unable to retrieve your location'));
      }
    );
  });
};