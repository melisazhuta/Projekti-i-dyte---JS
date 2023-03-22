let carts = document.querySelectorAll ('.shop-item-button');
let products = [
    {
        name: "Vitacost Root 2",
        tag: "vitacost",
        price: 39.99,
        inCart: 0
    },
    {
        name: "Dried Cranberries",
        tag: "cranberries",
        price: 3.99,
        inCart: 0
    },
    {
        name: "Baking Soda",
        tag: "baking soda",
        price: 2,
        inCart: 0
    },
    {
        name:"Pycnogenoc",
        tag: "pycnogenoc",
        price: 35,
        inCart: 0
    }
];



for(let i=0; i < carts.length; i++) {
    carts [i].addEventListener('click', () => {
        cartNumbers(products[i]);
        total (products[i]);
    })
}

function onLoad () {
    let productNumbers = localStorage.getItem ('cartNumbers');
    if (productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}


function cartNumbers(product) {
    console.log("the product is",product)
        let productNumbers = localStorage.getItem ('cartNumbers');
        productNumbers = parseInt(productNumbers);
        if (productNumbers) {
            localStorage.setItem('cartNumbers', productNumbers + 1);
            document.querySelector('.cart span').textContent = productNumbers + 1;
        } else {
            localStorage.setItem('cartNumbers', 1);
            document.querySelector('.cart span').textContent = 1;
        }  
        setItems(product);
    }

    function setItems (product) {
        let cartItems = localStorage.getItem('productsinCart');
        cartItems = JSON.parse(cartItems);
        if(cartItems != null) { 
            if(cartItems[product.tag] == undefined) {
                cartItems = {
                    ...cartItems,
                    [product.tag]:product
                }
            }
            cartItems[product.tag].inCart +=1;
        } else {
        product.inCart = 1;
          cartItems = {
            [product.tag]:product
        }
    }
        localStorage.setItem("productsinCart", JSON.stringify (cartItems));
    }
     
    function total (cost) {
        let totalCart = localStorage.getItem('total')
        if (totalCart != null) {
            totalCart = parseInt (totalCart);
            localStorage.setItem("total", totalCart + cost.price);
        } else {
            localStorage.setItem("total", cost.price);
        }
    }

    function cart () {
          let cartItems = localStorage.getItem("productsinCart");
          cartItems =JSON.parse(cartItems);
          let productContainer = document.querySelectorAll(".products");
          let totalCart = localStorage.getItem("total");
             console.log (cartItems)
          if ( cartItems && productContainer){
                productContainer.innerHTML = ' ';
              Object.values(cartItems).map (item => {
                    productContainer.innerHTML += `
                    <div class="product">
                    <img src = "./images/${item.tag}.webp">
                    <span>${item.name}</span>
                    </div>
                    <div class="price"> ${item.price}</div>
                    <div> ${item.inCart} </div>
                    <div> ${item.inCart * item.price} </div>
                    `   
                 });
                 productContainer.innerHTML += `
                 <div class="totalbasket">
                  <h4> Baasket Total </h4>
                  <h4> ${totalCart} </h4> `
          }
    }
onLoad ();
cart ();