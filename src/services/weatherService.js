import axios from 'axios';

export default class WeatherService {
    static async getWeatherData(latitude, longtitude) {
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${process.env.REACT_APP_GOOGLE_APIKEY}&units=metric`);
    }
}