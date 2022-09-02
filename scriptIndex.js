
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


var current_rotation = 0;

document.querySelector(".logo").addEventListener('mouseover', function() {
	current_rotation += 360 * 2;
	document.querySelector(".logo img").style.transform = 'rotate(' + current_rotation + 'deg)';
});


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


//Definition of variables

let categories = ["", "drama", "comedy", "horror"];
let categories_urls = get_categories_urls(categories, 2);
let films_articles = document.querySelectorAll(".films");

// Calling the functions to get films data to fill the DOM for each category

for (let i = 0; i <=3; i++) {

    let category_urls = categories_urls[i];
    let film_article = films_articles[i];

    let page1 = fetchFilmUrl(category_urls[0]);
    let page2 = fetchFilmUrl(category_urls[1]);

    Promise.all([page1, page2]).then(values => {
        let films_urls = [];
        for (value of values) {
            for (film of value.results) {
                films_urls.push(film.url);
            };
        };
        getFilms(films_urls, film_article);
    });
}


// Returns a URL which is used to get category data from the API

function get_category_urls(category, nb_of_pages) {
    let urls = [];
    for (let i = 1; i <= nb_of_pages; i++) {    
        var url =  `http://localhost:8000/api/v1/titles/?format=json&genre=${category}&page=${i}&sort_by=-imdb_score`;
        urls.push(url);
    }
    return urls;
};


// Returns a list of urls from a list of categories

function get_categories_urls(categories, nb_of_pages) {
    urls = [];
    for (let category of categories) {
        urls.push(get_category_urls(category, nb_of_pages));
    }
    return urls;
}


// Gets the list of films based on the API request urls.

function getFilms(films_urls, film_article) {
    films_promises = []
    for (url of films_urls) {
        films_promises.push(fetchFilmUrl(url));
    };
    Promise.all(films_promises).then(films => {
        displayFilms(films, film_article);
        setModal(films);
    });
};


/* Updates the DOM to show the films images in the carusels,  
and displays the block on the screen immediately after loading all the data.*/

function displayFilms(films, film_article) {
    article = film_article;
    let i = 0;
    for (image of article.querySelectorAll(".film_img img")) {
        image.setAttribute("src", films[i].image_url);
        image.setAttribute("alt", films[i].title);
        i += 1;
    };
    film_article.style.visibility = "visible";
};



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

    document.querySelector("#summary p").textContent = film.long_description;

    document.querySelectorAll("#cast ul li")[0].textContent = `Producer: ${toString(film.directors)}`;
    document.querySelectorAll("#cast ul li")[1].textContent = `Cast: ${toString(film.actors)}`;

    document.querySelectorAll("#ratings ul li")[0].textContent = `Votes: ${film.avg_vote}/10`;
    document.querySelectorAll("#ratings ul li")[1].textContent = `Imdb: ${film.imdb_score}/10`;
    document.querySelectorAll("#ratings ul li")[2].textContent = film.worldwide_gross_income;/////////////

    modal.style.display = "block";

    let cross = document.querySelector("#cross img");
    cross.addEventListener("click", function() {
        modal.style.display = "none";

    });
};


// Creating date format 

function formatDate(date) {
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    full_date = day + "-" + month + "-" + year;
    return full_date
}


// Converting arrays into a strings, where each element is seperated by a space and a comma.

function toString(array) {
    string = "";
    for (item of array) {
        if (string === "") {
            string = item;
        } else {
        string = `${string}, ${item}`;
        }
    }
    return string;
}

