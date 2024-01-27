
// Selecting DOM elements
const container = document.querySelector('.container');
const search = document.querySelector('.search-bar button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

// Event listener for search button click
search.addEventListener('click', () => {
    // API key for OpenWeatherMap
    const APIKey = 'cc6617cca7f6aaf5ddc55ed276b5f1bd';

    // Get the value entered in the search input field
    const city = document.querySelector('.search-bar input').value;

    // Check if the input is empty
    if (city == '') return;

    // Fetch weather data from OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            // Handle case when city is not found (404 error)
            if (json.cod == "404") {
                cityHide.textContent = city;
                container.style.height = "91vh";
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            // Update weather information based on API response
            const image = document.querySelector(".weather-box img");
            const temperature = document.querySelector(".weather-box .temperature");
            const description = document.querySelector(".weather-box .description");
            const humidity = document.querySelector(".weather-details .humidity span");
            const wind = document.querySelector(".weather-details .wind span");

            // Check if the city has changed
            if (cityHide.textContent == city) {
                return;
            } else {
                // Update city information and show weather details
                cityHide.textContent = city;
                container.style.height = "91vh";
                container.classList.add('active');
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');

                // Hide container after 2.5 seconds
                setTimeout(() => {
                    container.classList.remove('active');
                }, 2500);

                // Update weather image based on weather conditions
                switch (json.weather[0].main) {
                    // Cases for different weather conditions
                    case "Clear":
                        image.src = 'https://media.istockphoto.com/id/917178010/photo/road-panorama-on-sunny-spring-day.jpg?s=612x612&w=0&k=20&c=Sm1UVjrY0hh1d8lXAcxNaMLupf31Wgo0XVo5FT6Qj2s=';
                        break;
                    case "Rain":
                        image.src = 'https://media.istockphoto.com/id/898238970/photo/shower-in-the-garden-downpour-pouring-rain-in-the-summer.jpg?s=612x612&w=0&k=20&c=ykO_CJDjAYuf0HP8zHnc-XjAJ1qHWB0RkG2I2_a05bA=';
                        break;
                    case "Snow":
                        image.src = 'https://media.istockphoto.com/id/619537200/photo/winter-landscape.jpg?s=612x612&w=0&k=20&c=YdhK6FLfrx9SUcG_FPaRtQvxt20ElGDFV59m4W_4vOk=';
                        break;
                    case "Clouds":
                        image.src = 'https://render.fineartamerica.com/images/rendered/default/poster/8/5/break/images/artworkimages/medium/2/sky-sun-in-the-clouds-malerapaso.jpg';
                        break;
                    case "Mist":
                        image.src = 'https://kslnewsradio.com/wp-content/uploads/2023/09/29485531.jpeg';
                        break;
                    case "Haze":
                        image.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwsQNhX7MGmDHQACiH6GT1w1VvRr3l05eEfQ&usqp=CAU';
                        break;
                    case "Smoke":
                        image.src = 'https://media.wired.com/photos/5b8473dacde746582fe9ff00/master/w_2560%2Cc_limit/smokestorm-1021620844.jpg';
                        break;
                    case "Fog":
                        image.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMGfC5dL6HTDzVcGkJ5oIEPYqMuNB7thQ2ZQ&usqp=CAU';
                        break;
                    default:
                        image.src = 'https://img.freepik.com/premium-vector/illustrations-sun-cloud-rain-vector_356832-786.jpg';
                }

                // Update weather details with fetched data
                temperature.innerHTML = `${parseInt(json.main.temp)}<span> °C </span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

                // ...

                const infoWeather = document.querySelector('.info-weather');
                const infoHumidity = document.querySelector('.info-humidity');
                const infoWind = document.querySelector('.info-wind');

                const elCloneInfoWeather = infoWeather.cloneNode(true);
                const elCloneInfoHumidity = infoHumidity.cloneNode(true);
                const elCloneInfoWind = infoWind.cloneNode(true);

                // ...

                const cloneInfoWeather = document.querySelector('.info-weather.active-clone');
                const cloneInfoHumidity = document.querySelector('.info-humidity.active-clone');
                const cloneInfoWind = document.querySelector('.info-wind.active-clone');

                // ...

                if (cloneInfoWeather && cloneInfoHumidity && cloneInfoWind) {
                    cloneInfoWeather.classList.remove('active-clone');
                    cloneInfoHumidity.classList.remove('active-clone');
                    cloneInfoWind.classList.remove('active-clone');

                    setTimeout(() => {
                        cloneInfoWeather.remove();
                        cloneInfoHumidity.remove();
                        cloneInfoWind.remove();
                    }, 2200);
                }
            }
        });
});



