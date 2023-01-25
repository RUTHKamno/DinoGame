import {
    getCustomProperty,
    incrementCustomProperty, 
    setCustomProperty } from "./UpdateCustomProperty.js"
const SPEED = 0.05
const groundElems = document.querySelectorAll("[data-ground]")


 export function setupGround(){
   /**
    * c'est la fonction qu'on va appeler au début de notre programme
    * on prends la propriétée --left du premier sol et on l'affecte à 0 dans un premier temps
    * dans un second temps, on prends la propriétée --left du deuxième sol et on l'affecte à 300: 
    * c'est axactement où se termine le premier sol. car il a une largeur de 300 ainsi a la fin du premier sol, le second prend la relève 
    */
   setCustomProperty(groundElems[0], "--left", 0);
   setCustomProperty(groundElems[1], "--left", 300)
   
 }
 export function updateGround(delta, speedScale){
    groundElems.forEach(ground => {
        incrementCustomProperty(ground, "--left", delta *speedScale * SPEED * -1)
        /**
         * speedScale, son but est d'augmenter la vitesse du jeu afin de rendre le jeu 
         * plus normale
         * on modifie donc la valeur left du sol à chaque fois de speddScale, ce qui permet d'augmenter 
         * la vitesse avec la quelle le sol se déplace et donc d'augmenter la vitesse de tous le monde 
         * on modifie la propriété --left du sol en l'incrémentant du temps de la vitesse et on multiplie par -1 pour qu'elle se déplace vers l'arrière
         */ 
        if (getCustomProperty(ground, "--left") <= -300 )
        /**
         * si la valeur dela propriétée --left de l'élement ground est < -300, alors, le sol s'est déplacé complétement
         * du bord de l'écran à moins 300 
         */
        
        {
         incrementCustomProperty(ground, "--left", 300)
         /**
          * on ajoute 300 parce que ca va faire 0 + 300 = 300 
          * ce qui signifie que les deux sols vont s'alterner lorsque un se termine, l'autre prends place et ainsi de suite
          * 
          */
        }

    } )
 }