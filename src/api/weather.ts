import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_KEY

export const getWeather = async (lat: string, lon: string) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=ru`
    const {data} = await axios.get(url)

    return data

}

interface IGetCoordinates {
    name: string;
    state: string;
    lat: number;
    lon: number;
    local_names: any;
    country: string
}

export const getCoordinates = async (cityName: string, limit: number): Promise<IGetCoordinates[]> => {
    const url: string = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName || "New York"}&limit=${limit || 5}&appid=${apiKey}`
    const {data} = await axios.get(url)

    return data
}