//PAGE ACCUEIL

//Pour utiliser l’API Fetch, appelez la méthode fetch, qui accepte l’URL de l’API comme paramètre :
fetch("http://localhost:3000/api/products")
  //Première promesse, qui récupére la réponse en json
  .then((response) => response.json())

  //Deuxième promesse avec ma fonction d'affichage du contenu
  .then(affichageArticles)

  //Message d'erreur si le serveur ne répond pas
  .catch((error) => alert("Se connecter à node"));

//Fonction d'affichage des articles
function affichageArticles(articles) {
  //Boucle for avec la variable "product" de l'argument "articles"
  for (const product of articles) {
    //Récupération des informations de l'id "items"
    let cards = document.getElementById("items");

    //Contenu HTML à créer
    //Insertion du lien hypertexte
    const lienElement = document.createElement("a");
    cards.appendChild(lienElement);
    lienElement.href = `product.html?id=${product._id}`;

    //Insertion de l'article
    const articleElement = document.createElement("article");
    lienElement.appendChild(articleElement);

    //Insertion de l'image
    const imgElement = document.createElement("img");
    articleElement.appendChild(imgElement);
    imgElement.src = product.imageUrl;
    imgElement.alt = product.altTxt;

    //Insertion du nom du produit
    const titleElement = document.createElement("h3");
    articleElement.appendChild(titleElement);
    titleElement.innerText = product.name;

    //Insertion de la description
    const pElement = document.createElement("p");
    articleElement.appendChild(pElement);
    pElement.innerText = product.description;
  }
  return affichageArticles;
}
