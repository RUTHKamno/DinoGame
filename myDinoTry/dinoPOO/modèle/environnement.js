// le fichier environnement à pour méthode: evoluer()

export  class World{
    // attributs de la classe World

    goal;
    time;
    weather;
    groundElem;
    Clouds;
    wordElem;
    timeElem
    constructor(groundProperty, CloudsProperty, timeProperty, worldProperty, timeElemProperty )
    {
        this.groundElem = groundProperty;
        this.Clouds = CloudsProperty;
        this.time = timeProperty;
        this.wordElem = worldProperty;
        this.timeElem = timeElemProperty
    }
    
    evoluer(){
        let leftIncrementWorld = 0;
        let leftIncrementClouds = 0;
        //let leftProperty = getComputedStyle(this.ciel).getPropertyValue("left")
        //console.log(leftProperty);
        setInterval(() => {
            leftIncrementWorld -= 3;
            leftIncrementClouds -= 6;
            this.Clouds.style["background-position"] = leftIncrementClouds+"px";
            this.groundElem.style["background-position"] = leftIncrementWorld+"px";
            this.wordElem.style['background-position'] = leftIncrementWorld+"px";
           // console.log(leftProperty)
        }, 800) 
    }
    date(){
        if (this.time == 6){
            this.timeElem.style['background'] = "url('./ASSETS/R (1).jfif')"
            this.timeElem.style['background-repeat'] = "repeat-x";
            this.timeElem.style['background-size'] = "cover";
            this.timeElem.style['background-color'] = "none";
        }
        else 
        {
            if (this.time >6 && this.time <= 17)
            {
                this.timeElem.style['background'] = "url('./ASSETS/soleil.png')"
                this.timeElem.style['background-repeat'] = "repeat-x";
                this.timeElem.style['background-size'] = "cover";
                this.timeElem.style['background-color'] = "none";
            }
            else{
                this.timeElem.style['background'] = "url('./ASSETS/night.jfif')"
                this.timeElem.style['background-repeat'] = "repeat-x";
                this.timeElem.style['background-size'] = "cover";
                this.timeElem.style['background-color'] = "none";
            }
        }
    }
    meteo(){
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=3.86667&lon=11.51667&appid=a9a5baaaf477ee005ae9cdd2f280eaad&units=metric&lang=en`

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
                     //world.classList.add("cloud");
                  this.wordElem.style.background = 'url("./ASSETS/Clouds.jpg")'
                  this.wordElem.style['background-repeat'] = "repeat-x";
                this.wordElem.style['background-size'] = "cover";
                this.wordElem.style['background-color'] = "none";
                 }
                 break;
                 case ("Fog"):
                    {
                      // changer le background du monde avec une image nuageause
                       /* let im1 = document.createElement("img")
                        im1.src = "./ASSETS/R.jfif";
                        world.appendChild(im1);*/
                        //world.classList.add("cloud");
                        this.wordElem.style['background-image'] = "url('./ASSETS/fog.jpg')";
                        this.wordElem.style['background-repeat'] = "repeat-x";
                this.wordElem.style['background-size'] = "cover";
                this.wordElem.style['background-color'] = "none";
                    }
                    break;
               case ("Rain"):
                 {
                   //télécharger une image giff d'un nuage avec plui et mettre dans une petite zone
                   //world.style.background = "url(./ASSETS/R.gif)"
                  // world.innerHTML = `<img src = "./ASSETS/R.gif" >`
                  //world.classList.add("Rain");
                  this.wordElem.style.backgroundImage = 'url("./ASSETS/R.gif")'
                  this.wordElem.style['background-repeat'] = "repeat-x";
                this.wordElem.style['background-size'] = "cover";
                this.wordElem.style['background-color'] = "none";
                 }
                 break;
                 
               case ("Snow"):
                 {
                     //world.innerHTML = `<img src = "./ASSETS/tempsnuageux1.jfif" >`
                 // world.style.background = "url(./ASSETS/tempsnuageux1.jfif)"
                 //world.classList.add("Snow");
                 this.wordElem.style.backgroundImage = 'url("./ASSETS/tempsnuageux1.jfif")'
                 this.wordElem.style['background-repeat'] = "repeat-x";
                this.wordElem.style['background-size'] = "cover";
                this.wordElem.style['background-color'] = "none";
                 }
                 break;
               case ("Clear"):
                 {
                   // changer le background du monde avec une image du soleil
                   //world.innerHTML = `<img src = "./ASSETS/R (1).jfif" >`
                   //world.style.background = "url(./ASSETS/R (1).jfif)"
                   //world.classList.add("clear");
                   //world.classList.add("clear");
                   this.wordElem.style.backgroundImage = 'url("./ASSETS/beauTemps.png")'
                   this.wordElem.style['background-repeat'] = "repeat-x";
                this.wordElem.style['background-size'] = "cover";
                this.wordElem.style['background-color'] = "none";
                 }
                 break;
         
               case ("Mist"):
                 {
                   // changer le background du monde avec une image de brouillard
                   //world.innerHTML = `<img src = "./ASSETS/R (7).jfif" >`
                   this.wordElem.style.backgroundImage = 'url("./ASSETS/Mist.jfif")'
                   this.wordElem.style['background-repeat'] = "repeat-x";
                   this.wordElem.style['background-size'] = "cover";
                   this.Clouds.style['background-image'] = "none";
                   //console.log("bonjour");
                   //world.classList.add("Fog");
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
    
}