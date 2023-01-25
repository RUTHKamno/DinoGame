import { setupGround, updateGround} from './ground.js'
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./DinoElem.js"
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"
/* PREMIER CHALLENGE: MISE A L'ECHELLE MONDIALE Du jeu */ 


const WORLD_WIDTH = 100
// valeur par défaut de la largeur du monde
const WORLD_HEIGHT = 30
// valeur par défaut de la hauteur du monde
const SPEED_SCALE_INCREASE = 0.01

/*on ajoute une partie de notre code: 
c'est la partie monde on veut faire en sorte que notre 
monde s'adapte en fonction de la taille d'écran de chaque machine*/
const worldElem = document.querySelector('[data-world]')
 //console.log(worldElem) les deux renvoit la meme chose 
/*const worldElem = document.querySelector('.world')
console.log(worldElem)*/
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")

 

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
   if (checkLose()) return handleLose()

   // console.log(delta)

    lastTime = time

    window.requestAnimationFrame(update)
}

function checkLose() {
    const dinoRect = getDinoRect()
    return getCactusRects().some(rect => isCollision(rect, dinoRect))
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
    // juste pour ne pas avoir les nombres décimaux dans les scores
}
function handleStart(){
    lastTime = null // on veut s'assurer que la fonction requestAnimationFrame s'active lorsque la variable lastTime est null
    speedScale = 1 // au début du jeu, la vitesse du dinosaure est de 1 
    score = 0 // au début du jeu, le score du dinosaure est de 0
    setupGround()// la fonction de m odification du sol et de sa vitesse 
    setupDino()
    setupCactus() //  fonction de configuration de cactus qui va déplacer les cactus vers la gauche, vers la droite et les faire disparaitre quand ils bougent sur le bord de l'écran
    startScreenElem.classList.add("hide")
    window.requestAnimationFrame(update)
}

function handleLose(){
    setDinoLose()
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
