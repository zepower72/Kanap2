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

//----------------------------------------------------------------------------------------------------------------------------------------------------

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
function updatePriceAndQuantity(id, quantity) {
  //La find()méthode renvoie la valeur du premier élément qui réussit un test
  //La find()méthode exécute une fonction pour chaque élément du tableau.
  //Si la fonction renvoie true, la find()méthode renvoie la valeur de l'élément, et ne vérifie pas les autres valeurs. Sinon, elle renvoie undefined.
  let product = cartProducts.find((product) => product.id === id);
  product.quantity = quantity;
  //Sauvegarde des produits du localStorage
  saveBasket(cartProducts);
  location.reload();
  alert("Votre panier a été mis à jour");
}
//fonction de suppression d'un produit
function deleteProduct(id) {
  let product = cartProducts.find((product) => product.id === id);
  let index = cartProducts.indexOf(product);
  // https://www.w3schools.com/jsref/jsref_indexof_array.asp
  // La méthode splice() supprime également un ou plusieurs éléments du tableau. Elle prend en premier argument l'index à partir duquel
  //on commence la suppression et en deuxième argument le nombre d'éléments à supprimer.
  // Après cette opération, elle réindexe les éléments pour qu'il n'y ait pas de case vide, puis diminue la longueur du tableau de 1
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

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Validation du formulaire

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");
let bouton = document.getElementById("order");

// verification des infos client
bouton.addEventListener("click", regTest);

// regEx verification méthode test
/*La méthode test() de RegExp va également rechercher des correspondances entre une expression régulière et une chaine de caractères 
mais va cette fois-ci renvoyer le booléen true si au moins une correspondance a été trouvée ou false dans le cas contraire.*/
//Création de variables type Txt,adress et mail
const regexTxt = /^[A-Za-zàâäéèêëïîôöùûüç\s]+$/;
const regexAddress = /^[A-Za-z0-9àâäéèêëïîôöùûüç\s]{5,50}$/;
const regexEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
function regTest(click) {
  if (regexTxt.test(firstName.value) === false) {
    click.preventDefault();
    msgError("firstNameErrorMsg");
    return;
  }

  if (regexTxt.test(lastName.value) === false) {
    click.preventDefault();
    msgError("lastNameErrorMsg");
    return;
  }
  if (regexAddress.test(address.value) === false) {
    click.preventDefault();
    msgError("addressErrorMsg");
    return;
  }
  if (regexTxt.test(city.value) === false) {
    click.preventDefault();
    msgError("cityErrorMsg");
    return;
  }
  if (regexEmail.test(email.value) === false || email.value === "") {
    click.preventDefault();
    msgError("emailErrorMsg");
    return;
  } else {
    click.preventDefault();
  }
  let isComplete = confirm("Voulez vous valider votre panier ?");
  if (isComplete === true) {
    click.preventDefault();
    panierFinal();
  } else click.preventDefault();
}

// message d'erreur en fonction de l'emplacement de la saisie
function msgError(location) {
  document.getElementById(location).innerText = "Verifier votre saisie";
}

//creation du fichier à envoyer
function panierFinal() {
  // création du fichier de contact
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };
  //  Variable de tableau de produits
  let products = [];
  // boucle pour récupérer les produits du LS
  for (let product of cartProducts) {
    products.push(product.id);
  }
  // Variable de la commande
  let order = {
    contact,
    products,
  };
  // variable de l'envoi de la commande
  let options = {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json",
    },
  };
  // envoi de la commande sur l'API en méthode POST
  fetch("http://localhost:3000/api/products/order", options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location.href = `confirmation.html?id=${data.orderId}`;
      // redirection vers la page de confirmation
    })
    .catch((error) => {
      console.log(error);
    });
}
