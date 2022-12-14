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
const elementQuantity = document.getElementById("totalQuantity");
let totalquantity = 0;
function totalQuantities(quantity) {
  const quantitysum = parseInt(quantity);
  totalquantity += quantitysum;
  elementQuantity.innerText = totalquantity;
}

//Fonction Prix total par article
let elementPrice = document.getElementById("totalPrice");
let totalPrice = 0;
function incrementationTotalPrice(qty, price) {
  let priceOfProduct = qty * price;
  totalPrice += priceOfProduct;
  elementPrice.innerText = totalPrice;
}

// fonction de mise à jour du prix et de la quantité
function updatePriceAndQuantity(id, quantity, singleproduct) {
  let product = cartProducts.find((product) => product.id === id);
  product.quantity = quantity;
  saveBasket(cartProducts);
  location.reload();
  alert("Votre panier a été mis à jour");
}

function deleteProduct(id) {
  let product = cartProducts.find((product) => product.id === id);
  let index = cartProducts.indexOf(product);
  cartProducts.splice(index, 1);
  saveBasket(cartProducts);
  location.reload();
  alert("Votre article a été supprimé");
}
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

//Fonction de validation du formulaire

