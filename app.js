const weatherapi = {
    key: "365f7c0cf7e10fcc70712f2f5be7a156",
    baseurl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchinputbox = document.getElementById('input-box');

// Event listener function on keypress
searchinputbox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        console.log(searchinputbox.value);
        getweatherreport(searchinputbox.value);
        document.querySelector('.weather-body').style.display = "block"; // Show weather body when a city is entered
    }
});

// Get weather reports
function getweatherreport(city) {
    fetch(`${weatherapi.baseurl}?q=${city}&appid=${weatherapi.key}&units=metric`) // &units=metric for converting temp to Celsius
        .then(weather => {
            return weather.json();
        })
        .then(showweatherreport);
}

// Show weather report
function showweatherreport(weather) {
    console.log(weather);

    // Change city name
    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    // Show temperature
    let temperature = document.getElementById("temp");
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`; // Display integer temperature

    // Show min and max temperature
    let minmaxtemp = document.getElementById("min-max");
    minmaxtemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    // Show weather type
    let weathertype = document.getElementById("weather");
    weathertype.innerHTML = `${weather.weather[0].main}`;

    // Manage date
    let date = document.getElementById("date");
    let todaydate = new Date();
    date.innerHTML = dateManage(todaydate);

    // Change background image based on weather type
    if (weathertype.textContent == "Clear") {
        document.body.style.backgroundImage = "url('images/clear1.jpg')";
    } else if (weathertype.textContent == "Clouds") {
        document.body.style.backgroundImage = "url('images/cloud1.jpg')";
    } else if (weathertype.textContent == "Thunderstorm") {
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
    } else if (weathertype.textContent == "Sunny") {
        document.body.style.backgroundImage = "url('images/sunny.jpg')";
    } else if (weathertype.textContent == "Rain") {
        document.body.style.backgroundImage = "url('images/rain1.jpg')";
    } else if (weathertype.textContent == "Haze") {
        document.body.style.backgroundImage = "url('images/bg.jpg')";
    } else if (weathertype.textContent == "Snow") {
        document.body.style.backgroundImage = "url('images/snow1.jpg')";
    }
}

// Manage date
function dateManage(dateArgument) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArgument.getFullYear();
    let month = months[dateArgument.getMonth()];
    let date = dateArgument.getDate();
    let day = days[dateArgument.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}
