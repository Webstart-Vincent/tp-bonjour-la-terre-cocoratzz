/** @type {HTMLElement} */
const previousButton = document.querySelector(".bi-chevron-left");

/** @type {HTMLElement} */
const nextButton = document.querySelector(".bi-chevron-right");

/** @type {HTMLElement} */
const slidesContainer = document.querySelector(".slides-container");

/** @type {HTMLElement} */
const body = document.querySelector("body");

/** @type {NodeListOf<HTMLElement>} */
const sections = document.querySelectorAll("section");

/** @type {NodeListOf<HTMLElement>} */
const bullets = document.querySelectorAll(".bullets > button");

let index = 0;
const maxIndex = 2;

const setUi = () => {
    if (index === 0) previousButton.style.display = "none";
    else previousButton.style.display = "grid";

    if (index === maxIndex) nextButton.style.display = "none";
    else nextButton.style.display = "grid";

    slidesContainer.style.transform = `translateX(-${index * 100}%)`;

    const { backgroundColor } = getComputedStyle(sections[index]);
    body.style.backgroundColor = backgroundColor;

    for (const bullet of bullets) bullet.classList.remove("active");
    bullets[index].classList.add("active");
};
setUi();

previousButton.addEventListener("click", () => {
    if (index > 0) index--;
    setUi();
});
nextButton.addEventListener("click", () => {
    if (index < maxIndex) index++;
    setUi();
});

const touchData = {
    carouselWidth: slidesContainer.offsetWidth,
    startTouchX: 0,
    lastDeltaX: 0,
};

slidesContainer.addEventListener("touchstart", (e) => {
    touchData.startTouchX = e.touches[0].screenX;
    touchData.carouselWidth = slidesContainer.offsetWidth;
    slidesContainer.style.transition = "none";
});

slidesContainer.addEventListener("touchmove", (e) => {
    const deltaX = e.touches[0].screenX - touchData.startTouchX;

    if ((index === 0 && deltaX > 0) || (index === maxIndex && deltaX < 0))
        return;

    touchData.lastDeltaX = deltaX;

    const basePercentTranslate = index * -100;
    const percentTranslate =
        basePercentTranslate + (100 * deltaX) / touchData.carouselWidth;
    slidesContainer.style.transform = `translate(${percentTranslate}%)`;
});

slidesContainer.addEventListener("touchend", (e) => {
    if (Math.abs(touchData.lastDeltaX / touchData.carouselWidth) > 0.1) {
        if (index !== 0 && touchData.lastDeltaX > 0) index--;
        if (index !== maxIndex && touchData.lastDeltaX < 0) index++;
    }
    slidesContainer.style.transition = "";
    setUi();
});

for (let i = 0; i < bullets.length; i++)
    bullets[i].addEventListener("click", () => {
        index = i;
        setUi();
    });

/** @type {NodeListOf<HTMLLIElement>} */
const countries = document.querySelectorAll(".country");
const loaderImage = document.querySelector(".loader-image");

// Ajoutez un événement de clic à chaque pays
// Ajoutez un événement de clic à chaque pays
countries.forEach((country, index) => {
    country.addEventListener("click", () => {
        // Supprimez la classe active de tous les pays
        countries.forEach((c) => c.classList.remove("active"));

        // Ajoutez la classe active au pays cliqué
        country.classList.add("active");

        // Affichez l'image loader.svg dans le cadre à droite
        loaderImage.src = "./asset/img/img_2/loader.svg";
        loaderImage.style.display = "block";

        // Attendez 3 secondes avant de changer l'image
        setTimeout(() => {
            // Choisissez une image aléatoire
            const randomImage = getRandomImage();
            // Mettez à jour la source de l'image
            loaderImage.src = randomImage.src;
        }, 3000);

        // Effectuez toute autre action souhaitée
        console.log(`Country ${index + 1} clicked`);
    });
});

