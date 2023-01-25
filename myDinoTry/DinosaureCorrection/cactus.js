import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./UpdateCustomProperty.js"

const SPEED = .05 // c'est important de s'assurer que le cactus se déplace à la meme vitesse que le sol sinon ils vont avancer à des vitesses différentes et ca sera pas en autre faveur
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const PTERO_INTERVAL_MIN = 800
const PTERO_INTERVAL_MAX = 1500
const worldElem = document.querySelector("[data-world]")
// cet élement va nous permettre de créer des cactus dans le monde
/**
 * on définit un intervalle de durée entre deux cactus 
 * la plus petite durée d'affichage d'un cactus à l'écran est de 500millisecondes 
 * nous allons choisir une durée entre cette intervale pour afficher les cactus à l'écran
 */

let nextCactusTime// le prochain temps où un actus pourra s'afficher
let nextPteroTime;
//let typeOfCactus;

export function setupCactus(){

    nextCactusTime = CACTUS_INTERVAL_MIN
    nextPteroTime = PTERO_INTERVAL_MIN
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        cactus.remove()
       
    })
    document.querySelectorAll("[data-ptero]").forEach(ptero => {
        ptero.remove()
       
    })
    /**
     * Au début, on supprime tous les cactus et ptero ayant été configurés.
     */

}

export function updateCactus(delta, speedScale){// ici on fais glisser le cactus en fonction de la vitesse de modifications et de la vitesse du dino
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
         incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
        if (getCustomProperty(cactus, "--left") <= -100)
        {
            // si la position-gauche du cactus est < -100 alors le cactus à traversé le bord de notre écran et nous n'en avons plus besoin
               cactus.remove()
        }
    })// forEach retourne un undefined comparément à map 

    // celui du ptero
    document.querySelectorAll("[data-ptero]").forEach(ptero => {
        incrementCustomProperty(ptero, "--left", (delta) * speedScale * (SPEED) * -1)
        // -1 parceque ca doit apparaitre en sens inverse au dino
       if (getCustomProperty(ptero, "--left") <= -100)
       {
           // si la position-gauche du cactus est < -100 alors le cactus à traversé le bord de notre écran et nous n'en avons plus besoin
              ptero.remove()
       }
   })// forEach retourne un undefined comparément à map 

    if (nextCactusTime <= 0 && nextPteroTime <= 0){
        createCactus()
        createptero()
        nextPteroTime = randomNumberBetween(PTERO_INTERVAL_MIN, PTERO_INTERVAL_MAX) / speedScale
        nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
        // générer un nombre aléatoire dans cet intervalle. afin de rendre le jeu beaucoup plus rapide 
    }

/**
 * si notre prochaine heure de cactus est inférieur ou égale à 0, 
 * alors, nous devons invoquer un nouveau cactus et cette prochaine heure de cactus par défaut
 * sera égale à l'heure de cactus minimale ainsi ca va invoquer un cactus rapidement une fois que le jeu démarre
 */
    nextPteroTime -= delta
    nextCactusTime -= delta
}
// FONCTION D'ECHECS
export function getCactusRects() {
    // cette fonction nous retourne les rectangles bref les dimensions extrèmes pour tous les cactus qui sont à l'écran à partir de la foction getBoundingClientRect
    return [...document.querySelectorAll("[data-cactus]")].map(cactus =>
        {
            return cactus.getBoundingClientRect()
        })
        /**
         * map parce qu'elle va retourner un tableau contenant la dimension de chaque variable
         */
}
export function getPteroRects(){
    return [...document.querySelectorAll("[data-ptero]")].map(ptero =>
        {
            return ptero.getBoundingClientRect()
        })
}

function createCactus(){// ici, on crée le cactus
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true // data-cactus = true
    cactus.src = "./ASSETS/cactus.png"
    cactus.classList.add("cactus")
    /*typeOfCactus = randomNumberBetween(0, 1)
    console.log(typeOfCactus)
 // détermination de la hauteur du ptero
 if(typeOfCactus == 0)
 {
    console.log("je renvoie 0")
    let height = getCustomProperty(cactus, "height")
    setCustomProperty(cactus, height, 100)
 }*/
    setCustomProperty(cactus, "--left", 100)
    // on veut que notre cactus soit placée sur le coté droit du monde 
    worldElem.append(cactus)
    
   

}
function createptero(){
 // crée un ptero

 const ptero = document.createElement("img")
 ptero.dataset.ptero = true // data-ptero = true
 ptero.src = "./ASSETS/ptero1.png"
 ptero.classList.add("ptero")
 setCustomProperty(ptero, "--left", 50)
 // on veut que notre ptero soit placée sur le coté droit du monde 
 worldElem.append(ptero)
}

function randomNumberBetween(min, max){ //ici, on détermine soit notre max, soit notre min
    return Math.floor(Math.random() * (max - min + 1) + min)
    /**
     * prendre un nombre aléatoire entre 0 et 1 
     * pour nous assurer que ce nombre égale soit au  maximum soit a notre minimum
     * nous multiplions le nombre obtenue par la différence entre max et min +1 et à la fin
     * nous ajoutons min de tel sorte que meme si le nombre est 0, alors on aura 0 + min = min
     */
}