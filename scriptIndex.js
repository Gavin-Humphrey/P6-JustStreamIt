
function fetchFilmUrl(url) {
    return fetch(url)
    .then(response => {
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            return response.json();
        }
    })
    .catch(e => {
      console.log(`There is a problem while executing operation - "${url}": ` + e.message);
    })
    .finally(() => {
        console.log(`Operation for "${url}" was successful.`);
      });
    }


/* variables Definition */

let arrows_right = document.getElementsByClassName("arrow right");
let arrows_left = document.getElementsByClassName("arrow left");
let films_lists = document.getElementsByClassName("film_list");
let positions = [0, 0, 0, 0];
let desktop = window.matchMedia("(min-width: 640px)");



for (let i = 0; i <= 3; i++) {

    let arrow_left = arrows_left[i];
    let arrow_right = arrows_right[i];
    let films_list = films_lists[i];
    let position = positions[i];
    
    arrow_right.onclick = function() {
        position = Math.max(minPosition(), position - 1);
        positions[i] = position
        arrowOpacity(position, arrow_left, arrow_right);
        var translate = "translate(" + (1 / 7) * 100 * position + "%)"
        films_list.style.transform = translate;
    }

    arrow_left.onclick = function() {
        position = Math.min(0, position + 1);
        positions[i] = position
        arrowOpacity(position, arrow_left, arrow_right);
        var translate = "translate(" + (1 / 7) * 100 * position + "%)"
        films_list.style.transform = translate;
    }

    desktop.addEventListener("change", function() {
        console.log("change");
        position = Math.max(-3, position);
        positions[i] = position
        arrowOpacity(position, arrow_left, arrow_right);
        var translate = "translate(" + (1 / 7) * 100 * position + "%)"
        films_list.style.transform = translate;
    });
}


function arrowOpacity(position, arrow_left, arrow_right) {
    if (position === 0) {
        arrow_left.style.visibility = "hidden"
    } else {
        arrow_left.style.visibility = "visible" 
    }
    if (position === minPosition()) {
        arrow_right.style.visibility = "hidden"
    } else {
        arrow_right.style.visibility = "visible" 
    }
}


function minPosition() {
    let minPosition;
    if (desktop.matches) {
        minPosition = -3;
    } else {
        minPosition = -6;
    }
    return minPosition;
}

desktop.addEventListener("change", function() {
    console.log("change");
    for (let i = 0; i <= 3; i++) {

        let arrow_left = arrows_left[i];
        let arrow_right = arrows_right[i];
        let films_list = films_lists[i];
        let position = positions[i];

        position = Math.max(-3, position);
        positions[i] = position
        console.log(positions)

        arrowOpacity(position, arrow_left, arrow_right);
        var translate = "translate(" + (1 / 7) * 100 * position + "%)"
        films_list.style.transform = translate;
    }
})

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
///////////////////
// Getting the best films parameters from the best films API url.

function getBestFilmsData(url) {
    best_film_data = fetchFilmUrl(url);
    best_film_data.then(film => {
        console.log(film);
        displayBestFilm(film);
    });
}


/* Uploading the best films settings in the .main_card container of the HTML file,  
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


//Definition of variables

let categories = ["", "drama", "comedy", "horror"];
let categories_urls = get_categories_urls(categories, 2);
let films_articles = document.querySelectorAll(".films");