const svgImages = [
    { src: "./asset/img/img_2/lune.svg", title: "Lune" },
    { src: "./asset/img/img_2/nuage_eclair.svg", title: "Eclair" },
    { src: "./asset/img/img_2/nuage_lune_neige_violet.svg", title: "Neige" },
    { src: "./asset/img/img_2/nuage_lune_pluie_violet.svg", title: "Pluie" },
    { src: "./asset/img/img_2/nuage_lune.svg", title: "Couvert" },
    { src: "./asset/img/img_2/nuage_nuage_gris.svg", title: "Nuage gris" },
    { src: "./asset/img/img_2/nuage_soleil_neige.svg", title: "Nuageux" },
    { src: "./asset/img/img_2/nuage_soleil_pluie.svg", title: "Pluie" },
    { src: "./asset/img/img_2/nuage_soleil.svg", title: "Couvert" },
    { src: "./asset/img/img_2/nuage_violet_eclair.svg", title: "Eclair" },
    { src: "./asset/img/img_2/nuage_violet_nuage_gris.svg", title: "Couvert" },
    { src: "./asset/img/img_2/nuage_violet.svg", title: "Couvert" },
    { src: "./asset/img/img_2/nuage.svg", title: "Couvert" },
    { src: "./asset/img/img_2/pluie_violet.svg", title: "Pluie" },
    { src: "./asset/img/img_2/pluie.svg", title: "Pluie" },
    { src: "./asset/img/img_2/soleil.svg", title: "Ensoleillé" },
    { src: "./asset/img/img_2/vent_violet.svg", title: "Vent" },
    { src: "./asset/img/img_2/vent.svg", title: "Vent" },
];

// Fonction pour choisir une image aléatoire dans la liste svgImages
function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * svgImages.length);
    return svgImages[randomIndex];
}
// Ajoutez un événement de clic à chaque pays
countries.forEach((country, index) => {
    country.addEventListener("click", () => {
        // Supprimez la classe active de tous les pays
        countries.forEach((c) => c.classList.remove("active"));

        // Ajoutez la classe active au pays cliqué
        country.classList.add("active");

        // Affichez l'image loader.svg dans le cadre à droite
        loaderImage.src = "./asset/img/img_2/loader.svg";
        loaderImage.style.display = "block";

        // Attendez 3 secondes avant de changer l'image
        setTimeout(() => {
            // Choisissez une image aléatoire
            const randomImage = getRandomImage();
            // Mettez à jour la source de l'image
            loaderImage.src = randomImage.src;

            // Mettez à jour le h2 avec le titre de l'image
            const information = document.querySelector(".information");
            information.querySelector("h2").innerText = randomImage.title;
        }, 3000);

        // Effectuez toute autre action souhaitée
        console.log(`Country ${index + 1} clicked`);
    });
});

// Associez chaque image à une plage de température
const temperatureMap = {
    Lune: "15°C",
    Eclair: "20°C",
    Neige: "-5°C",
    Pluie: "10°C",
    Couvert: "18°C",
    "Nuage gris": "16°C",
    Nuageux: "14°C",
    Ensoleillé: "25°C",
    Vent: "12°C",
};

// Fonction pour obtenir la température correspondant à une image donnée
function getTemperature(imageTitle) {
    return temperatureMap[imageTitle] || "20°C"; // Valeur par défaut si l'image n'est pas dans la carte
}

// Mettez à jour la source de l'image et la température lorsque vous changez d'image
countries.forEach((country, index) => {
    country.addEventListener("click", () => {
        // Supprimez la classe active de tous les pays
        countries.forEach((c) => c.classList.remove("active"));

        // Ajoutez la classe active au pays cliqué
        country.classList.add("active");

        // Affichez l'image loader.svg dans le cadre à droite
        loaderImage.src = "./asset/img/img_2/loader.svg";
        loaderImage.style.display = "block";

        // Attendez 3 secondes avant de changer l'image
        setTimeout(() => {
            // Choisissez une image aléatoire
            const randomImage = getRandomImage();
            // Mettez à jour la source de l'image
            loaderImage.src = randomImage.src;

            // Mettez à jour le h2 avec le titre de l'image
            const information = document.querySelector(".information");
            information.querySelector("h2").innerText = randomImage.title;

            // Mettez à jour la température
            information.querySelector(".temperature").innerText =
                getTemperature(randomImage.title);
        }, 3000);

        // Effectuez toute autre action souhaitée
        console.log(`Country ${index + 1} clicked`);
    });
});
