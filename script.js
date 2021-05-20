// Récupère une liste des images des produits.
let imagesProduits = document.querySelectorAll('.prodImg');

// Récupère une liste des descriptions des produits (cachées par défaut).
let descriptionsProduits = document.querySelectorAll('.prodDesc');

// Boucle pour les images de produits qui changent au passage de la souris.
for (let i = 0; i < imagesProduits.length; i++) {
    // La souris passe sur l'image => elle est cachée, la description s'affiche.
    imagesProduits[i].addEventListener('mouseenter', function () {
        imagesProduits[i].style.display = 'none';
        descriptionsProduits[i].removeAttribute("hidden");
    })

    // La souris sort de la description => elle est cachée, l'image s'affiche.
    descriptionsProduits[i].addEventListener('mouseleave', function () {
        imagesProduits[i].style.display = 'block';
        descriptionsProduits[i].setAttribute("hidden", true);
    })
}


// sticky NavBar
document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        document.getElementById('navbar_top').classList.add("fixed-top");
        // add padding top to show content behind navbar
        navbar_height = document.querySelector(".navbar").offsetHeight;
        document.body.style.paddingTop = navbar_height + "px";
      } else {
        document.getElementById('navbar_top').classList.remove("fixed-top");
        // remove padding top from body
        document.body.style.paddingTop = "0";
      }
    });
  });
// go to top button
  var goToTopButton = document.getElementById("goToTop");

Quand l'utilisateur scrolle vers le bas.
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  // Quand l'utilisateur scrolle vers le bas, dès 50px le bouton apparaît.
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    goToTopButton.style.display = "block";
    // Sinon, il est invisible.
  } else {
    goToTopButton.style.display = "none";
  }
}

// Quand l'utilisateur clique sur le bouton, il revient en haut de la page.
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
