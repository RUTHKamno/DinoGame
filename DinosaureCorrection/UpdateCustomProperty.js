/**
 * ce fichier va contenir toutes les fonctions rendant 
 * la mise à jour des valeurs personnalisées très facile
 * La fonction ci-dessous récupère la valeur d'une propriéte CSS "prop" appliquée à l'élément "elem"
 */
export function getCustomProperty(elem, prop) {
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0
    /**
     * ici, on renvoit la valeur de la propriété CSS "prop" que contient l'élement "elem"
     * si il n'ya en pas, on retourne 0
     */
}

export function setCustomProperty(elem, prop, value){

    elem.style.setProperty(prop, value)
    // ajoute une nouvelle valeur "value" à une propriété "prop" d'une déclaration d'object CSS "elem"

}
// celle-ci ajoute une nouvelle valeur à une propriété CSS 

export  function incrementCustomProperty(elem, prop, inc) {
    setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc )
/**
 * son but est de modifier le style d'un élément 
 * on peut donc l'appeller autant de fois que l'on veut
 * Et celle-ci incrémente les modifications éffectuées dans la deuxième fonction et l'applique sur l'élément "elem" à la propriété "prop" relevée par la 1er fonction
 */
setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc)
/**
 * on modifie la propriétée "prop" sur l'élement "elem" d'une valeur = à la valeur précédente incrémenté de "inc"
 */

}