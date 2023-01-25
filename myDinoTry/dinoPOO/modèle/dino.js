// le fichier dino à pour méthode: sauter(), courber(), mourir()

export class Dino{
    // attributs de Dino
    taille;
    position;
    largeur;
    isJumping = false;
    dino;
    score;
    nameElem;
 constructor (dinoProperty, scoreProperty, nameProperty)
 {
   this.dino = dinoProperty;
   this.score = scoreProperty;
   this.nameElem = nameProperty;
 }
 sauter() {
    
    
    this.isJumping = true
    let h = 0;
    let isTop = false;
    let flag = true;
    let t = 120;
    let clear = setInterval(() => {

        h = flag || !isTop ? h + 5 : h - 5;
        isTop = h < 70;
        if (isTop) {
            t += 10

        }
        else {
            flag = false;
            t -= 10;
        }
        t = t > 0 ? t : 0;
         this.dino.style.bottom = t + "px";
        //console.log("je" + this.dino.style.bottom)

    }, 17)
    setTimeout(() => {

        clearInterval(clear)
        this.isJumping = false
    }, 900)
    }

courber()
{
    this.dino.style['background'] = `url("./ASSETS/dinobaissé.png")`
    this.dino.style['background-repeat'] = `no-repeat`
    this.dino.style['height'] = `60px`
    this.dino.style['width'] = `130px`
    


}
debout()
{
    this.dino.style['background'] = `url("./ASSETS/dino-stationary.png")`
    this.dino.style['background-repeat'] = `no-repeat`
    this.dino.style['height'] = `90px`
}
goalPlayer()
{
    let goal = 0;
    setInterval(()=> {
        goal += 10;
        this.score.textContent = `${goal}`;
    }, 1000)
}
namePlayer(){
    let name = prompt("entrez votre nom").toString();
    console.log(name)
    this.nameElem.textContent = `${name}`
}
}  

}



// déclaration de mes méthodes 
   
   /* courber();
    mourir();*/
