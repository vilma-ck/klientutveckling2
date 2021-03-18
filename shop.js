$(document).ready(function(){

    if(localStorage.getItem("name") == "" || localStorage.getItem("name") === null){
      $("#welcomeH2").html("Välkommen gäst!");
    }else {
      $("#welcomeH2").html("Välkommen " + localStorage.getItem("name") + "!");
    };

    $(".add-to-cart").click(addToCart);

    function addToCart(event){
        console.log("added");
        let productId = event.target.parentElement;
        console.log(productId);

    };



  });
