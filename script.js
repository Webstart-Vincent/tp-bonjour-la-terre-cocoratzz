const previousButton = document.querySelector(".bi-chevron-left");
const nextButton = document.querySelector(".bi-chevron-right");
const slidesContainer = document.querySelector(".slides-container");
const body = document.querySelector("body");
const sections = document.querySelectorAll("section");
const navigation = document.querySelector(".navigation");
const dots = document.querySelectorAll(".dot");

let index = 0;
const maxIndex = sections.length - 1;
let startX = 0;
let isDragging = false;

const setUi = () => {
    previousButton.style.display = index === 0 ? "none" : "grid";
    nextButton.style.display = index === maxIndex ? "none" : "grid";
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    body.style.backgroundColor = getComputedStyle(
        sections[index]
    ).backgroundColor;
    updateDots();
};

const hideArrowsOnMobile = () => {
    const isMobile = window.innerWidth <= 750;
    previousButton.style.display = isMobile ? "none" : "grid";
    nextButton.style.display = isMobile ? "none" : "grid";
    if (!isMobile) {
        setUi();
    }
};

window.addEventListener("load", hideArrowsOnMobile);
window.addEventListener("resize", hideArrowsOnMobile);

previousButton.addEventListener("click", () => {
    if (index > 0) {
        index--;
        setUi();
    }
});

nextButton.addEventListener("click", () => {
    if (index < maxIndex) {
        index++;
        setUi();
    }
});

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i;
        setUi();
    });
});

slidesContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    slidesContainer.style.transition = "none";
});

slidesContainer.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diffX = startX - currentX;
    slidesContainer.style.transform = `translateX(calc(-${
        index * 100
    }% - ${diffX}px))`;
});

slidesContainer.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    const movedX = startX - e.changedTouches[0].clientX;
    const threshold = window.innerWidth / 4;
    if (movedX > threshold && index < maxIndex) {
        index++;
    } else if (movedX < -threshold && index > 0) {
        index--;
    }
    setUi();
    slidesContainer.style.transition = "";
    isDragging = false;
});

const updateDots = () => {
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
};

// Ajouter la mise en surbrillance de la première puce au chargement initial
updateDots();
