class obstacles{
    taille;
    type;
    vitesse;
    position = 832;
    tuer(){}
    defiler(){}
    disparaitre(){}
}

export class Cactus extends obstacles{
    worldWidth = 832;
    cactus;
    type;
    worldElem;
    constructor(cactusProperty,  worldProperty)
    {       super()// dans un constructeur hérité, il faut toujours définir un super constructeur avant de commencer sinon ca ne donnera pas
            this.cactus = cactusProperty;
            this.worldElem = worldProperty;
          /*  this.cactus.id = Math.random()
            this.cactus.style["display"] = "block"
        if (this.type == 1){
            this.cactus.style.height = "65px"
        }*/
    }
    // ma fonction défiler 
    defilerCactus(cactus){
    
     cactus = this.cactus
      setInterval(() => {
         if(this.worldWidth <= 832 && this.worldWidth >0)
         {
            this.worldWidth -= 10;
            this.cactus.style['left'] = this.worldWidth+"px";
            }
        /*let cactusLeft = getComputedStyle(this.cactus).getPropertyValue('left')
        console.log(cactusLeft)*/
            else
          {
            if(this.worldWidth < 0 )
            {
                this.cactus.style['background'] = "none";
                this.cactus.style["left"]=832+"px";
                this.createCactus();
            }
          }
    }, 20)
}
   /* tuer(dino){
        let dinoTop = parseInt(window.getComputedStyle(dino.dino).getPropertyValue("top"));
        let cactusLeft = parseInt(window.getComputedStyle(this.cactus).getPropertyValue("left"));
        if(cactusLeft < 50 && cactusLeft >0 && dinoTop >= 140){
            alert("echec");
        }
    }*/

   createCactus(){
        let myNewCactus = document.createElement("div");
        myNewCactus.setAttribute("id", "cactus")
        this.worldElem.append(myNewCactus);
        this.defilerCactus(myNewCactus)/*
        let newCactus = new Cactus (this.cactus.cloneNode())
        this.worldElem.append(newCactus.this.cactus)
        newCactus.scroll();
    }*/
}

}
