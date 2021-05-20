//appel les bouttons avec la classe .add
let button = $(".add");
let titles= []
// la bare de recherche (chercher un produit)



$('#recherche').click(function(){
  var selectRecherche = $('#rechercheProduit').val();
  var titles = $.map($('[title][title!=""]'), function(el) { return el.title });
  if (titles.indexOf(selectRecherche) != -1){
  
    let item = $(`div[title='${selectRecherche}']`);
    $('#resultRecherche').html(item);
  }
  else{
    $('#resultRecherche').text('Desolé se produit est introuvable');}
});


//function qui se declenche quand un boutton avec la class .add est cliqué
button.click(function () {
  //num vaut au dernier nombre de click sur le bouton enregister dans le local storage
  let prevNum = parseFloat(localStorage.getItem(`${$(this).attr("id")}Number`));
  // prevPrice vaut au dernier total du prix associer a ce bouton enregister dans le local storage
  let prevPrice = parseFloat(
    localStorage.getItem(`${$(this).attr("id")}TotalPrice`)
  );
if (prevNum > 0){
  $(this).data("count", (prevNum += 1));
}
else {
  $(this).data("count", 1);
}
  //lorsque le boutton est cliqué on ajoute 1 au compte des clicks
  
  //si le prix precedent = 0 alors le total des prix est = au prix de l'article
  if (prevPrice > 0) {
    $(this).data("totalprice", prevPrice + parseFloat(`${$(this).data("price")}`));
   
  }
  //sinon, le total du prix est le total precedement enregistrer dans le local storage + le prix du produit (attention le total du prix ne vaut pas le total du prix de tout les produit mais la somme du prix d'un produit par exemple 4x le prix de la creme hydratante et pas 4x creme hydratant + 2x shampoo)
  else {
    $(this).data("totalprice", parseFloat(`${$(this).data("price")}`));
  }

  //on store dans le local storage toutes les donnees recolter (nom du produit ajouter, category, prix, total  du prix du produit, nombre de produit chaque donner est accessible par la clé associer (exemple `${$(this).attr("id")}TotalPrice`) est la cle pour avoir le prix total)
  localStorage.setItem(`${$(this).attr("id")}Name`, $(this).data("name"));
  localStorage.setItem(`${$(this).attr("id")}Price`, $(this).data("price"));
  //localStorage.setItem(`${$(this).attr("id")}Cat`, $(this).data("cat"));
  localStorage.setItem(`${$(this).attr("id")}Number`, $(this).data("count"));
  localStorage.setItem(
    `${$(this).attr("id")}TotalPrice`,
    $(this).data("totalprice")
  );
   $(`.empty[data-name='${$(this).attr("id")}']`).visible();

   let number = localStorage.getItem(`${$(this).attr("id")}Number`);
   $('#number').html(`${number}x `)
});

(function($) {
  $.fn.invisible = function() {
      return this.each(function() {
          $(this).css("visibility", "hidden");
      });
  };
  $.fn.visible = function() {
      return this.each(function() {
          $(this).css("visibility", "visible");
      });
  };
}(jQuery));





 function minusEmpty () {
  let prevNum = parseFloat(localStorage.getItem(`${$(this).data("name")}Number`));
 
  if (prevNum > 1){
    let countUpdate = prevNum - 1
    localStorage.setItem(`${$(this).data("name")}Number`, countUpdate );
    
  }
  else {
    localStorage.setItem(`${$(this).data("name")}Number`, 0 );
    $(this).invisible();
  }

  let prevPrice = parseFloat(localStorage.getItem(`${$(this).data("name")}TotalPrice`));
  let itemPrice = parseFloat(localStorage.getItem(`${$(this).data("name")}Price`));
  localStorage.setItem(`${$(this).data("name")}TotalPrice`, prevPrice - itemPrice );
  
 let number = localStorage.getItem(`${$(this).data("name")}Number`)
 if (number == 0 ) {
  $('#number').html("");
}
else {
  $('#number').html(`${number}x `)
}
}

