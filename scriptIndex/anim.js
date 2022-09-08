// Logo animation

var current_rotation = 0;

document.querySelector(".logo").addEventListener('mouseover', function() {
	current_rotation += 360 * 2;
	document.querySelector(".logo img").style.transform = 'rotate(' + current_rotation + 'deg)';
});


// variables Definition 

let arrows_right = document.getElementsByClassName("arrow right");
let arrows_left = document.getElementsByClassName("arrow left");
let films_lists = document.getElementsByClassName("film_list");
let positions = [0, 0, 0, 0];
let desktop = window.matchMedia("(min-width: 640px)");


/** Modifying the translate of the carousel, the sliding of the carousel, 
 * based on the click of the arrows */

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

// Hides and displays the arrows based on the carousel's positioning

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


// Click on scroll to the top of the document

topbutton = document.getElementById("topBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topbutton.style.display = "block";
  } else {
    topbutton.style.display = "none";
  }
}

function topFunction() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
  }
