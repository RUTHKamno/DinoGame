import { setupGround, updateGround} from './ground.js'
import { updateDino, setupDino, getDinoRect, setDinoLose,/* debout, courber*/ } from "./DinoElem.js"
import { updateCactus, setupCactus, getCactusRects,getPteroRects } from "./cactus.js"
import { tenPlayers } from './tenPlayers.js'
//import { meteo } from './weather.js'
//import { geoFindMe } from "./latitude.js";

/* PREMIER CHALLENGE: MISE A L'ECHELLE MONDIALE Du jeu */ 

let world = document.getElementsByClassName("world");
const WORLD_WIDTH = 100
// valeur par défaut de la largeur du monde
const WORLD_HEIGHT = 30
// valeur par défaut de la hauteur du monde
const SPEED_SCALE_INCREASE = 0.01
var MAX_Score = 0
let goodPlayers = document.getElementById("goodPlayers");
/*on ajoute une partie de notre code: 
c'est la partie monde on veut faire en sorte que notre 
monde s'adapte en fonction de la taille d'écran de chaque machine*/
const worldElem = document.querySelector('[data-world]')
 //console.log(worldElem) les deux renvoit la meme chose 
/*const worldElem = document.querySelector('.world')
console.log(worldElem)*/
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")
let name = document.getElementById("name");
let nom ;
const new_score_max = document.getElementById("score_max") ;

setPixelToWorldScale()// son but est d'afficher un monde chaque fois que le nombre de pixels de notre écran est modifié 
window.addEventListener("resize", setPixelToWorldScale)
// on s'assure qu'a chaque redimensionnement de l'écran, notre fonction est appellé
document.addEventListener("keydown", handleStart, { once: true})
// la fonction handleStart ne va s'éxécuter qu'une seule fois après elle sera détruite ceci à partir de l'attribut once



function setPixelToWorldScale(){
    let worldToPixelScale 
    // nombre de pixels calculé
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) 
    {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH
    }
    /* si la largeur de l'écran / hauteur de l'écran < largeur par défaut du monde / hauteur par défaut du monde
    nombredepixels = largeur de l'écran / l'argeur du monde
    on définit le nombre de pixels en fonction des largeurs parce que c'est le facteur limitant
    meme chose pour le deuxième cas
    pour mieux expliquer si a/b < e/c forcement a est le facteur limitant*/
    else
    {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }
    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}

/* DEUXIEME CHALLENGE: METTRE A JOUR LES POSITIONS DU DINOSAURE A CHAQUE POSITION*/
/**
 * en fonction de l'ordinateur d'une personne, les images ou modifications éffectuées sur 
 * l'écran peuvent prendre plus de temps qu'il n'en faut une image peut charger 10min pendant qu'une autre 50min
 * or c'est pas fastudieux pour un jeu qui doit avoir une cohérence
 * il faudrait donc qu'on adapte un temps de chargement d'images en fonction de chaque machine ou navigateur
 */
let lastTime
let speedScale
let score

function update(time)
// cette fonction prends le temps depuis que nous avons commencé notre programme
 {
    if (lastTime == null )
    {
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }
// obtenir le temps entre les updates ou mise à jour 
const delta = time - lastTime
    
   updateGround(delta, speedScale)// la position du sol va etre modifié autour de deltasecondes fois : on va déplacer le sol vers la gauche constament 
   updateSpeedScale(delta)
   updateScore(delta)
   updateDino(delta, speedScale)
   updateCactus(delta, speedScale)
   if (checkLoseByCactus() || checkLoseByptero()) return handleLose()

   // console.log(delta)

    lastTime = time

    window.requestAnimationFrame(update)
}

function checkLoseByCactus() {
    const dinoRect = getDinoRect()
    return getCactusRects().some(rect => isCollision(rect, dinoRect))
    //c'est pour dire que si l'un des éléments ci-dessus retourne vrai, alors tous le reste retourneras vrai

}

function checkLoseByptero() {
    const dinoRect = getDinoRect()
    return getPteroRects().some(rect => isCollision(rect, dinoRect))
    //c'est pour dire que si l'un des éléments ci-dessus retourne vrai, alors tous le reste retourneras vrai

}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}


function updateSpeedScale(delta){
    delta = 0.0015// la vitesse augmente de 10/100 chaque 15secondes or 1s = 0.001 millisecondes
    speedScale += delta * SPEED_SCALE_INCREASE
    /*SPEED_SCALE_INCREASE: définis une vitesse par défaut 
    la vitesse du dinosaure va donc évoluer en fonction du temps delta et de la vitesse par défaut */
}
function updateScore(delta)
{
    score += delta * 0.01 // pour chaque 100millisecondes qui passent, nous obtenons 10 point 
    scoreElem.textContent = Math.floor(score)
    if (score > MAX_Score)
    {
        new_score_max.textContent = "le meilleur score est:"+ ' ' + Math.floor(score)
        localStorage.setItem("score_max", Math.floor(score))
    }
    
    // juste pour ne pas avoir les nombres décimaux dans les scores
}


