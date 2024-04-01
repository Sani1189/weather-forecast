var apikey = "e6bab8c1acba11abbf5d2ad889b8c087";
document.getElementById('search').addEventListener('input', function() {
    let searchValue = this.value.trim().toLowerCase();
  
    if (searchValue.length === 0) {
      document.getElementById('countryInfo').innerHTML = '';
      return;
    }
    let weatherDetails = {};
  
    fetch(`https://restcountries.com/v3/name/${searchValue}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          let country = data[0];
          let countryName = country.name.common;

          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${apikey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        weatherDetails = {
            temperature: data.main.temp,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            weather: data.weather[0].description
            
        };
        console.log(weatherDetails);
      })
      .catch(error => console.error('Error fetching weather data:', error));
      
  
          let html = `
            <div class="col-md-6 mx-auto">
              <div class="card">
                <div class="d-flex flex-row justify-content-center">
                    <div class="p-2">
                        <h3>${country.name.common}</h3>
                    </div>
                    <div class="p-2">
                        <img src="${country.flags[1]}" alt="${country.name.common}" style="width: 100px; height: auto;">
                    </div>
                </div>
                  <div class="card-body">
                    <p>Capital: ${country.capital}</p>
                    <p>Languages: ${Object.values(country.languages).join(', ')}</p>
                    <p>Temperature: ${weatherDetails.temperature}°C</p>
                    <button class="btn btn-primary mt-2" onclick="getCountryDetails('${country.name.common}')">More Details</button>
                    <div class="country-details" id="${country.name.common.replaceAll(' ', '-')}Details"></div>
                  </div>
                </div>
              </div>
            </div>
          `;
          document.getElementById('countryInfo').innerHTML = html;
        } else {
          document.getElementById('countryInfo').innerHTML = '<p>No country found!</p>';
        }
      })
      .catch(error => console.error('Error fetching country data:', error));
  });
  
  function getCountryDetails(countryName) {
    fetch(`https://restcountries.com/v3/name/${countryName}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          let country = data[0];
          let countryDetails = `
            <p>Capital: ${country.capital}</p>
            <p>Population: ${country.population}</p>
            <p>Area: ${country.area} square kilometers</p>
            <p>Region: ${country.region}</p>
            <p>Subregion: ${country.subregion}</p>
            <p>Languages: ${Object.values(country.languages).join(', ')}</p>
            <div id="${countryName.replaceAll(' ', '-')}Weather"></div>
          `;
          document.getElementById(`${countryName.replaceAll(' ', '-')}Details`).innerHTML = countryDetails;
        } else {
          document.getElementById(`${countryName.replaceAll(' ', '-')}Details`).innerHTML = '<p>No additional details available.</p>';
        }
      })
      .catch(error => console.error('Error fetching country details:', error));
  }
  
  function fetchWeatherData(countryName) {
    var apikey = "e6bab8c1acba11abbf5d2ad889b8c087";
    
  }
  
  