import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./UpdateCustomProperty.js"

const dinoElem = document.querySelector("[data-dino]")
const JUMP_SPEED = .45// notre vitesse de saut
const GRAVITY = .0020// plus la gravité est grande, moins la hauteur du dino au moment du saut est négligée
const DINO_FRAME_COUNT = 2
// nombre d'images
const FRAME_TIME = 100
// vu qu'ont va faire bouger deux images différentes, chaque images va occupper 100millisecondes

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity

export function setupDino(){
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(dinoElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
    /**
     * en fait, on s'assure de toujours supprimer l'écouteur d'évènements
     * au debut du jeu si il en existait et aussi on affecte la variable --bottom à 0 
     */
}

export function updateDino(delta, speedScale){
handleRun(delta, speedScale)
handleJump(delta)
}

export function setDinoLose()
{
    dinoElem.src = "./ASSETS/dino-lose.png"
}

export function getDinoRect(){
    return dinoElem.getBoundingClientRect()
}


function handleRun(delta, speedScale){
if (isJumping){
    dinoElem.src = `./ASSETS/dino-stationary.png`
    return
}

if (currentFrameTime >= FRAME_TIME){
    dinoFrame = (dinoFrame + 1 ) % DINO_FRAME_COUNT
    dinoElem.src = `./ASSETS/dino-run-${dinoFrame}.png`
    currentFrameTime -= FRAME_TIME
    /**
     * On s'assure qu'a la fin, on reinitialise le temps  de trame de l'image actuel 
     * */
/**
 * la machine commence à compter à partir de 0 
 * exemple si on est actuellement à la 15ième image on va faire 15 % 10 = 5 donc on va éxécuter l'image 5 
 * si le temps actuel que passe une image sur le sol est  supérieurs au temps d'une image par défaut, 
 * à la variables dinoFrame, on affecte dinoFrame+1 modulo le nombre total d'images
 * tout ceci afin que notre animation boucle c'est a dire, étant à la derniére image, il va revenir à la première 
 * dinoFrame comporte le numéro de position de l'image ou l'index de l'image à remplacer
 */ 

}
currentFrameTime += delta * speedScale
/**
 * le temps que passe une image est: temps entre deux modifications:delta et la vitesse 
 * dinosaure de tels sorte que plus le sol augmente plus la vitesse du dinosaure croit 
 * 
 */
} 


// GESTION DU SAUT DU DINOSAURE

function handleJump(delta)
{
    if(!isJumping) return
/**
 * si on saute, on incrémente considérablement la propriété bottom(on diminue donc le top qui fait descendre) du dinosaure de la vitesse * temps
 * si, la propriété bottom <=0, on l'affecte à 0 pour que le dino ne descende pas en-dessous du sol
 */
    incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)
    if (getCustomProperty(dinoElem, "--bottom") <= 0) {
        setCustomProperty(dinoElem, "--bottom", 0)
        isJumping = false
    }
 yVelocity -= GRAVITY * delta
 
    
    /**
     * prendre la position inférieur du dinosaure et 
     * le déplacer vers le haut ou vers le bas en fonction de la vitesse du dinosaure 
     * ce qu'on veut c'est de soustraire la gravité de la vitesse du dinosaure au moment du saut 
     * de tel sorte que en sautant, il devient de plus en plus lent jusqu'a ce que 
     * la vitesse atteingne 0 ie: devient négatif
     * ainsi, lorsque la vitesse deviendra négative, le dinosaure va commencer à descendre
     */
}
function onJump(e) {
    if (e.code !== "Space" || isJumping) return 
    // si on ne tape pas la barre d'espace ou si il saute, on ne fait rien car etant entrain de sauter, il ne peut plus sauter
    //sinon on effectue les modifications ci-dessous
    yVelocity = JUMP_SPEED
    isJumping = true
}