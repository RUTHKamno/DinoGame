var isJumping = false;
document.addEventListener('keydown', function (event) {
    if (event.code == "Space" & !isJumping) {
        sauter();
    }
})
function sauter() {
    let dino = document.getElementById("dino")
    isJumping = true;
    let h = 0;
    let isTop = false;
    let flag = true;
    let t = 0;
    let clear = setInterval(() => {

        h = flag || !isTop ? h + 5 : h - 5;
        isTop = h < 70;
        if (isTop) {
            t += 5

        }
        else {
            flag = false;
            t -= 5;
        }
        t = t > 0 ? t : 10;
        dino.style.bottom = t + "px";


    }, 10)
    setTimeout(() => {// setTimeout permet d'arreter le processus du setInterval 

        clearInterval(clear)
        isJumping = false
    }, 300) // quandle temps de setTimeout est grand il redescend beaucoup de fois parce que vu que la fonction s'arrete après un nombre de temps élevés, quand il descend une fois, la fonction de setinterval s'éxécute encore et donc il va remmonter et redescendre rapidement jusqu'a ce que la durée du setTime out soit atteint


}  
let bgpost=0;
let left = 0;
function defiler(){
    bgpost-=10;
    let zone=document.getElementById("zone");
    zone.style["background-position"]=bgpost+"px"
    /*left += 5;
    let dino = document.getElementById("dino"); 
    dino.style = 
    `position: absolute;
     left: ${left}px`
     le dinosaure n'avance pas ce sont les obstacles qui avancent*/
     
}
setInterval(defiler,100);

//function qui fait défiler les obstacles
/**
 * il faut que les obstacles se placent de facon arbitraire 
 */
