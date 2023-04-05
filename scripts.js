function mapNumbers(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

// Introduction fade and nav recolor

var welcomeSection;
var indexPage = false;

if (document.URL.includes("index")) {
    indexPage = true;
} else {
    indexPage = false;
}

if (indexPage) {
    console.log("yes!")
    welcomeSection = document.getElementsByClassName("--welcome")[0];
}

const mainEl = document.getElementById("first_main_container");
const navEl = document.getElementsByTagName("nav")[0];
var distanceTraveled;

addEventListener("scroll", () => {

    if (window.scrollY < 10) {
        navEl.classList.remove("--nav-scrolled");
    } else if (window.scrollY >= 10) {
        navEl.classList.add("--nav-scrolled");
    }

    distanceTraveled = Math.floor((window.scrollY / (mainEl.offsetTop)) * 100);
    if (distanceTraveled >= 0 && distanceTraveled <= 100) {
       if (indexPage) {
        introductionFade(mapNumbers(distanceTraveled, 0, 100, 70, 25));
       }
    }
});

function introductionFade(d) {
    welcomeSection.style.height = (d) + "vh";
    welcomeSection.style.filter = "blur(" + (distanceTraveled / 10) + "px)";
    mainEl.style.position = "relative"; 

}


// Search button

const searchButton = document.getElementsByClassName("--search-button")[0];
const searchInput = document.getElementsByClassName("--search-input")[0];
const initialWidth = searchInput.getBoundingClientRect().width;
var currentWidth

searchButton.addEventListener("click", searchClick);

function searchClick() {
    searchInput.style.animationPlayState = "running";
    searchInput.addEventListener("animationiteration", () => {
        searchInput.style.animationPlayState = "paused";
        currentWidth = Math.floor(searchInput.getBoundingClientRect().width);
        if (currentWidth > initialWidth) {
            searchInput.focus();
        } else {
            searchInput.blur();
        }
        searchInput.removeEventListener("animationiteration", this);
    })
}

// Quick contact

const contactSection = document.getElementsByClassName("--quick-contact-form")[0];

function openContact() {
    contactSection.style.width = "20vw";
    contactSection.style.paddingRight = "2rem"
    contactSection.style.paddingLeft = "2rem";
}

function closeContact() {
    contactSection.style.width = "0vw";
    contactSection.style.paddingRight = "0rem"
    contactSection.style.paddingLeft = "0rem";
}

// Image gallery

const mainImage = document.getElementById("main_gallery_image");
const imagesArray = document.getElementsByClassName("--image-gallery-thumbnail-image");
const nextImageButton = document.getElementsByClassName("--image-gallery-next")[0];
const prevImageButton = document.getElementsByClassName("--image-gallery-previous")[0];

var activeImage = 0;

function thumbnailClicked(event) {
    
    let counter = 0;
    let elSrc = event.target.getAttribute("src");
    
    for (let i = 0; i <= imagesArray.length - 1; i++) {
        if (imagesArray[i].getAttribute("src") == elSrc) {
            activeImage = i;
        }
        galleryIndex(0);
    }
}

function galleryIndex(n) {

    activeImage += n;

    if (activeImage < 0) {
        activeImage = 2;
    } else if (activeImage > 2) {
        activeImage = 0;
    }

    mainImage.setAttribute("src", imagesArray[activeImage].getAttribute("src"));

    for (let i = 0; i <= imagesArray.length - 1; i++) {
        if (imagesArray[i].getAttribute("src") == imagesArray[activeImage].getAttribute("src")) {
            imagesArray[i].classList.add("--active-gallery-image");
        } else {
            imagesArray[i].classList.remove("--active-gallery-image");
        }
    }
}