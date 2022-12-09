let cartProducts = JSON.parse(localStorage.getItem('basket'));
console.log(cartProducts);

function displayCart(cartProducts){
    for(let product of cartProducts){
        fetch (`http://localhost:3000/api/products/${product.id}`)
        .then((res) => {
            if(res.ok){
                return res.json();
            }
        })
        .then((product) => {
            console.log(product);
        }   
        )};
    };

displayCart(cartProducts);
