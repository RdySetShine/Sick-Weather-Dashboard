
const form = document.querySelector('form');

const cityInput = document.querySelector('#city-Input');

const forecastList = document.querySelector('#forecastList');

const savedCity = document.querySelector('#savedCity');

let city;

const apiKey = 'b597f5e5f54657c8bf6c7fabe873a3f3'; // Replace with your own OpenWeatherMap API key

form.addEventListener('submit', (event) => {

  event.preventDefault(); // Prevent the form from submitting and refreshing the page
  city = cityInput.value;

  // Check if the city is not empty
  if (city.trim() !== '') {
    // Get the existing cities from the localStorage, or create an empty array if it's not set yet
    const cities = JSON.parse(localStorage.getItem('cities') || '[]');
    if (!cities.includes(city)) {

      // Add the new city to the array
      if (cities != city) {
        cities.push(city);
        // Save the updated array to the localStorage
        localStorage.setItem('cities', JSON.stringify(cities));
        showCities();

      }

    }

  }

  getData(city) // it makes it go search the name and run the code inside

});
function showCities() {
  if (savedCity) {
    savedCity.innerHTML = '';

  }

  const cities1 = JSON.parse(localStorage.getItem('cities') || '[]');

  cities1.forEach(city => {
    const listItem = document.createElement('li');
    listItem.textContent = city;
    listItem.classList.add('historyBtn');
    if (savedCity) {
      savedCity.appendChild(listItem);
      listItem.addEventListener('click', () => {
        const selectedCity = listItem.textContent;
        cityInput.value = selectedCity;
        getData(selectedCity);
      });
    }

    // listItem.addEventListener('click', getdata() => {
    // alert("hello");

  });

}
showCities();

//To show history of previous searches
// adds a Click function to every li which is being created  

const getData = (city) => {

  // Make a request to the OpenWetherMap API to get the weather data for the specified city
  console.log(city)
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)

    // =``= it makes curleys blue to acces the variable and its the back tick
    // fetch = w'ere fecthing data from a url, used for api's

    .then(response => response.json())

    .then(data => {

      // I will want to loop this array with a 2nd function for 5 day forcarst. and the = will change depending on the array chosen.

      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const Day1Weather = document.querySelector('#day1')
      const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

      Day1Weather.innerHTML =
        `
        <li>Temperature: ${temperature} 'C </li>
        <li>Humidity: ${humidity} % </li>
        <li>Wind Speed: ${windSpeed} km/h <img src=${iconURL}></li>
        `
        ;
    })

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {

      forecastList.innerHTML = '';

      // console.log(data);

      let count = 0;

      for (var i = 0; i < data.list.length; i++) {

        const newDate = data.list[i].dt_txt;

        if (newDate.split(" ").pop() === "12:00:00") {

          // console.log(data.list[i].main.temp);

          // as long as there is data this (for) loop will occur
          // then we assign the value for this particular loop

          const forecastWeather_Icon = data.list[i].weather[0].icon;
          const forecast_temp = Math.floor(data.list[i].main.temp);
          const forecast_humidity = data.list[i].main.humidity;
          const forecast_windspeed = data.list[i].wind.speed;
          const dtText = data.list[i].dt_txt;

          // console.log(dtText);

          // now we assign a particular values to html doc to display them

          var createCard = document.createElement("div");

          // += ( adds on to a element that is already created)

          createCard.className = "card-body";
          createCard.innerHTML += `<h4>Future Forecast</h4>`;
          createCard.innerHTML += `<p class="temp">Temp: ${forecast_temp} 'C`;
          createCard.innerHTML += `<img src="https://openweathermap.org/img/w/${forecastWeather_Icon}.png">`;
          createCard.innerHTML += `<p>Humidity: ${forecast_humidity} %`;
          createCard.innerHTML += `<p>Wind: ${forecast_windspeed} km/h`;
          createCard.innerHTML += `<p>Date: ${dtText}`;

          forecastList.appendChild(createCard);

          count++; // Increment the counter

          // if (count === 4) { // Break out of the loop once 5 forecast cards have been created
          //   break;
          // }

        }
      }

    });

}


// Objective 2: Display name of current Citys weather
// Objective 3: style webpage accordingly



// the fiveday forcast is returned as an array of 40 items, the reason is bec they are doing every 3 hours for each of the 5 days. 8 entries for each day bec 8 x 5 = 40
// when using the data pic ka # from 1~7 and then when looping through it you make a new card for each number you request. choose every 5 items in the array so it lives to true to the 5 day


// ** http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key} **
// we use this url to call for each city that is requested. all that is needed and (lat) and (lon).

// ** api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key} ** this url is the request the 5 day forcast.
// As well as that is required is the (lat) and (lon) as previous request

// make a function and start small, step by step, ex console log function then fetch and then consol data and then adjust depending on what is requested.




