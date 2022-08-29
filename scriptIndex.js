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
let movies_lists = document.getElementsByClassName("film_list");
let positions = [0, 0, 0, 0];
let desktop = window.matchMedia("(min-width: 640px)");



for (let i = 0; i <= 3; i++) {

    let arrow_left = arrows_left[i];
    let arrow_right = arrows_right[i];
    let movies_list = movies_lists[i];
    let position = positions[i];
    
    arrow_right.onclick = function() {
        position = Math.max(minPosition(), position - 1);
        positions[i] = position
        setArrowVisibility(position, arrow_left, arrow_right);
        var translate = "translate(" + (1 / 7) * 100 * position + "%)"
        movies_list.style.transform = translate;
    }

    arrow_left.onclick = function() {
        position = Math.min(0, position + 1);
        positions[i] = position
        setArrowVisibility(position, arrow_left, arrow_right);
        var translate = "translate(" + (1 / 7) * 100 * position + "%)"
        movies_list.style.transform = translate;
    }

    desktop.addEventListener("change", function() {
        console.log("change");
        position = Math.max(-3, position);
        positions[i] = position
        setArrowVisibility(position, arrow_left, arrow_right);
        var translate = "translate(" + (1 / 7) * 100 * position + "%)"
        movies_list.style.transform = translate;
    });
}

