 const apiKey = "741726fba4142e015056256b6ec9b92b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const waterCard = document.getElementById("waterLevel");

waterCard.hidden = true;

const riverData = {
  "rabat": { river: "Bouregreg", level: 1.85 },
  "sale": { river: "Bouregreg", level: 1.85 },
  "kenitra": { river: "Sebou", level: 2.80 },
  "fes": { river: "Sebou", level: 2.10 },
  "meknes": { river: "Sebou", level: 1.95 },
  "larache": { river: "Loukkos", level: 1.20 },
  "marrakech": { river: "Tensift", level: 0.85 },
  "agadir": { river: "Souss", level: 0.60 },
  "tetouan": { river: "Martil", level: 1.10 },
  "khenifra": { river: "Oum Er-Rbia", level: 2.75 },
  "beni mellal": { river: "Oum Er-Rbia", level: 2.60 },
  "oujda": { river: "Moulouya", level: 1.40 },
  "zagora": { river: "Draa", level: 0.45 },
  "errachidia": { river: "Ziz", level: 0.90 }
};

function checkWaterLevel(city) {
  waterCard.hidden = true;
  const cityLower = city.toLowerCase().trim();
  const data = riverData[cityLower];
  if (!data) return;

  document.getElementById("waterValue").textContent = `${data.level.toFixed(2)} m`;
  document.getElementById("waterStation").textContent = `${data.river} River`;
  document.getElementById("waterUpdated").textContent = `City: ${city}`;
  waterCard.hidden = false;

  if (data.level >= 5.0) {
    alert(`FLOOD ALERT!\n${data.river} River reached ${data.level.toFixed(2)} m in ${city}\nImmediate evacuation required!`);
  } else if (data.level >= 3.5) {
    alert(`WARNING! High level!\n${data.river} River: ${data.level.toFixed(2)} m in ${city}\nStay away from river banks.`);
  } else if (data.level >= 2.5) {
    alert(`Notice: ${data.river} River elevated: ${data.level.toFixed(2)} m in ${city}`);
  }
}

async function checkWeather(city){
    if(!city) return;
    const response = await fetch(`${apiUrl}${encodeURIComponent(city)}&appid=${apiKey}`);
    var data = await response.json();

    if(data.cod == "404"){
        alert("City not found!");
        waterCard.hidden = true;
        return;
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main == "Clouds") weatherIcon.src="images/Clouds.png";
    else if(data.weather[0].main == "Clear") weatherIcon.src="images/Clear.png";
    else if(data.weather[0].main == "Rain") weatherIcon.src="images/Rain.png";
    else if(data.weather[0].main == "Drizzle") weatherIcon.src="images/Drizzle.png";
    else if(data.weather[0].main == "Mist") weatherIcon.src="images/Mist.png";
    else if(data.weather[0].main == "Snow") weatherIcon.src="images/Snow.png";

    checkWaterLevel(data.name);
}

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value.trim());
})
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value.trim());
    }
})