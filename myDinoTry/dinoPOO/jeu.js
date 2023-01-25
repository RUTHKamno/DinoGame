// mon fichier d'importation qui récupère les élements de la classe environnement

import  {World}  from './modèle/environnement.js'
import { Dino } from './modèle/dino.js'
import { Cactus } from './modèle/obstacle.js'

let wordElemSrc = document.getElementById("world")
let groundElemSrc = document.getElementById("ground")
let dinoElemSrc = document.getElementById("dino");
let cactusElemSrc = document.getElementById("cactus");
let cloudsElemSrc = document.getElementById("Clouds");
let timeElemSrc = document.getElementById("temps")
let scoreElemSrc = document.getElementById("score")
let nameElemSrc = document.getElementById("namePlayer");
let day = new Date();

let Hour = day.getHours() 
 console.log(Hour)


//let someCactusElemSrc;
// je crée l'instance de ma classe world
const worldEnvironnement = new World(groundElemSrc, cloudsElemSrc, Hour, wordElemSrc, timeElemSrc);

const dinoObject = new Dino(dinoElemSrc, scoreElemSrc, nameElemSrc);

/*for(let i = 0 ; i < cactusElemSrc.length ; i++)
{
    someCactusElemSrc = cactusElemSrc[i];
    cactusObject =  new Cactus(/*cactusElemSrc.forEach(cactusElemClass => () => { 
        return cactusElemClass;
    }), someCactusElemSrc, wordElemSrc);
}*/
/*cactusElemSrc.map(cactus => {
    console.log(cactus)
});*/
//const cactusObject = new Cactus(cactusElemSrc[0], wordElemSrc)// ne prends que le premier cactus

//console.log(dinoObject)
// j'applique la méthode evoluer à mon environnement
//worldEnvironnement.evoluer();
worldEnvironnement.evoluer();
worldEnvironnement.date();
worldEnvironnement.meteo();
// fonction sauter, courber et debout
document.addEventListener("keydown", (e) => {
   
    if (e.code == "Space" && !dinoObject.isJumping)
    {
        //console.log("bjr");
        dinoObject.sauter();
    }
    if (e.code == "ArrowDown" )
    {
        //console.log("bjr");
        dinoObject.courber();
    }
    
})

document.addEventListener("keyup", (e) => {
   
    if (e.code == "ArrowDown" )
    {
        //console.log("bjr");
        dinoObject.debout();
    }
})
dinoObject.goalPlayer()
dinoObject.namePlayer()
// fonction défiler tous mes cactus
/*for (let i = 0 ; i < cactusElemSrc.length ; i++)
{
    cactusObject[i] = new Cactus(cactusElemSrc[i], wordElemSrc)
    // fonction défilé cactus
    cactusObject[i].scroll();
}*/
/*setInterval(()=>{
    let cactusObject = new Cactus(cactusElemSrc.cloneNode())
    wordElemSrc.append(c);
    c.scroll();
},5000)*/
/*console.log(cactusElemSrc);
console.log("ma taille" + cactusElemSrc.length)*/
const cactusObject = new Cactus(cactusElemSrc, wordElemSrc)
cactusObject.defilerCactus();