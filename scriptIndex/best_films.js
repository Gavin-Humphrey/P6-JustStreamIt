// Define the API request url.

let best_films_url = `http://localhost:8000/api/v1/titles/?format=json&sort_by=-imdb_score`


// Execute the main function.

getBestFilmsList(best_films_url);

// Getting the list of best films based on the API request url.

function getBestFilmsList(url) {
    best_films_page = fetchFilmUrl(url);
    best_films_page.then(value => {
        getBestFilmsData(value.results[0].url); 
    });
}

// Getting the best films parameters from the best films API url.

function getBestFilmsData(url) {
    best_film_data = fetchFilmUrl(url);
    best_film_data.then(film => {
        console.log(film);
        displayBestFilm(film);
    });
}

/* Upload the best films settings in the .main_card container of the HTML file,  
and displays the card on the screen immediately after loading all the data.*/

function displayBestFilm(film) {
    let title_contain = document.querySelector(".main_card .title h2");
    let summary_contain = document.querySelector(".main_card .summary p");
    let image_contain = document.querySelector(".main_card .image img");
    let button_contain = document.querySelector(".main_card .button button");
    
    title_contain.textContent = film.title;
    summary_contain.textContent = film.long_description;
    image_contain.setAttribute("src", film.image_url);
    image_contain.setAttribute("alt", film.title);
    button_contain.addEventListener("click", function() {
        displayModal(film);
    });

    document.querySelector(".main_card").style.visibility = "visible";
}