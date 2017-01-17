var elements = document.getElementsByClassName("badge-content");
console.log(elements);
console.log(elements.length);
var selected = ""

for (var i = 0; i < elements.length; i++) {
    console.log('hello');
    elements[i].addEventListener( 'transitionend',
            function(event) {
                select_random();
            }, false);
}

function select_random() {
    var elements = document.getElementsByClassName("badge-content");
    console.log("hello");
    selected.className = "badge-content";

    var rand_int = getRandomInt(0, 8)
    var new_selected = elements[rand_int];
    new_selected.className += " highlight";
    console.log(elements.length); 
    selected = new_selected;
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


select_random();
