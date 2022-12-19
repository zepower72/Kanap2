//PAGE PANIER
//Récupération des produits du localStorage
let cartProducts = JSON.parse(localStorage.getItem("basket"));
console.log(cartProducts);

//Sauvegarde des produits du localStorage
function saveBasket(cartProducts) {
  localStorage.setItem("basket", JSON.stringify(cartProducts));
  console.log(cartProducts);
}

//Fonction d'affichage des produits du panier
function displayCart(cartProducts) {
  for (let singleproduct of cartProducts) {
    fetch(`http://localhost:3000/api/products/${singleproduct.id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((product) => {
        console.log(product);

        //création de la structure HTML
        //section cart
        let sectionCart = document.getElementById("cart__items");
        //article
        let articleCart = document.createElement("div");
        articleCart.classList.add("cart__item");
        articleCart.setAttribute("data-id", singleproduct.id);
        articleCart.setAttribute("data-color", singleproduct.color);
        sectionCart.appendChild(articleCart);
        console.log(articleCart);
        //imagediv
        let imageCart = document.createElement("div");
        imageCart.classList.add("cart__item__img");
        articleCart.appendChild(imageCart);
        //imageimg
        let imgCart = document.createElement("img");
        imgCart.src = product.imageUrl;
        imgCart.innerText = product.altTxt;
        imageCart.appendChild(imgCart);
        //content

        let contentCart = document.createElement("div");
        contentCart.classList.add("cart__item__content");
        articleCart.appendChild(contentCart);
        //descriptioncontent
        let descriptionContent = document.createElement("div");
        descriptionContent.classList.add("cart__item__content__titlePrice");
        contentCart.appendChild(descriptionContent);
        //descriptiondetailsh2
        let descriptionName = document.createElement("h2");
        descriptionName.classList.add("cart__item__content__titlePrice");
        descriptionName.innerText = product.name;
        descriptionContent.appendChild(descriptionName);
        //descriptiondetailscolor
        let descriptionColor = document.createElement("p");
        descriptionColor.classList.add("cart__item__content__titlePrice");
        descriptionColor.innerText = singleproduct.color;
        descriptionContent.appendChild(descriptionColor);
        //descriptiondetailprix
        let descriptionPrice = document.createElement("p");
        descriptionPrice.classList.add("cart__item__content__titlePrice");
        descriptionPrice.innerText = product.price + " €";
        descriptionContent.appendChild(descriptionPrice);
        //settings
        let settingsContent = document.createElement("div");
        settingsContent.classList.add("cart__item__content__settings");
        contentCart.appendChild(settingsContent);
        //settingsquantity
        let settingsQuantity = document.createElement("div");
        settingsQuantity.classList.add(
          "cart__item__content__settings__quantity"
        );
        settingsQuantity.innerText = "Qté :";
        settingsContent.appendChild(settingsQuantity);
        //Bouton
        let inputSection = document.createElement("input");
        settingsContent.appendChild(inputSection);
        inputSection.setAttribute("type", "number");
        inputSection.classList.add = "itemQuantity";
        inputSection.setAttribute("name", "itemQuantity");
        inputSection.setAttribute("min", "1");
        inputSection.setAttribute("max", "100");
        inputSection.setAttribute("value", singleproduct.quantity);
        inputSection.addEventListener("change", (event) => {
          updatePriceAndQuantity(
            singleproduct.id,
            event.target.value,
            singleproduct
          );
        });

        //Delete
        let deleteSettings = document.createElement("div");
        deleteSettings.classList.add("cart__item__content__settings__delete");
        settingsContent.appendChild(deleteSettings);
        let deleteItem = document.createElement("p");
        deleteItem.classList.add("deleteItem");
        deleteItem.innerText = "Supprimer";
        deleteSettings.appendChild(deleteItem);
        deleteItem.addEventListener("click", () => {
          deleteProduct(singleproduct.id);
          location.reload();
        });
        //Fonction Quantité totale du panier
        totalQuantities(singleproduct.quantity);
        //Fonction Prix total du panier
        incrementationTotalPrice(singleproduct.quantity, product.price);
      });
  }
}

displayCart(cartProducts);

//Fonction Quantité par article
//Sélection de l'ID dans html
const elementQuantity = document.getElementById("totalQuantity");
let totalquantity = 0;
 
function totalQuantities(quantity) {
  // Utilisation de parseInt pour convertir un argument en une chaîne de caractère
    const quantitysum = parseInt(quantity);
 //Ajout de la quantité à la quantité totale
    totalquantity += quantitysum;
    //Affichage de la quantité totale
  elementQuantity.innerText = totalquantity;
}

//Fonction Prix total par article

let elementPrice = document.getElementById("totalPrice");
let totalPrice = 0;
function incrementationTotalPrice(qty, price) {
  let priceOfProduct = qty * price;
  //Ajout du prix à la quantité totale
  totalPrice += priceOfProduct;
  //Affichage du prix total
  elementPrice.innerText = totalPrice;
}

// fonction de mise à jour du prix et de la quantité
function updatePriceAndQuantity(id, quantity, singleproduct) {
  //La find()méthode renvoie la valeur du premier élément qui réussit un test
  //La find()méthode exécute une fonction pour chaque élément du tableau. 
  //Si la fonction renvoie true, la find()méthode renvoie la valeur de l'élément, et ne vérifie pas les autres valeurs. Sinon, elle renvoie undefined.
  let product = cartProducts.find((product) => product.id === id);

  product.quantity = quantity;

  saveBasket(cartProducts);
  location.reload();
  alert("Votre panier a été mis à jour");
}
//fonction de suppression d'un produit
function deleteProduct(id) {
  let product = cartProducts.find((product) => product.id === id);
  let index = cartProducts.indexOf(product);
  // https://www.w3schools.com/jsref/jsref_indexof_array.asp
  cartProducts.splice(index, 1);
  saveBasket(cartProducts);
  location.reload();
  alert("Votre article a été supprimé");
}
//fonction de suppression d'un article
function deleteArticle() {
  let deleteButtons = document.querySelectorAll(".deleteItem");
  for (let deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", (event) => {
      let article = event.target.closest(".cart__item");
      let id = article.getAttribute("data-id");
      deleteProduct(id);
    });
  }
}
deleteArticle();

// Fonction de validation du formulaire
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");
let bouton = document.getElementById("order");

let firstNameErrorMsg = firstName.nextElementSibling;
let lastNameErrorMsg = lastName.nextElementSibling;
let addressErrorMsg = address.nextElementSibling;
let cityErrorMsg = city.nextElementSibling;
let mailErrorMsg = email.nextElementSibling;
// https://www.w3schools.com/jsref/prop_element_nextelementsibling.asp

//Expressions
// https://www.youtube.com/watch?v=dinW2QTSNl4
// https://regex101.com/
//Regex.IsMatch Méthode =>Indique si l'expression régulière trouve une correspondance dans la chaîne d'entrée.

/*si la valeur de champ est différente du test regex, 
alors message d'erreur,sinon, pas de message*/

function validForm() {
  let reFirstName = new RegExp("[A-Z][a-z]+");
  if (!firstName.value.match(reFirstName)) {
    firstNameErrorMsg.innerText = "Merci de renseigner votre prénom";
  } else {
    firstNameErrorMsg.innerText = "";
  }

  let reLastName = new RegExp("[A-Z][a-z]+");
  if (!lastName.value.match(reLastName)) {
    lastNameErrorMsg.innerText = "Merci de renseigner votre nom";
  } else {
    lastNameErrorMsg.innerText = "";
  }

  let reAddress = new RegExp(
    "^[0-9]{1,5}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );
  if (!address.value.match(reAdress)) {
    addressErrorMsg.innerText = "Merci de renseigner votre adresse";
  } else {
    addressErrorMsg.innerText = "";
  }

  let reCity = new RegExp("[A-Z][a-z]+");
  if (!city.value.match(reCity)) {
    cityErrorMsg.innerText = "Merci de renseigner votre ville";
  } else {
    cityErrorMsg.innerText = "";
  }

  let reEmail = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
  if (!email.value.match(reEmail)) {
    mailErrorMsg.innerText = "Merci de renseigner votre email";
  } else {
    mailErrorMsg.innerText = "";
  }
}

bouton.addEventListener("click", validForm);

//Fonction envoi de la commande

bouton.addEventListener("click", (event) => {
  event.preventDefault();

  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };
  let products = [];
  for (let product of cartProducts) {
    products.push(product.id);
  }
  let order = {
    contact,
    products,
  };

  let options = {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch("http://localhost:3000/api/products/order", options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("order", JSON.stringify(data));
      window.location.href = "confirmation.html";
    })
    .catch((error) => {
      console.log(error);
    });
});
