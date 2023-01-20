// Page produit

//la variable params récupère l'url de la page
const params = new URLSearchParams(window.location.search);
console.log(window.location.search); //affichage de l'URL de la page courante
//fr.javascript.info/url
// Boucle pour itérer sur chaque paramètre en array
// Utilisation de la "Keys méthode" pour obtenir un itérateur qui permet de parcourir toutes les clés de paramètre de recherche dans la chaine de requête https: 
for (const param of params) {
  console.log(param);
}
// la variable id va récupérer la valeur du paramètre _id
const id = params.get("id"); //renvoie la première valeur associée au parmètre 'id"
const urlProduct = `http://localhost:3000/api/products/${id}`;
console.log(urlProduct);

//Variables produit raccordé à l'HTML
//Variable de l'image
const image = document.querySelector(".item__img");
const imageProduct = document.createElement("img");
//Variable du nom du produit
const titleProduct = document.getElementById("title");
//Variable du prix
const priceProduct = document.getElementById("price");
//Variable de la description
const descriptionProduct = document.getElementById("description");
//Variable de l'option
const color = document.getElementById("colors");
//Variable de la quantité
const choiceQuantite = document.getElementById("quantity");
//Variable du bouton "Ajouter au panier"
const button = document.getElementById("addToCart");

//Utilisation d'une fonction pour l'insertion des éléments de l'article
function displayproduct(article) {
  //Insertion de l'image
  imageProduct.src = article.imageUrl;
  imageProduct.alt = article.altTxt;
  image.appendChild(imageProduct);
  //Insertion du nom
  titleProduct.innerText = article.name;
  //Insertion du prix
  priceProduct.innerText = article.price;

  //Insertion de la description
  descriptionProduct.innerText = article.description;
  /*Insertion de l'option
  Utilisation d'une boucle qui permet de parcourir tous les éléments*/
  for (let i = 0; i < article.colors.length; i++) {
    //https://www.w3schools.com/jsref/jsref_for.asp
    const option = document.createElement("option");
    option.innerText = article.colors[i];
    color.appendChild(option);
    //test
    console.log(option);
  }

  return displayproduct;
}
//Je fais appel à fetch pour éxécuter l'URL de la page produit
fetch(urlProduct)
  //Première promesse, qui récupére la réponse en json
  .then((response) => response.json())
  //Deuxième promesse pour l'affichage des produits
  .then(displayproduct)
  //Message d'erreur si le serveur ne répond pas
  .catch((error) => {
    alert("Se connecter au serveur !!!");
  });

//---------------------------------------------------------------------------------------

//Fonction pour ajouter au panier (bouton "Ajouter au panier")
function addToCart() {
  //Variable qui contient les éléments souhaités
  const basket = {
    id: id,
    quantity: parseInt(quantity.value),
    color: color.value,
  };
  function validOrder(e) {
    if (basket.quantity <= 0 || basket.quantity > 100 || basket.color === "") {
      alert(
        "Veuillez choisir une couleur et une quantité. Les articles étant en nombre limité, la quantité maximale commandée sera bloquée à 100 unités"
      );
      e.preventDefault();
    } else {
      alert("Votre commande a bien été prise en compte");
    }
  }
  validOrder();

  //On créé la variable panier dans le localStorage avec getItem
  const basketInStorage = localStorage.getItem("basket");

  //Si aucun produit n'a été ajouté, on créé (initialise) un Array Panier
  if (basketInStorage === null) {
    //Lors de l'envoi de données à un serveur Web, les données doivent être une chaîne.
    //Conversion d'un objet JavaScript en chaîne avec JSON.stringify().
    localStorage.setItem("basket", JSON.stringify([basket]));
    //
  } else {
    //Si un produit a déjà été ajouté, on créé un Panier pour un produit(itemBasket)
    //Lorsque vous utilisez le JSON.parse()sur un JSON dérivé d'un tableau, la méthode renverra un tableau JavaScript, au lieu d'un objet JavaScript.
    const itemBasket = JSON.parse(basketInStorage);

    //On vérifie si le produit est déjà dans le panier//passe chaque élément dans la fonction et renvoie vrai ou faux
    // https://www.digitalocean.com/community/tutorials/js-array-search-methods-fr
    //La find()méthode renvoie la valeur du premier élément qui réussit un test
    //La find()méthode exécute une fonction pour chaque élément du tableau.
    //Si la fonction renvoie true, la find()méthode renvoie la valeur de l'élément, et ne vérifie pas les autres valeurs. Sinon, elle renvoie undefined.
    const productInBasket = itemBasket.find(
      (item) => item.id === basket.id && item.color === basket.color
    );

    //Si le produit est déjà dans le panier, on ajoute la quantité (maximale de 100)
    if (productInBasket) {
      productInBasket.quantity =
        productInBasket.quantity + basket.quantity > 100
          ? 100
          : productInBasket.quantity + basket.quantity;

      //On enregistre le panier dans le localStorage
      localStorage.setItem("basket", JSON.stringify(itemBasket));
    } else {
      //Si le produit n'est pas dans le panier, on ajoute le produit
      itemBasket.push(basket);

      //On enregistre le panier dans le localStorage
      localStorage.setItem("basket", JSON.stringify(itemBasket));
    }
  }
}

button.addEventListener("click", addToCart);
