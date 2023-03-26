let label = document.getElementById('label');
let ShoppingCart = document.getElementById('shopping-cart');
let basket = JSON.parse(localStorage.getItem("numbers")) || [];
let calculation = () => {
    let cart = document.getElementById("cartAmount");
    cart.innerHTML = basket.map((shop) => shop.item).reduce((shop,shop1) => shop+shop1, 0);
   }
   calculation ();

   let generateCartItems = () => {
    if (basket.length !== 0){
        return (ShoppingCart.innerHTML = basket.map((shop)=>{
            let = {id,item} = shop;
            let search =shopItemsData.find((shop1)=> shop1.id === id) || [];
            return `
            <div class="cart-item">
                     <img src= ${search.image} />
                     <div class="title-price-x">
                                          <div class="name"> ${search.name} </div>
                  <div class="shop-item-button buttons">
                  <i onclick="decrement(${id})" class="fa fa-minus-circle" aria-hidden="true"></i>
                  <div id=${id} class="quantity">${item}</div>
                  <i onclick="increment(${id})" class="fa fa-plus-circle" aria-hidden="true"></i>
                  </div> 
                 <h5>${item * search.price}$</h5>
                 <i onclick="remove(${id})" class="fa fa-trash-o" aria-hidden="true"></i>
            </div> </div>
            
            
            
            `
        }).join(""))
    } else {
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
         <h2> Cart is Empty </h2>
         <a href="index.html">
          <button class="home">Back to home</button>
           </a>
        `;

    }
   };
   generateCartItems();

   let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((shop) => shop.id === selectedItem.id);
     if (search === undefined){
        basket.push ({
            id: selectedItem.id,
            item:1,
        });
     } else {
        search.item += 1;
     }
     generateCartItems();
     update(selectedItem.id);
     localStorage.setItem("numbers", JSON.stringify(basket));
};
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((shop) => shop.id === selectedItem.id);
     if(search === undefined) 
     return;
      else if (search.item === 0) 
     return;
     else {
        search.item -= 1;
     }
    
     basket = basket.filter((shop) => shop.item !==0 );
     generateCartItems();
     update (selectedItem.id);
     localStorage.setItem("numbers", JSON.stringify(basket));
};
let update= (id) => {
    let search = basket.find((shop) => shop.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    total ();
    };
let remove = (id) => {
    let selectedItem = id;
    basket = basket.filter((shop)=>shop.id !== selectedItem.id);
    generateCartItems ();
    total ();
    localStorage.setItem("numbers", JSON.stringify(basket));
};

let total = () => {
        if (basket.length !== 0) {
          let amount = basket.map((shop) => {
              let {item,id} = shop;
              let search = shopItemsData.find((shop1) => shop1.id === id);
              return item * search.price;
            }) .reduce((shop, shop1) => shop + shop1, 0);
      
          return (label.innerHTML = `
          <h4>Total:${amount}$</h4>
          <button class="checkout">Checkout</button>
          <button onclick="clearCart()" class="removeAll">Clear Cart</button>
          `);
        } else return;
      };
      
      total();

      let clearCart = () => {
        basket = [];
        generateCartItems();
        calculation();
        localStorage.setItem("numbers", JSON.stringify(basket));
}