function handleStart(e){
    //console.log(e.code)

    if (e.code == "Space"){
        //geoFindMe();

// PORTION DE CODE POUR DEBOUT OU COUCHER
       /* if (e.code != "Space" && e.code == "ArrowDown")
        {
            courber();
        }
        else
        {
            debout();
        }

        /**
         * PORTION DE CODE POUR LA METEO
         * 
         */

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
                  world[0].style.background = 'url("./ASSETS/Clouds.jpg")'
                  world[0].style.color = "black";
                  world[0].style.backgroundRepeat = "repeat-x";
                 }
                 break;
                 case ("Fog"):
                    {
                      // changer le background du monde avec une image nuageause
                       /* let im1 = document.createElement("img")
                        im1.src = "./ASSETS/R.jfif";
                        world.appendChild(im1);*/
                        //world.classList.add("cloud");
                     world[0].style['background-image'] = "url('./ASSETS/fog.jpg')";
                     world[0].style.backgroundRepeat = "repeat-x";
                    }
                    break;
               case ("Rain"):
                 {
                   //télécharger une image giff d'un nuage avec plui et mettre dans une petite zone
                   //world.style.background = "url(./ASSETS/R.gif)"
                  // world.innerHTML = `<img src = "./ASSETS/R.gif" >`
                  //world.classList.add("Rain");
                  world[0].style.backgroundImage = 'url("./ASSETS/R.gif")'
                  world[0].style.backgroundRepeat = "repeat-x";
                 }
                 break;
                 
               case ("Snow"):
                 {
                     //world.innerHTML = `<img src = "./ASSETS/tempsnuageux1.jfif" >`
                 // world.style.background = "url(./ASSETS/tempsnuageux1.jfif)"
                 //world.classList.add("Snow");
                 world[0].style.backgroundImage = 'url("./ASSETS/tempsnuageux1.jfif")'
                 world[0].style.backgroundRepeat = "repeat-x";
                 }
                 break;
               case ("Clear"):
                 {
                   // changer le background du monde avec une image du soleil
                   //world.innerHTML = `<img src = "./ASSETS/R (1).jfif" >`
                   //world.style.background = "url(./ASSETS/R (1).jfif)"
                   //world.classList.add("clear");
                   //world.classList.add("clear");
                   world[0].style.backgroundImage = 'url("./ASSETS/beauTemps.png")'
                   world[0].style.backgroundRepeat = "repeat-x";
                 }
                 break;
         
               case ("Mist"):
                 {
                   // changer le background du monde avec une image de brouillard
                   //world.innerHTML = `<img src = "./ASSETS/R (7).jfif" >`
                   world[0].style.backgroundImage = 'url("./ASSETS/Mist.jfif")'
                   world[0].style.backgroundRepeat = "repeat-x";
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
        // FIN DU CODE POUR LA METEO
        
        goodPlayers.textContent = " "
        new_score_max.textContent = ""
        if (localStorage.getItem("score_max"))
        {
            
            new_score_max.textContent = "Meilleur score: " + localStorage.getItem("score_max")
        MAX_Score = localStorage.getItem("score_max");
        lastTime = null // on veut s'assurer que la fonction requestAnimationFrame s'active lorsque la variable lastTime est null
        speedScale = 1 // au début du jeu, la vitesse du dinosaure est de 1 
        score = 0 // au début du jeu, le score du dinosaure est de 0
        setupGround()// la fonction de modification du sol et de sa vitesse 
        setupDino()
        setupCactus() //  fonction de configuration de cactus qui va déplacer les cactus vers la gauche, vers la droite et les faire disparaitre quand ils bougent sur le bord de l'écran
        
        startScreenElem.classList.add("hide")
        nom = prompt("Entrez votre nom")
        name.innerHTML = nom
        //myGameObj.name = nom
        
        //console.log(myGameObj)
        /*myGameTable.push(myGameObj)
        console.log(myGameTable)// il contient bien l'object avec les propriétés*/

       /* if (myGameTable.length == 10){
            localStorage.setItem("joueurs", myGameTable)
        }*/
        window.requestAnimationFrame(update)
        }
        else{
            goodPlayers = " "
            new_score_max.textContent = "Meilleur score: 250 " 
            lastTime = null // on veut s'assurer que la fonction requestAnimationFrame s'active lorsque la variable lastTime est null
            speedScale = 1 // au début du jeu, la vitesse du dinosaure est de 1 
            score = 0 // au début du jeu, le score du dinosaure est de 0
            setupGround()// la fonction de modification du sol et de sa vitesse 
            setupDino()
            setupCactus() //  fonction de configuration de cactus qui va déplacer les cactus vers la gauche, vers la droite et les faire disparaitre quand ils bougent sur le bord de l'écran
            startScreenElem.classList.add("hide")
            nom = prompt("Entrez votre nom")
            name.innerHTML = nom
            window.requestAnimationFrame(update)
        }
        
    }
    
    
}

function handleLose(){
    setDinoLose()

    new_score_max.textContent = "NOM:  "+ nom + "\n" + "Score:  " + Math.floor(score)
    /*joueurs.nom = `${nom}`
    joueurs.score = `${score}`
    console.log(joueurs)
    joueurs_total = JSON.stringify(joueurs)
    localStorage.setItem("joueurs", joueurs_total )
*/
    tenPlayers(nom, score)
    setTimeout(() => {
       document.addEventListener("keydown", handleStart, { once: true})
        startScreenElem.classList.remove("hide")
    }, 100)
}
// cette fonction c'est juste pour mettre un temps d'attente permettant à l'utilisateur de voir son score avant que le jeu ne recommence lorsqu'il cliquesur une touche

/**
 * requestAnimationFrame: est une fonction très intelligente qui n'appellera notre 
 * callback update que l'orsque nous désirerons éffectuer un changement sur notre écran
 */
/*function setPixelToWorldScale(){
    
}*/
