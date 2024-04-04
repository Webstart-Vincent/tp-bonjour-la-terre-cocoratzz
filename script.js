const previousButton = document.querySelector(".bi-chevron-left");
const nextButton = document.querySelector(".bi-chevron-right");
const carrousel = document.querySelector(".carrousel");
const bodycolor = document.querySelector("body");

let index = 0;
const maxIndex = 2;
const setUi = () => {
    carrousel.style.transform = `translateX(-${index * 100}%)`;
    // Changer la couleur du body
    if (index == 0) {
        bodycolor.style.backgroundColor = `#242830`;
    } else if (index == 1) {
        bodycolor.style.backgroundColor = `#f5f7f8`;
    } else if (index == 2) {
        bodycolor.style.backgroundColor = `#000`;
    }
};

previousButton.addEventListener("click", () => {
    if (index > 0) {
        index--;
        setUi();
    }
    // Masquer la flèche de gauche si l'index est égal à zéro
    if (index === 0) {
        previousButton.style.display = "none";
    } else {
        previousButton.style.display = "block";
    }
    // Afficher la flèche de droite lorsque vous n'êtes pas sur la dernière image
    if (index < maxIndex - 1) {
        nextButton.style.display = "block";
    }
});

nextButton.addEventListener("click", () => {
    if (index < maxIndex) {
        index++;
        setUi();
    }
    // Afficher la flèche de gauche lorsque vous n'êtes pas sur la première image
    previousButton.style.display = "block";
    // Masquer la flèche de droite si vous êtes sur la dernière image
    if (index === maxIndex) {
        nextButton.style.display = "none";
    }
});
