class Environnement {
// attribut de la classe Obstacle

    score;
    temps;
    meteo;

    // methode ou capacités
    evoluer(){
        let bgpost=0;
        let left = 0;

    bgpost -= 10;
    let zone=document.getElementById("zone");
    zone.style["background-position"]=bgpost+"px"
    /*left += 5;
    let dino = document.getElementById("dino"); 
    dino.style = 
    `position: absolute;
     left: ${left}px`
     le dinosaure n'avance pas ce sont les obstacles qui avancent*/
     

setInterval(defiler,100);
    }
}



//function qui fait défiler les obstacles
/**
 * il faut que les obstacles se placent de facon arbitraire 
 */
/*(() => {}) est appelé fonction callback, fonction anonyme car il est anonyme , fonction lambda
this: pour référencer */