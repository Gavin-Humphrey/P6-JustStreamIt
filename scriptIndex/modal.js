// Sets the call of the modal window if a film  is clicked with eventListener.

function setModal(films) {
    let i = 0;
    for (image of article.querySelectorAll(".film_img img")) {
        image.addEventListener("click", function(e, j=i, film=films[i]) {
            displayModal(films[Number(e.target.className)]);
        });
        i += 1;
    };
};

// Fills the DOM with the films data, then displays the modal window

function displayModal(film) {
    let modal = document.getElementById("modalId");
    
    image = document.querySelector("#modal_image img");
    image.setAttribute("src", film.image_url);
    image.setAttribute("alt", film.title);

    document.querySelector("#title h3").textContent = film.title;
    
    document.querySelectorAll("#film_desc ul li")[0].textContent = toString(film.genres);
    document.querySelectorAll("#film_desc ul li")[1].textContent = toString(film.countries);
    document.querySelectorAll("#film_desc ul li")[2].textContent = `${film.duration} min`;
    document.querySelectorAll("#film_desc ul li")[3].textContent = formatDate(film.date_published);

    document.querySelector("#summary p").textContent = `Plot Summary : ${film.long_description}`;

    document.querySelectorAll("#cast ul li")[0].textContent = `Director : ${toString(film.directors)}`;
    document.querySelectorAll("#cast ul li")[1].textContent = `Cast : ${toString(film.actors)}`;

    document.querySelectorAll("#ratings ul li")[0].textContent = `Rating : ${film.avg_vote}/10`;
    document.querySelectorAll("#ratings ul li")[1].textContent = `IMDB Score : ${film.imdb_score}/10`;
    document.querySelectorAll("#ratings ul li")[2].textContent = `Box Office : ${film.worldwide_gross_income} $`;

    modal.style.display = "block";

    let cross = document.querySelector("#cross img");
    cross.addEventListener("click", function() {
        modal.style.display = "none";

    });
};