const inputBox=document.querySelector('.input-box');
const searchBtn=document.getElementById('searchBtn');
const weather_img=document.querySelector('.weather-img');
const temperature=document.querySelector('.temperature');
const description=document.querySelector('.description');
const wind_speed=document.querySelector('#wind-speed');
const humidity=document.getElementById('humidity');
const location_not_found=document.querySelector('.location-not-found ');
const weather_body=document.querySelector('.weather-body');





async function checkweather(city){
const api_key="2583b500e8463d9d8af1ca44530a31e4";
const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
try{
  const response=await fetch(url);
  const weatherData=await response.json();
  //check if 404 then display location not found
  if(weatherData.cod==='404'){
    location_not_found.style.display='flex';
    weather_body.style.display='none';
    
    console.log("error")
    return; 
}

if(!response.ok){
    throw new Error('Request failed.Pleased try later ')
}



weather_body.style.display='flex';
location_not_found.style.display='none';
temperature.innerHTML=`${Math.round(weatherData.main.temp-273.15)}°C`;
description.innerHTML=`${weatherData.weather[0].description}`;
humidity.innerHTML=`${weatherData.main.humidity}%`;
wind_speed.innerHTML=`${weatherData.wind.speed}km/h`;

switch(weatherData.weather[0].main){
    case 'Clouds':
        weather_img.src="image/cloud.png";
        break;
    case 'Clear':
        weather_img.src="image/clear.png";
        break;
    case 'Rain':
        weather_img.src="image/rain.png";
        break;
    case 'Mist':
        weather_img.src="image/mist.png";
        break;
    case 'Snow':
        weather_img.src="image/snow.png";
        break;        

}
}
catch (error){
  
    
    console.log(error);

}


}

//add event listner click on search 
searchBtn.addEventListener('click',()=>{
    checkweather(inputBox.value);//take input value in inputbox and pass in checkweather function
});
