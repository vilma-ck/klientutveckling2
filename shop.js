$(document).ready(function(){

 
   



  // sen fixa array i local storge

    if(localStorage.getItem("name") == "" || localStorage.getItem("name") === null){
      $("#welcomeH2").html("Välkommen gäst!");
    }else {
      $("#welcomeH2").html("Välkommen " + localStorage.getItem("name") + "!");
    };

    if(localStorage.getItem("products") === null){
        const products = [];
        localStorage.setItem("products", JSON.stringify(products));
    } 


    const products = JSON.parse(localStorage.getItem("products"));
    


    $(".add-to-cart").click(addToCart);

    function addToCart(event){
      let products = JSON.parse(localStorage.getItem("products"));
        console.log("added");
        let productId = event.target.parentElement;
        console.log(productId);
        const product = { title: "Fjällräven", price: 100};
        products.push(product);
        console.log(products);
        localStorage.setItem("products", JSON.stringify(products));
      


    };



  });

  // https://github.com/WebDevSimplified/Introduction-to-Web-Development/blob/master/Introduction%20to%20JavaScript/Lesson%201/store.js
// https://www.youtube.com/watch?v=YeFzkC2awTM&t=24s

// https://www.youtube.com/watch?v=DIVfDZZeGxM&t=132s (23 sek)
//https://github.com/bradtraversy/bookmarker/blob/master/js/main.js