function minusButton (produit) {
  // let item = produit;

  let prevNum = parseFloat(localStorage.getItem(`${produit}Number`));
  let itemPrice = parseFloat(localStorage.getItem(`${produit}Price`));
  if (prevNum > 1){
    let countUpdate = prevNum - 1
    localStorage.setItem(`${produit}Number`, countUpdate );
    localStorage.setItem(`${produit}TotalPrice`, countUpdate * itemPrice);
   
     location.reload();
  }
  else {
    localStorage.setItem(`${produit}Number`, 0 );
    localStorage.setItem(`${produit}TotalPrice`, 0);
    localStorage.removeItem(`${produit}Name`)
     location.reload();
    // $(`#${produit}`).invisible();
  }

  let number = localStorage.getItem(`${$(this).data("name")}Number`)

  if (number == 0 ) {
    $('#number').html("");
  }
  else {
    $('#number').html(`${number}x `)
  }

}

function plusButton (produit) {
  // let item = produit;

  let prevNum = parseFloat(localStorage.getItem(`${produit}Number`));
  let itemPrice = parseFloat(localStorage.getItem(`${produit}Price`));

    let countUpdate = prevNum + 1
    localStorage.setItem(`${produit}Number`, countUpdate );
    localStorage.setItem(`${produit}TotalPrice`, countUpdate * itemPrice);
     location.reload();
  
}

$(".empty").click(minusEmpty);



//function pour vider le pannier /  remettre a 0 les compteur
// $(".empty").click(minus());

$(".trash").click(function(){
  localStorage.clear();
  location.reload();
  $(".empty").invisible();
  $('#number').html("");

})


let prices = []
function viewShopping() {
  for (i = 0; i < 25; i++) {
    let itemName = `${"produit" + i + "Name"}`;
    let itemTotalPrice = `${"produit" + i + "TotalPrice"}`;
    let itemPrice = `${"produit" + i + "Price"}`;
    let itemNumber = `${"produit" + i + "Number"}`;
    let itemId = `${"produit" + i}`;

    let itemNameValue = localStorage.getItem(itemName);
   let  itemTotalPriceValue = localStorage.getItem(itemTotalPrice);
   let  itemPriceValue = localStorage.getItem(itemPrice);
   let  itemNumberValue = localStorage.getItem(itemNumber);
   let totalPanier 
 

   if (itemTotalPriceValue !== null) {
    prices.push(parseFloat(itemTotalPriceValue));
   }

    if (itemNameValue !== null) {
      $('#produits').append(
      `<div id="${itemId}" class="container "> 
      <div class="row">
      
      </div>
      <div class="row align-items-center d-flex justify-content-center">
      <div class="d-flex flex-column">
      <h3 class="my-4 mx-auto">${itemNameValue}</h3> 
      <div class="d-flex justify-content-center">
      <button onclick="minusButton('${itemId}')" data-price="${itemPriceValue}" data-totalPrice="${itemTotalPriceValue}" data-count="${itemNumberValue}" data-name"${itemId}">-</button>
      <button type="disabled">${itemNumberValue}</button>
      <button onclick="plusButton('${itemId}')" data-price="${itemPriceValue}" data-totalPrice="${itemTotalPriceValue}" data-count="${itemNumberValue}">+</button>
      </div>
      <p class="border border-black text-center mt-2">${itemTotalPriceValue}$</p>
     </div>
     
      <img class="col-4"  src="./assets/items/${'produit'+i+'.jpeg'}">
      </div>
      
      </div>
      </div>
      `)

      $(".trash").visible();
    }

    if (itemNumberValue > 0 ) {
      $(`.empty[data-name="${'produit'+i}"]`).visible()
    }
    else{
      $(`.empty[data-name="${'produit'+i}"]`).invisible() 
    }
    
}

const sum = prices.reduce((accumulator, element) => {
  return accumulator + element;
}, 0);
 console.log(sum);

 $('#total').prepend(`<p class="my-2">total du panier: ${sum}$</p>`)
}


viewShopping();



