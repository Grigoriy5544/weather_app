import {ChangeEvent, useEffect, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getCoordinates} from "../../api/weather.ts";
import {Link} from "react-router-dom";
import styles from "./Find.module.scss"

const Find = () => {
    const [value, setValue] = useState<string>('')

    const coordinates = useQuery({queryKey: ['coordinates', value], queryFn: () => getCoordinates(value)})

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (value !== e.target.value && !!e.target.value)
            { // @ts-ignore
                coordinates.refetch(e.target.value)
            }

        setValue(e.target.value)
    }

    useEffect(() => {
        if (!!value)
            { // @ts-ignore
                coordinates.refetch(value)
            }
    }, [value])

    return (
        <div className={styles.main}>
            <div className={styles.find}>
                <input value={value} onChange={e => onChange(e)} type="text" placeholder="City"/>

                {coordinates.isLoading && "Loading..."}
                {coordinates.isSuccess && (
                    <>
                        {!coordinates.data[0] && "Not Found"}
                        <div>
                            {coordinates?.data?.map(city =>
                                <div key={city.lat}>
                                <Link onClick={() => window.localStorage.setItem("city", JSON.stringify(city))} to={"/"}>{city.local_names?.ru || city.name} {city.country}</Link>
                                <p>{city.state}</p> 
                                </div>
                            )}
                        </div>
                    </>
                )}
                {coordinates.isError && "Error"}
            </div>
        </div>
    );
};

export default Find;