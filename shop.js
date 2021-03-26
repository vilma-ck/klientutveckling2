$(document).ready(function(){

 
  welcomeMessage();
  const cartArray = setupCartArray();
  checkCartQuantity(cartArray);
  load();


  function welcomeMessage(){
    if(localStorage.getItem("name") == "" || localStorage.getItem("name") === null){
      $("#welcomeH2").html("Välkommen gäst!");
    }else {
      $("#welcomeH2").html("Välkommen " + localStorage.getItem("name") + "!");
    };
  }

  function setupCartArray(){
    if(localStorage.getItem("products") === null){  
      const array = [];
      localStorage.setItem("products", JSON.stringify(array));
    } 
    const array = JSON.parse(localStorage.getItem("products"));
    return array;
  }

  function checkCartQuantity(array){
    let productsInCart = 0;
    array.forEach((product) => productsInCart += (Number(product.quantity)));
    console.log(productsInCart);
    $("#quantityInCart").html(productsInCart);
  }

  

  function load(){
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "https://webacademy.se/fakestore/");
      xhr.send();
      xhr.onreadystatechange = function(){
          if(xhr.readyState === 4 && xhr.status == 200){
              render(JSON.parse(xhr.responseText));
          }
      }
  }

  function render(json){
      console.log(json.length);
      console.log(json[0].title);

      let output = `<div class ="products">  <div class="row">`;
       
      for(i = 0; i < json.length; i++){
          output += `<div class="product col-md-3"> 
              <img class="product-image rounded" src=" ` + json[i].image + `" alt="Bild på `+ json[i].title + `">
              <span class="product-name"> ` + json[i].title + `</span> 
              <span class="product-descr"> `+ json[i].description + `</span>
              <span class="product-price"> Pris: ` + json[i].price + `$ </span>
              <span class="product-category">` + json[i].category + `</span>
              <input class="add-to-cart" type="button" value="Lägg till i varukorg">  
          </div>`;
      };   

      $("#output").html(output);
      $(".add-to-cart").click(addToCart);
  }

    function addToCart(event){
      let products = JSON.parse(localStorage.getItem("products"));
      let productId = event.target.parentElement;
      let newItem = true;
      
      products.forEach(element => { 
        if(element.title == productId.children[1].innerText){
          element.quantity ++;
          newItem = false;
        }         
      });
  
      if(newItem){
        let priceText = productId.children[3].innerText;
        const product = {title: productId.children[1].innerText, price: priceText.substring(6, priceText.length-1), quantity: 1 };
        products.push(product);
      };
      let current = $("#quantityInCart").text();
      $("#quantityInCart").html(Number(current) + 1);
      localStorage.setItem("products", JSON.stringify(products)); 
    }

  });
