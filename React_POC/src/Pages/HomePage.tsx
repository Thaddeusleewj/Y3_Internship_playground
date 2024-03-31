/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";

// Importing firebase modules
import firebase from "firebase/app";
import "firebase/auth";

// Importing stylesheet
import "./css/Home.css";

// Importing Icons
import { BsCloudSun } from "react-icons/bs";

// Declaring interface classes
interface WeatherApiObject {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

const Home = () => {
  // State variables
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [username, setUsername] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [weather, setWeather] = useState<WeatherApiObject | null>(null);

  const api = {
    key: "e4165de89fa756ae03a478d8bf02f781",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  useEffect(() => {
    const fetchWeather = () => {
      fetch(`${api.base}weather?q=Singapore&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result: WeatherApiObject) => {
          setWeather(result);
          console.log("weather api result", result);
        });
    };

    fetchWeather();
  }, []);

  return (
    <div className="m-10">
      <div className="flex space-x-10">
        <div className="wrapper aspect-video w-1/2 bg-transparent border-2 border-white border-opacity-20 backdrop-blur-30 shadow-md text-white rounded-10 p-5 md:p-10 text-sm md:text-lg">
          <div className="flex items-center space-x-5">
            <img
              src="/"
              alt="Profile"
              className="aspect-square w-20 bg-white rounded-full"
            />
            <div className="flex flex-col w-full">
              <div className="text-lg">Hello</div>
              <div className="flex items-center space-x-2">
                <div
                  className={`aspect-square w-3 h-3 rounded-full ${
                    isOnline ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <div>{isOnline ? "Online" : "Offline"}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper aspect-video w-1/2 bg-transparent border-2 border-white border-opacity-20 backdrop-blur-30 shadow-md text-white rounded-10 p-5 md:p-10 text-sm md:text-lg">
          <div className="flex space-x-3 items-end">
            <BsCloudSun size='4em' />
            <div className="text-4xl">{weather?.main?.temp}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
