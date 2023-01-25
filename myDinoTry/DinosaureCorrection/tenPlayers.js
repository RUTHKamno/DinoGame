import { trie_croissant_tableau_object } from "./trie_tabojt.js";

let obj = {}
let tab = []
let newPlayer;
let goodPlayers = document.getElementById("goodPlayers");

export  function tenPlayers(nom, score)
{
    

    localStorage.setItem("tabSave", JSON.stringify(tab));// je stocke d'abord mon tableau dans ma BD
    obj.name = nom
    obj.goal = score// je relève les informations de l'utilisateur
    if(localStorage.getItem("tabSave")) // si mon tableau stocké existe,
    {
        newPlayer = JSON.parse(localStorage.getItem("tabSave")) // toujours à mon tableau, j'affecte la valeurs de l'ancien tableau mais sous forme de tableau fin parsé 
        newPlayer.push(obj)// ensuite à tab toujours j'ajoute mon object. 
        console.log(newPlayer)
        tab = newPlayer
        /*console.log(newPlayer.length);
        console.log(newPlayer[0].name)*/

        // affichage des 10 meilleurs
        if (newPlayer.length >= 10)
        {
            for ( let i = 0 ; i < newPlayer.length ; i++)
            {
                // trie du tableau 
                trie_croissant_tableau_object(newPlayer)
                
                const Player1 = document.createElement("ul");
                const Player1name = document.createElement("li");
                const Player1score = document.createElement("li");
                goodPlayers.appendChild(Player1);
                Player1.appendChild(Player1name);
                Player1.appendChild(Player1score);
                Player1name.innerHTML = newPlayer[i].name;
                Player1score.innerHTML = newPlayer[i].goal;

            }
        
        }
   
        
        
    }

}

// fonction récursive 

/*export function tenPlayers(nom, score)
{

    localStorage.setItem("tabSave", JSON.stringify(tab));
    obj.name = nom
    obj.goal = score
    if(localStorage.getItem("tabSave")) 
    {
        newPlayers = JSON.parse(localStorage.getItem("tabSave"))  
        newPlayers.push = obj
        
    }
}
*/