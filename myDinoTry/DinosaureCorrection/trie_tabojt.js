
export function trie_croissant_tableau_object(tab_obj)
{
    for(let i = 0 ; i < tab_obj.length ; i++)
{
    for (let j = i + 1 ; j < tab_obj.length ; j++)
    {
        //  l'object de ma condition est le score de chaque object: tab_obj[i].score
        if (tab_obj[i].score < tab_obj[j].score)
        {
            // je veux permuter les objects dans le tableau en fonction de leurs score
            let k = {} // // je crée un object vide qui servira de tampon 
            //console.log("la valeur de k est ")
            //console.log(k)
            k.nom = tab_obj[i].nom
            k.score = tab_obj[i].score
            tab_obj[i].nom = tab_obj[j].nom
            tab_obj[i].score = tab_obj[j].score
            tab_obj[j].nom = k.nom
            tab_obj[j].score = k.score
            //console.log("le 1er tableau classé est");
            //console.log("l'autre valeur  de k est ")
            //console.log(k)
            //console.log("bonjour")
        }
    }
}
console.log(tab_obj) 
}