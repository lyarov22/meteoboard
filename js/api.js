const lat = 43.25;
const lon = 76.95;

const apiKey = 'd3af57dad31e71d00ca10d9816e1fa9b';
const airApiKey = '2722587e6b20d2867c7951e25b079e467f18a370';

const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${apiKey}&lang=ru&units=metric`;
const airPollutionUrl = `https://api.waqi.info/feed/almaty?token=${airApiKey}`

function getWeatherIconUrl(weatherIconId) {
    return `https://openweathermap.org/img/wn/${weatherIconId}@4x.png`;
}

function getWindDescription(windSpeed) {
    if (windSpeed >= 0 && windSpeed <= 0.2) return "штиль";
    if (windSpeed >= 0.3 && windSpeed <= 1.5) return "тихий ветерок";
    if (windSpeed >= 1.6 && windSpeed <= 3.3) return "легкий бриз";
    if (windSpeed >= 3.4 && windSpeed <= 5.4) return "слабый бриз";
    if (windSpeed >= 5.5 && windSpeed <= 7.9) return "умеренный бриз";
    if (windSpeed >= 8.0 && windSpeed <= 10.7) return "свежий бриз";
    if (windSpeed >= 10.8 && windSpeed <= 13.8) return "сильный бриз";
    if (windSpeed >= 13.9 && windSpeed <= 17.1) return "крепкий ветер";
    if (windSpeed >= 17.2 && windSpeed <= 20.7) return "очень крепкий ветер (буря)";
    if (windSpeed >= 20.8 && windSpeed <= 24.4) return "сильная буря";
    if (windSpeed >= 24.5 && windSpeed <= 28.4) return "полная буря";
    if (windSpeed >= 28.5 && windSpeed <= 32.6) return "жестокая буря";
    if (windSpeed >= 32.7) return "ураган (тайфун)";
    return "Неизвестная скорость ветра";
}

function getWeatherDescription(weatherCode) {
    switch (weatherCode) {
        case 200:
            return "гроза с легким дождем";
        case 201:
            return "гроза с дождем";
        case 202:
            return "сильная гроза с дождем";
        case 210:
            return "легкая гроза";
        case 211:
            return "гроза";
        case 212:
            return "сильная гроза";
        case 221:
            return "рваная гроза";
        case 230:
            return "гроза с легкой моросью";
        case 231:
            return "гроза с моросью";
        case 232:
            return "сильная гроза с моросью";
        case 300:
            return "легкая морось";
        case 301:
            return "морось";
        case 302:
            return "сильная морось";
        case 310:
            return "легкий дождь";
        case 311:
            return "дождь";
        case 312:
            return "сильный дождь";
        case 313:
            return "ливень и морось";
        case 314:
            return "сильный ливень и морось";
        case 321:
            return "легкий ливень";
        case 500:
            return "легкий дождь";
        case 501:
            return "умеренный дождь";
        case 502:
            return "сильный дождь";
        case 503:
            return "очень сильный дождь";
        case 504:
            return "экстремальный дождь";
        case 511:
            return "ледяной дождь";
        case 520:
            return "небольшой ливень";
        case 521:
            return "ливень";
        case 522:
            return "сильный ливень";
        case 531:
            return "рваный ливень";
        case 600:
            return "легкий снег";
        case 601:
            return "снег";
        case 602:
            return "сильный снегопад";
        case 611:
            return "дождь со снегом";
        case 612:
            return "легкий мокрый снег";
        case 613:
            return "мокрый снег";
        case 615:
            return "дождь со снегом";
        case 616:
            return "дождь и снег";
        case 620:
            return "легкий снегопад";
        case 621:
            return "снегопад";
        case 622:
            return "сильный снегопад";
        case 701:
            return "дымка";
        case 711:
            return "дым";
        case 721:
            return "мгла";
        case 731:
            return "пыльная буря";
        case 741:
            return "туман";
        case 751:
            return "песок";
        case 761:
            return "пыль";
        case 762:
            return "вулканический пепел";
        case 771:
            return "шквал";
        case 781:
            return "торнадо";
        case 800:
            return "ясно";
        case 801:
            return "малооблачно";
        case 802:
            return "рассеянные облака";
        case 803:
            return "облачно с прояснениями";
        case 804:
            return "пасмурно";
        default:
            console.log(weatherCode);
            return "Неизвестный код погоды";
    }
}



