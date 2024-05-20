/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-transparent-nav');
    } else {
        navbar.classList.remove('bg-transparent-nav');
    }
});

window.addEventListener('DOMContentLoaded', function() {

    // Back to top button
    let mybutton = document.getElementById("btn-back-to-top");

    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    mybutton.addEventListener("click", backToTop);

    function backToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
});

// Sección Noticias
let getNews = async() => {
        
    const response = await fetch("./assets/data/noticias.json");
    data = await response.json();
    
    // Llamo a las funciones para renderizar noticias
    renderNews(data);

}

document.getElementById('show-more-btn').addEventListener('click', function() {
    var hiddenCards = document.querySelectorAll('.hidden');
    hiddenCards.forEach(function(card) {
        card.classList.remove('hidden');
    });
    this.style.display = 'none'; // Ocultar el botón después de mostrar todas las noticias
});

// Obtengo las noticias generales desde el JSON
getNews();

// Comienzo render de noticias
renderNews(data);

// Renderizado de noticias
function renderNews(noticias) {

    for (const newsId of noticias) {

        let hiddenCardSet = '';
        
        if(`${newsId.id}` > 3) {
            hiddenCardSet = 'hidden';
        }

        //

        // Agrego las noticias a la tabla
        document.getElementById("contenidonoticias").innerHTML +=
        `
        
        <div class="col-md-4 ${hiddenCardSet}">
            <div class="card text-start text-bg-dark mb-3">
                <div class="card-body">
                    <h5 class="card-title">${newsId.titulo}</h5>
                    <p class="card-text fixed-card text-white" id="card-text-resume">${newsId.contenido}</p>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsModal" data-title="${newsId.titulo}" data-content="${newsId.contenido}">Leer más</button>
                </div>
            </div>
        </div>

        <!-- Modal Noticias -->
        <div class="modal fade" id="newsModal" tabindex="-1" aria-labelledby="newsModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content text-black text-start">
                    <div class="modal-header">
                        <h5 class="${newsId.titulo}" id="newsModalLabel"></h5>
                        <a>${newsId.titulo}</a>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="newsModalBody">
                        <a>${newsId.contenido}</a>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        `
    }
}
