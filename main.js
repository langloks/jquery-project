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

  console.log($(this).data("totalprice"));
  console.log($(this).data("count"));    
  


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


$(".trash").click(function(){
  localStorage.clear();
  location.reload();
  $(".empty").invisible();
})
//function pour vider le pannier /  remettre a 0 les compteur
$(".empty").click(function minus () {
  let prevNum = parseFloat(localStorage.getItem(`${$(this).data("name")}Number`));
 
  if (prevNum > 1){
    let countUpdate = prevNum - 1
    localStorage.setItem(`${$(this).data("name")}Number`, countUpdate );
    console.log(countUpdate)
  }
  else {
    localStorage.setItem(`${$(this).data("name")}Number`, 0 );
    $(this).invisible();
  }

  let prevPrice = parseFloat(localStorage.getItem(`${$(this).data("name")}TotalPrice`));
  let itemPrice = parseFloat(localStorage.getItem(`${$(this).data("name")}Price`));
  localStorage.setItem(`${$(this).data("name")}TotalPrice`, prevPrice - itemPrice );
  
  console.log( (prevPrice - itemPrice))

});


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

    if (itemNameValue !== null) {
      $('.produits').append(`<h2 class="itemPanier">${itemNameValue}</h2> 
      <button onclick="minus()" id="${itemId}" data-price="${ itemPriceValue}" data-totalPrice="${itemTotalPriceValue}" data-count="${itemNumberValue}">-</button>
      <button type="disabled">${itemNumberValue}</button>
      <button onclick="plus()" id="${itemId}" data-price="${ itemPriceValue}" data-totalPrice="${itemTotalPriceValue}" data-count="${itemNumberValue}">+</button>
      <p>${itemTotalPriceValue}$</p>
      <img style="width:100px;" src="./assets/items/${'produit'+i+'.jpeg'}">
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
 
}

// function minus (item){
//   let prevNum = parseFloat(localStorage.getItem(`${$(this).attr("id")}Number`));
//   localStorage.setItem(`${item}Number`, (prevNum -= 1))
// // console.log($(this).attr("id"))
// }

function plus (e){
  let prevNum = parseFloat(localStorage.getItem(`${$(this).attr("id")}Number`));
  localStorage.setItem(`${$(this).attr("id")}Number`, (prevNum -= 1))

}




// function cart() {
//   for (i = 0; i < itemsNames.length; i++){
   
//   let productName = itemsNames[i];
//   $('.produits').append(`<h2>${productName}</h2>`)
//   $('h2').append(`<img src="">`)
// console.log(productName)
//   }
  
  //  $(`<div class="produits"><h2>${productName}</h2></div>`).appendTo( ".produits" );

viewShopping();



