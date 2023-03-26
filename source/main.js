let shop = document.getElementById('shop');

 let basket = JSON.parse(localStorage.getItem("numbers")) || [];

 

let generateShop = () => {
    return (shop.innerHTML =  shopItemsData.map((shop) => {
        let {id,name,price,image} = shop;
        let search = basket.find((shop) => shop.id === id ) || [];
        return `
        <div id=product-id-${id} class="w3-quarter item">
          <img src="${image}" class ="shop-item-image" alt="photo"> 
          <div class="details">
          <h4 class="shop-item-title" class="productName">${name}</h4>
               <i class="fa fa-star" aria-hidden="true"></i>
               <i class="fa fa-star" aria-hidden="true"></i>
               <i class="fa fa-star" aria-hidden="true"></i>
               <i class="fa fa-star" aria-hidden="true"></i> 
          <h6 class="shop-item-price" class="productValue">  ${price} $ </h6>
           <div>
            <button class="buton"> 
            <i onclick="decrement(${id})" class="fa fa-minus-circle" aria-hidden="true"></i>
            <div id=${id} class="quantity">${search.item === undefined ? 0 :search.item}</div>
            <i onclick="increment(${id})" class="fa fa-plus-circle" aria-hidden="true"></i> </button> </div>
        </div>
        </div>
        `
    } ).join(" "));
};
generateShop ();

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
    
     basket = basket.filter((shop) => shop.item !== 0 );
    
     update (selectedItem.id);
     localStorage.setItem("numbers", JSON.stringify(basket));
};

let update= (id) => {
let search = basket.find((shop) => shop.id === id);
document.getElementById(id).innerHTML = search.item;
calculation();
};

let calculation = () => {
 let cart = document.getElementById("cartAmount");
 cart.innerHTML = basket.map((shop) => shop.item).reduce((shop,shop1) => shop+shop1, 0);
}
calculation ();

// function update (id)  {
//     let search = basket.find((shop) => shop.id === id);
//     document.getElementById(id).innerHTML = search.item;
//     calculation();
//     };

