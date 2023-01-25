import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./UpdateCustomProperty.js"

const SPEED = .05 // c'est important de s'assurer que le cactus se déplace à la meme vitesse que le sol sinon ils vont avancer à des vitesses différentes et ca sera pas en autre faveur
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")
// cet élement va nous permettre de créer des cactus dans le monde
/**
 * on définit un intervalle de durée entre deux cactus 
 * la plus petite durée d'affichage d'un cactus à l'écran est de 500millisecondes 
 * nous allons choisir une durée entre cette intervale pour afficher les cactus à l'écran
 */

let nextCactusTime
export function setupCactus(){

    nextCactusTime = CACTUS_INTERVAL_MIN
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        cactus.remove()
    })
    /**
     * Au début, on supprime tous les cactus ayant été configurés.
     */

}

export function updateCactus(delta, speedScale){
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
         incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
        if (getCustomProperty(cactus, "--left") <= -100)
        {
            // si la position-gauche du cactus est < -100 alors le cactus à traversé le bord de notre écran et nous n'en avons plus besoin
               cactus.remove()
        }
    })

    if (nextCactusTime <= 0){
        createCactus()
        nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
        // générer un nombre aléatoire dans cet intervalle. afin de rendre le jeu beaucoup plus rapide 
    }
/**
 * si notre prochaine heure de cactus est inférieur ou égale à 0, 
 * alors, nous devons invoquer un nouveau cactus et cette prochaine heure de cactus par défaut
 * sera égale à l'heure de cactus minimale ainsi ca va invoquer un cactus rapidement une fois que le jeu démarre
 */
    nextCactusTime -= delta
}
// FONCTION D'ECHECS
export function getCactusRects() {
    // cette fonction nous retourne les rectangles bref les dimensions extrèmes pour tous les cactus qui sont à l'écran à partir de la foction getBoundingClientRect
    return [...document.querySelectorAll("[data-cactus]")].map(cactus =>
        {
            return cactus.getBoundingClientRect()
        })
}


function createCactus(){
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true // data-cactus = true
    cactus.src = "./ASSETS/cactus.png"
    cactus.classList.add("cactus")
    setCustomProperty(cactus, "--left", 100)
    // on veut que notre cactus soit placée sur le coté droit du monde 
    worldElem.append(cactus)
}

function randomNumberBetween(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
    /**
     * prendre un nombre aléatoire entre 0 et 1 
     * pour nous assurer que ce nombre se situe entre notre maximum et notre minimum
     * nous multiplions le nombre obtenue par la différence entre max et min +1 et à la fin
     * nous ajoutons min de tel sorte que meme si le nombre est 0, alors on aura 0 + min = min
     */
}