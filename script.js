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
        currentIndex = index;
        starPos = getPositionX(event);
        isDragging = true;
        //animación
        animationID = requestAnimationFrame(animation)
        slider.classList.add("grabbing")
    }
}

function touchEnd() {
    isDragging = false
    cancelAnimationFrame(animationID)

    const movedBy = currentTranslate - prevTranslate

    if (movedBy < -100 && currentIndex < slides.length - 1)
        currentIndex += 1

    if (movedBy > -100 && currentIndex > 0)
        currentIndex -= 1

    setPositionByIndex()

    slider.classList.remove("grabbing")
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos
    }
}


function getPositionX(event) {
    event.type.includes("mouse") ? event.pageX :
        event.touches[0].clientX
}

function animation() {
    setSliderPosition()
    if (isDragging) requestAnimationFrame(animation)



}

function setSliderPosition() {
    slider.style.transform = "translateX(${currentTranslate}px)"

}

function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth
    prevTranslate = currentTranslate
    setSliderPosition()
}