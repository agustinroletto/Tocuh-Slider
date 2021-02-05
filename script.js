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
});
