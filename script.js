var apikey = "e6bab8c1acba11abbf5d2ad889b8c087";
var country = null;
var weatherDetails = null;
function displayDiv() {
    console.log("Displaying initial message...");
    let displayDiv = document.getElementById('countryInfo');

    let dis = `<h1 class=" mx-auto w-75 p-3">Search for a country to get details about Weather Forecast and country information.</h1>`;

    displayDiv.innerHTML = dis;
    
}


document.getElementById('search').addEventListener('input', function () {
    let searchValue = this.value.trim().toLowerCase();

    if (searchValue.length === 0) {
        document.getElementById('countryInfo').innerHTML = '';
        document.getElementById('moreInfo').innerHTML = '';
        displayDiv();
        return;
    }

    fetch(`https://restcountries.com/v3/name/${searchValue}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                country = data[0];
                let countryName = country.name.common;

                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${apikey}&units=metric`)
                    .then(response => response.json())
                    .then(weatherData => {
                        console.log('Weather data:', weatherData);
                        weatherDetails = {
                            temperature: weatherData.main.temp,
                            humidity: weatherData.main.humidity,
                            windSpeed: weatherData.wind.speed,
                            weatherDescription: weatherData.weather[0].description,
                            weatherIcon: weatherData.weather[0].icon,
                            sunrise: weatherData.sys.sunrise,
                            sunset: weatherData.sys.sunset
                        };

                        let html = `
                            <div class="col-md-6 mx-auto">
                              <div class="card">
                                <div class="d-flex flex-row justify-content-center">
                                    <div class="p-2">
                                        <h3>${countryName}</h3>
                                    </div>
                                    <div class="p-2">
                                        <img src="${country.flags[1]}" alt="${countryName}" style="width: 60px; height: auto;">
                                    </div>
                                </div>
                                  <div class="card-body mx-auto">
                                    <p>Capital: ${country.capital}</p>
                                    <p>Languages: ${Object.values(country.languages).join(', ')}</p>
                                    <p>Temperature: ${weatherDetails.temperature}°C</p>
                                    <button class="btn btn-primary mt-2" onclick="getCountryDetails('${countryName}')">More Details</button>
                                    <div class="country-details" id="${countryName.replaceAll(' ', '-')}Details"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          `;

                        document.getElementById('countryInfo').innerHTML = html;
                    })
                    .catch(error => console.error('Error fetching weather data:', error));
            } else {
                document.getElementById('countryInfo').innerHTML = '<h1 class="mx-auto">No country found!</h1>';
            }
        })
        .catch(error => console.error('Error fetching country data:', error));
});



function getCountryDetails(countryName) {
    console.log(weatherDetails.sunrise, weatherDetails.sunset);

let html= `
<div class="col-md-6 mx-auto">
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">More About ${countryName} </h4>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Official Name:</strong> ${country.name.official}</li>
                <li class="list-group-item"><strong>Subregion:</strong> ${country.subregion}</li>
                ${Object.entries(country.currencies).map(([code, currency]) => `
                    <li class="list-group-item"><strong>Currency (${code}):</strong> ${currency.name} (${currency.symbol})</li>
                `).join('')}
                <li class="list-group-item"><strong>Area:</strong> ${country.area} sq km</li>
                <li class="list-group-item"><strong>Population:</strong> ${country.population}</li>
                <li class="list-group-item"><strong>Continents:</strong> ${country.continents.join(', ')}</li>
                <li class="list-group-item"><strong>Flag:</strong> ${country.flag}</li>
            </ul>
        </div>
    </div>
</div>
<div class="col-md-6 mx-auto">
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">More Weather ${countryName}</h4>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Temperature:</strong> ${weatherDetails.temperature}°C</li>
                <li class="list-group-item"><strong>Humidity:</strong> ${weatherDetails.humidity}%</li>
                <li class="list-group-item"><strong>Wind Speed:</strong> ${weatherDetails.windSpeed} m/s</li>
                <li class="list-group-item"><strong>Description:</strong> ${weatherDetails.weatherDescription} <img src="http://openweathermap.org/img/wn/${weatherDetails.weatherIcon}.png" alt="Weather Icon"></li>
                <li class="list-group-item"><strong>Sunrise:</strong> ${new Date(weatherDetails.sunrise * 1000).toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka' })}</li>
                <li class="list-group-item"><strong>Sunset:</strong> ${new Date(weatherDetails.sunset * 1000).toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka' })}</li>
            </ul>
        </div>
    </div>
</div>
`
document.getElementById('moreInfo').innerHTML = html;
}


