
let categories = ["",  "action", "romance", "crime"];
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
