const slider = document.querySelector(".slider-container");
//el array.from transforma el objeto del dom en un array. 
slides = Array.from(document.querySelectorAll(".slide"));

let isDragging = false;
startPos = 0;
currentTranslate = 0;
prevTranslate = 0;
animationID = 0;
currentIndex = 0;


//Para quitar que no se puedan mover las img
slides.forEach((slide, index) => {
    const slideImage = slide.querySelector("img")
    slideImage.addEventListener("dragstart", (e) => e.preventDefault())


    //touch events
    slide.addEventListener("touchstart", touchStart(index))
    slide.addEventListener("touchsend", touchEnd)
    slide.addEventListener("touchmove", touchMove)

    //mouse events
    slide.addEventListener("mousedown", touchStart(index))
    slide.addEventListener("mouseup", touchEnd)
    slide.addEventListener("mouseleave", touchEnd)
    slide.addEventListener("mousemove", touchMove)

});

//función para quitar el menú desplegable al hacer click sobre img
window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
}

function touchStart(index) {
    return function (event) {
        isDragging= true;
    }
}

function touchEnd() {
isDragging = false
}
function touchMove() {
 if (isDragging) {
    console.log("move")
 }   
}