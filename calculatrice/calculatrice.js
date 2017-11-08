var resultat="";//chaine de caracteres de mon operation
var nombre="";
var restemp=null;
var nbch=null;

//fonction clic chiffre
function clicCh(bouton)
{
    nbch++;
    var res=document.getElementById("afficheur");
    var res2=document.getElementById("affichRes");
    if (restemp != null)//sert pour reset resultat si un chiffre est tapé juste après =
    {
        resultat="";
        restemp=null;
    }
    if (nbch<11)//sert à limiter le nombre de chiffre à la taille de mon affichage
    {
    resultat = resultat+bouton;
    nombre = nombre+bouton; //sert à afficher un nombre quand plusieurs chiffres sont tapés à la suite
    res.innerHTML=nombre;
    res2.innerHTML=resultat;
    }
    else
    {
        res.innerHTML=nombre;
        res2.innerHTML=resultat;
    }
}

//fonction clic opérateur
function clicOp(bouton)
{
    var res=document.getElementById("afficheur");
    var res2=document.getElementById("affichRes");    
    resultat = resultat+bouton;
    nombre = "";
    restemp=null;
    nbch=null;
    res.innerHTML=bouton;
    res2.innerHTML=resultat;
}

//fonction pourcentage
function clicPourcent()
{
    var res=document.getElementById("afficheur");
    var res2=document.getElementById("affichRes");
    res2.innerHTML = "("+resultat+")"+"%";
    resultat = eval(resultat)/100;
    affiche();
}

//function puissance 2
function clicPuis2()
{
    var res=document.getElementById("afficheur");
    var res2=document.getElementById("affichRes");
    res2.innerHTML = "("+resultat+")"+"²";
    resultat = Math.pow(eval(resultat),2);
    affiche();
}

//function racine carré
function clicRacine()
{
    var res=document.getElementById("afficheur");
    var res2=document.getElementById("affichRes");
    res2.innerHTML = "("+resultat+")"+"&#8730";
    resultat = Math.sqrt(eval(resultat));
    affiche();
}

//fonction calcul et affichage de mon opération
function affiche()
{
    var res=document.getElementById("afficheur");
    var res2=document.getElementById("affichRes");
    resultat = eval(resultat);
    var nbDigit=resultat.toString();
    if (nbDigit.length>10)//si la longueur de mon résultat est trop grande
    {
        resultat=resultat.toPrecision([5]);//limite la taille à 5 et rajoute une puissance
    }
    nombre = "";
    restemp++;
    nbch=null;
    if (!isFinite(resultat)){res.innerHTML="Erreur";} //gestion de la division par 0
    else
    {
        res.innerHTML=resultat;
    }
}

//fonction reset
function reset()
{
    var res=document.getElementById("afficheur");
    var res2=document.getElementById("affichRes");
    resultat = "";
    nombre = "";
    restemp=null;
    nbch=null;
    res.innerHTML="0";
    res2.innerHTML="";
}

//fonction gérant les touches du clavier
function keycode(touche)
{
    var touche1=String.fromCharCode(touche.charCode);//récupère la valeur de la touche pressée
    touche2 = touche1.toUpperCase();
    var tab=["0","1","2","3","4","5","6","7","8","9","*","+","-","/",".","²","V","v","%","C","c"];//liste blanche des touches acceptées
    if (touche.keyCode == 13)//test touche "entrée"
    {
        return affiche();
    }
    else
    {
        for (var i=0; i<tab.length; i++)
        {
            if (touche2 == tab[i])
            {
                if (isNaN(touche2))//test si touche est un entier
                {
                    if (touche2 == "C")//test touche reset
                    {
                        return reset();
                    }
                    else if (touche2 == "V")
                    {
                        return clicRacine();
                    }
                    else if (touche2 == "²")
                    {
                        return clicPuis2();
                    }
                    else if (touche2 == "%")
                    {
                        return clicPourcent();
                    }
                    else if (touche2 == ".")
                    {
                        return clicCh(".");
                    }
                    else
                    {
                        return clicOp(touche2);
                    }
                }
                else
                {
                    return clicCh(touche2);
                }
            }
        }
    }
} 
