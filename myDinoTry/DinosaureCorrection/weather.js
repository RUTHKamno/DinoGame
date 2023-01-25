export function meteo(lat,lon){
   
    let world = document.getElementsByClassName("world");

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a9a5baaaf477ee005ae9cdd2f280eaad&units=metric&lang=en`

fetch(url).then( response => response.json().then(data => {
    console.log(data);
    
    /*document.querySelector("#city").innerHTML = data.name;
    document.querySelector("#temp").innerHTML = data.main.temp + '°';
    document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
    document.querySelector("#wind").innerHTML ="<i class='fa-solid fa-wind'></i>" + data.wind.speed + "km/h";
  */
 
    switch(data.weather[0].main)
    {
      case ("Clouds"):
        {
          // changer le background du monde avec une image nuageause
           /* let im1 = document.createElement("img")
            im1.src = "./ASSETS/R.jfif";
            world.appendChild(im1);*/
            world.classList.add("cloud");
        }
        break;
      case ("Rain"):
        {
          //télécharger une image giff d'un nuage avec plui et mettre dans une petite zone
          //world.style.background = "url(./ASSETS/R.gif)"
         // world.innerHTML = `<img src = "./ASSETS/R.gif" >`
         world.classList.add("Rain");
        }
        break;
        
      case ("Snow"):
        {
            //world.innerHTML = `<img src = "./ASSETS/tempsnuageux1.jfif" >`
        // world.style.background = "url(./ASSETS/tempsnuageux1.jfif)"
        world.classList.add("Snow");
        }
        break;
      case ("Clear"):
        {
          // changer le background du monde avec une image du soleil
          //world.innerHTML = `<img src = "./ASSETS/R (1).jfif" >`
          //world.style.background = "url(./ASSETS/R (1).jfif)"
          //world.classList.add("clear");
          world.classList.add("clear");
        }
        break;

      case ("Fog"):
        {
          // changer le background du monde avec une image de brouillard
          //world.innerHTML = `<img src = "./ASSETS/R (7).jfif" >`
          //world.style.background = "url(./ASSETS/R (7).jfif)"
          world.classList.add("Fog");
        }
        break;
    }
    /*if (data.weather[0].description == "peu nuageux" || data.weather[0].description == "nuageux")
    {
    world.style.background = "url(tempsnuageux1.jfif)"
    }*/
    
    
})
);

}
