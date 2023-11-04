import {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getWeather} from "../../api/weather.ts";
import styles from "./Home.module.scss"

const Home = () => {
    const city = JSON.parse(window.localStorage.getItem('city'))
    const navigate = useNavigate()

    useEffect(() => {
        if (!city)
            navigate("/find")
    }, [])

    const {data, isLoading} = useQuery({
        queryKey: ["weather", city.name + city.lat + city.lon],
        queryFn: () => getWeather(city.lat, city.lon),
    })

    if (isLoading)
        return "Loading"

    console.log('weather', data)

    return (
        <div className={styles.wrapper}>
            <div className={styles.app}>
                <div className={styles.left}>
                    <Link to="/find" className={styles.city}>{city.local_names?.ru || city.name}</Link>
                    <p>{data.weather[0].description}</p>
                    <p>Облачность: {data.clouds.all}%</p>
                    <p>Ветер: {data.wind.speed} м/с</p>
                </div>
                <div className={styles.right}>
                    <img
                        className={styles.icon}
                        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                        alt=""
                    />
                    <h1 className={styles.temp}>{Math.round(data.main.temp - 273.15)}°</h1>
                </div>
            </div>
        </div>
    );
};

export default Home;