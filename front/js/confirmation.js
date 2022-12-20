// PAGE CONFIRMATION

/*Récupération de l'URL. 
Ensuite, récupération du numéro de commande et affichage du numéro de commande.
Suppression du lS*/
let newId = new URL(window.location.href).searchParams.get("orderId");
document.getElementById("orderId").innerHTML = newId;
//localStorage.clear();
