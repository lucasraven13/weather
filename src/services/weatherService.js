import axios from 'axios';

export default class WeatherService {
    static async getWeatherData(latitude, longtitude) {
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=c59e1bc11b91625ebad3a3b30c889468&units=metric`);
    }
}