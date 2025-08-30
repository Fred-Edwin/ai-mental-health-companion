import { NextRequest, NextResponse } from 'next/server';

interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    if (!city) {
      return NextResponse.json(
        { error: 'City parameter is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      // Fallback to mock data if no API key
      return NextResponse.json({
        city,
        temperature: Math.floor(Math.random() * 30) + 10,
        description: 'Partly cloudy',
        humidity: Math.floor(Math.random() * 40) + 40,
        message: `The weather in ${city} is partly cloudy with a temperature around ${Math.floor(Math.random() * 30) + 10}°C.`
      });
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: `City "${city}" not found` },
          { status: 404 }
        );
      }
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data: WeatherResponse = await response.json();

    const weatherInfo = {
      city: data.name,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      message: `The weather in ${data.name} is ${data.weather[0].description} with a temperature of ${Math.round(data.main.temp)}°C and ${data.main.humidity}% humidity.`
    };

    return NextResponse.json(weatherInfo);

  } catch (error) {
    console.error('Error fetching weather:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}