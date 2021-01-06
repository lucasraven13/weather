import React, { useEffect, useState } from 'react';
import lodash from 'lodash';
import WeatherService from '../services/weatherService';
import Slider from '@material-ui/core/Slider';
import TempToColorConverterService from '../services/tempToColorConverterService';

function Weather(props) {
    const [iconCode, setIconCode] = useState();
    const [error, setError] = useState();
    const [isGeoLocationAvailable, setIsGeolocationAvailable] = useState(false);

    if ("geolocation" in navigator && !isGeoLocationAvailable) {
        navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
            if (permissionStatus.state === 'granted') {
                setIsGeolocationAvailable(true);
            } else {
                permissionStatus.onchange = function () {
                    setIsGeolocationAvailable(this.state === 'granted');
                };
            }
        });
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                WeatherService.getWeatherData(position.coords.latitude, position.coords.longitude).then((data) => {
                    props.setTemp(lodash.get(data, 'data.main.temp', '0'));
                    const iconCode = lodash.get(data, 'data.weather.0.icon');
                    setIconCode(`http://openweathermap.org/img/wn/${iconCode}@2x.png`);
                }).catch(error => {
                    console.error(error.message);
                    setError("Oops. Something went wrong");
                });
            },
            error => {
                console.error("Error Code = " + error.code + " - " + error.message);
                setError("Oops. Something went wrong");
            }
        );
    }, [isGeoLocationAvailable])

    return (
        <React.Fragment>
            {!isGeoLocationAvailable &&
                <h1>We can't fetch your location. Feels bad.</h1>}
            {isGeoLocationAvailable &&
                <React.Fragment>
                    {error && <h1>{error}</h1>}
                    {!error && iconCode &&
                        <React.Fragment>
                            <div className="main-wrapper">
                                <img src={iconCode} />
                                <p>{props.temp} ℃</p>
                            </div>
                            <div className="slider-wraper">
                                <Slider
                                    defaultValue={0}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    step={1}
                                    min={TempToColorConverterService._min.temp}
                                    max={TempToColorConverterService._max.temp}
                                    value={props.temp}
                                    onChange={(event, newValue) => { props.setTemp(newValue) }}
                                />
                            </div>
                        </React.Fragment>
                    }
                </React.Fragment>}
        </React.Fragment>
    );
}

export default Weather;