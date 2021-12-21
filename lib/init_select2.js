import $ from 'jquery';
import 'select2';

const initSelect2 = () => {
  const cities = ["Amsterdam", "Bali", "Barcelona", "Belo Horizonte", "Berlin", "Bordeaux", "Brussels", "Buenos Aires", "Casablanca", "Chengdu", "Copenhagen", "Kyoto", "Lausanne", "Lille", "Lisbon", "London", "Lyon", "Madrid", "Marseille", "Melbourne", "Mexico", "Milan", "Montréal", "Nantes", "Oslo", "Paris", "Rio de Janeiro", "Rennes", "Rome", "São Paulo", "Seoul", "Shanghai", "Shenzhen", "Singapore", "Stockholm", "Tel Aviv", "Tokyo"];
  $('#city-input').select2({ data: cities, width: '100%' });
};

const eventSelect2 = () => {
  const displayCity = document.querySelector("#cityname");
  const displayIcon = document.querySelector("#icon");
  const description = document.querySelector("p");
  const dateToday = document.querySelector("h3");
  const displayDegree = document.querySelector("#degree");

  $('#city-input').on('select2:select', (e) => {
    displayCity.innerHTML = "";
    displayIcon.innerHTML = "";
    description.innerHTML = "";
    dateToday.innerHTML = "";
    const city = e.params.data.text;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ceb40363cc1ecb6625ef5c496a59252d`;
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        // const li = `${city}`;
        // displayCity.insertAdjacentHTML("beforeend", li);
        displayCity.innerText = city;
        const iconOne = data.weather[0].icon;
        displayIcon.setAttribute("src", `https://openweathermap.org/img/wn/${iconOne}@2x.png`);
        // const icon = `<img src="https://openweathermap.org/img/wn/${iconOne}@2x.png" alt="Weather Icon"></img>`;
        // displayIcon.insertAdjacentHTML("afterbegin", icon);
        const about = data.weather[0].description;
        // const listAbout = `${about}`;
        // description.insertAdjacentHTML("beforeend", listAbout);
        description.innerText = about;
        const degree = data.main.temp;
        console.log(degree);
        displayDegree.innerText = degree;
        // const listDegree = `<h2 mt-3><strong>${degree}C°</strong></h2>`;
        // displayIcon.insertAdjacentHTML("beforeend", listDegree);


        //
        const today = new Date();
        const localOffset = data.timezone + today.getTimezoneOffset() * 60;
        const localDate = new Date(today.setUTCSeconds(localOffset));
        const options = {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        };
        const localDateDE = localDate.toLocaleDateString('en-US', options);
        dateToday.insertAdjacentHTML("beforeend", localDateDE);
      });
  });
};


export { initSelect2, eventSelect2 };
