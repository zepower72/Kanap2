// Page produit

// Récupération de l'id du produit via l' URL

//la variable params récupère l'url de la page
const params = new URLSearchParams(window.location.search);
console.log(window.location.search);
//https://www.matthieufesselier.com/blog/urlsearchparams-les-parametres-durls-tout-simplement-en-javascript
// Boucle pour itérer sur chaque paramètre en array
for (const param of params) {
  console.log(param);
}
// la variable id va récupérer la valeur du paramètre _id
const id = params.get("id");
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
  Utilisation d'une boucle*/
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
//Je fais appel à fetch pour l'URL de la page produit
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
    quantity: quantity.value,
    color: color.value,
  };
  function validOrder(e) {
    if (basket.quantity <= 0 || basket.color === "") {
      alert("Veuillez choisir une couleur et une quantité");
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

    //On vérifie si le produit est déjà dans le panier
    const productInBasket = itemBasket.find(
      (item) => item.id === basket.id && item.color === basket.color
    );

    //Si le produit est déjà dans le panier, on ajoute la quantité
    if (productInBasket) {
      productInBasket.quantity =
        Number(productInBasket.quantity) + Number(basket.quantity);
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