function fetchWeatherData() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка при запросе данных: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            displayCurrentWeather(data);
            displayHourlyWeather(data);
            displayDailyWeather(data);
            console.log(data);
        })
        .catch(error => {
            console.error('Ошибка:', error);
            setInterval(fetchWeatherData, 600000)
        });
}

function fetchAirQuality() {
    fetch(airPollutionUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка при запросе данных: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const aqiIndex = data.data.aqi;
            displayAQI(aqiIndex);
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

function displayAQI(aqiIndex) {
    const aqiElement = document.getElementById('aqi');
    aqiElement.textContent = aqiIndex;
}

function getTimeUntilSunEvent(eventTime) {
    const now = new Date();
    const eventParts = eventTime.split(':');
    const eventHour = parseInt(eventParts[0], 10);
    const eventMinute = parseInt(eventParts[1], 10);

    const eventDate = new Date();
    eventDate.setHours(eventHour);
    eventDate.setMinutes(eventMinute);
    eventDate.setSeconds(0);

    let timeDiff = eventDate.getTime() - now.getTime();
    if (timeDiff < 0) {
        // Если время события уже прошло, добавляем сутки
        eventDate.setDate(eventDate.getDate() + 1);
        timeDiff = eventDate.getTime() - now.getTime();
    }

    const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
    timeDiff -= hoursLeft * (1000 * 60 * 60);
    const minutesLeft = Math.floor(timeDiff / (1000 * 60));
    timeDiff -= minutesLeft * (1000 * 60);
    const secondsLeft = Math.floor(timeDiff / 1000);

    return {
        hours: hoursLeft,
        minutes: minutesLeft,
        seconds: secondsLeft
    };
}

function updateCounter() {
    const sunriseTime = localStorage.getItem('sunriseTime');
    const sunsetTime = localStorage.getItem('sunsetTime');

    const sunriseRemaining = getTimeUntilSunEvent(sunriseTime);
    const sunsetRemaining = getTimeUntilSunEvent(sunsetTime);

    let nextEvent;
    let eventLabel;

    if (sunriseRemaining.hours < sunsetRemaining.hours) {
        nextEvent = sunriseRemaining;
        eventLabel = "до рассвета";
    } else {
        nextEvent = sunsetRemaining;
        eventLabel = "до заката";
    }

    const infoCountdownElement = document.getElementById('infoCountdown');
    infoCountdownElement.textContent = eventLabel;
    const countdownElement = document.getElementById('countdown');
    countdownElement.textContent = `${nextEvent.hours}:${nextEvent.minutes}:${nextEvent.seconds}`;
}




function displayCurrentWeather(data) {
    const currentWeather = data.current;
    const time = new Date(currentWeather.dt * 1000).toLocaleTimeString([], { hour12: false });
    const windDirection = getWindDirection(currentWeather.wind_deg);

    const sunriseDate = new Date(currentWeather.sunrise * 1000);
    const sunsetDate = new Date(currentWeather.sunset * 1000);
    
    const sunriseHours = sunriseDate.getHours().toString().padStart(2, '0');
    const sunriseMinutes = sunriseDate.getMinutes().toString().padStart(2, '0');
    const sunriseTime = `${sunriseHours}:${sunriseMinutes}`;
    
    const sunsetHours = sunsetDate.getHours().toString().padStart(2, '0');
    const sunsetMinutes = sunsetDate.getMinutes().toString().padStart(2, '0');
    const sunsetTime = `${sunsetHours}:${sunsetMinutes}`;

    localStorage.setItem('sunriseTime', sunriseTime);
    localStorage.setItem('sunsetTime', sunsetTime);
    
    const feelsLike = currentWeather.feels_like;
    const wind = currentWeather.wind_speed;
    const windDescription = getWindDescription(wind);

    const weather = getWeatherDescription(currentWeather.weather[0].id);
    const info = `Ощущается как ${Math.round(feelsLike)}°C. ${windDescription}, ${weather}`;
    const statusIcon = getWeatherIconUrl(currentWeather.weather[0].icon);

    document.getElementById('12:560').textContent = `${Math.round(currentWeather.temp)}°C`;
    document.getElementById('15:2778').textContent = `${currentWeather.humidity}`;
    document.getElementById('apiTime').textContent = `Алматы, Коянды 44 | Обновлено: ${time}`;
    document.getElementById('sunrise').textContent = sunriseTime;
    document.getElementById('sunset').textContent = sunsetTime;
    document.getElementById('15:2771').textContent = `${Math.round(currentWeather.wind_speed)}`;
    document.getElementById('15:2774').textContent = `${windDirection}`;
    document.getElementById('info').textContent = info;
    document.getElementById('uvi').textContent = Math.round(currentWeather.uvi);
    document.getElementById('statusIcon').src = statusIcon;
}

function displayHourlyWeather(data) {
    // Цикл по первым 7 часам
    for (let i = 0; i < 7; i++) {
        const hour = data.hourly[i];
        
        // Получаем необходимые данные для текущего часа
        const time = new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        const temperature = Math.round(hour.temp) + '°';
        const weatherIconId = hour.weather[0].icon;
        const weatherIcon = getWeatherIconUrl(weatherIconId);
        
        // Формируем id элементов в нужном формате
        const idTime = `00${i + 1}1`;      // Номер элемента + номер подэлемента для времени
        const idIcon = `00${i + 1}2`;      // Номер элемента + номер подэлемента для иконки
        const idTemperature = `00${i + 1}3`; // Номер элемента + номер подэлемента для температуры
        
        // Устанавливаем значения элементам
        document.getElementById(idTime).textContent = time;
        document.getElementById(idIcon).src = weatherIcon;
        document.getElementById(idTemperature).textContent = temperature;
    }
}

function displayDailyWeather(data) {
    // Опции для форматирования даты
    const dateOptions = { day: 'numeric', month: 'long' };
    const dayOptions = { weekday: 'long' };

    // Цикл по дням в массиве daily
    data.daily.slice(0, 7).forEach((day, index) => {
        // Получаем дату и день недели
        const dateObj = new Date(day.dt * 1000);
        const formattedDate = dateObj.toLocaleDateString('ru-RU', dateOptions);
        const dayOfWeek = dateObj.toLocaleDateString('ru-RU', dayOptions);

        // Получаем иконку погоды
        const weatherIconId = day.weather[0].icon;  // Исправлено для корректного индексации
        const weatherIcon = getWeatherIconUrl(weatherIconId);

        // Получаем максимальную и минимальную температуру
        const maxTemp = `${Math.round(day.temp.day)}°C`;
        const minTemp = `${Math.round(day.temp.night)}°C`;

        // Формируем id элемента в нужном формате
        const idDate = `01${index + 1}1`;
        const idDayOfWeek = `01${index + 1}2`;
        const idIcon = `01${index + 1}3`; 
        const idMax = `01${index + 1}4`;  
        const idMin = `01${index + 1}5`;

        // Устанавливаем значения элементам
        document.getElementById(idDayOfWeek).textContent = dayOfWeek;
        document.getElementById(idDate).textContent = formattedDate;
        document.getElementById(idIcon).src = weatherIcon;
        document.getElementById(idMax).textContent = maxTemp;
        document.getElementById(idMin).textContent = minTemp;
    
    });
}

function getWindDirection(degree) {
    const directions = [
        "С", "СВ", "В", "ЮВ", 
        "Ю", "ЮЗ", "З", "СЗ"
    ];
    
    const index = Math.round(degree / 22.5) % 16;
    return directions[index];
}


fetchWeatherData();
fetchAirQuality();

setInterval(updateCounter, 1000);

setInterval(fetchWeatherData, 600000);
setInterval(fetchAirQuality, 600000);
