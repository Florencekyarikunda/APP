import axios from 'axios';


const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const apikey = '742d32a66ebe2e4e4c08f9594d9e2700';

export const getWeatherData = async (cityname) => {
    try{
        const {data} = await axios.get(baseUrl + `q=${cityname}&appid=${apikey}`)
        return data;
    }catch(error) {
        throw error;
    }
}