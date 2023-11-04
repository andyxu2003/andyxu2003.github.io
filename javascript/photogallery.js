const images = document.querySelectorAll(".image");
let currentImageIndex = 0;

function showImage(direction) {
  images[currentImageIndex].style.display = "none";
  currentImageIndex =
    (currentImageIndex + direction + images.length) % images.length;
  images[currentImageIndex].style.display = "block";
}

// Add this script to display the first image on page load
window.addEventListener("load", () => {
  images[currentImageIndex].style.display = "block";
});

// Add event listeners for arrow key navigation
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    showImage(-1);
  } else if (event.key === "ArrowRight") {
    showImage(1);
  }
});

window.addEventListener("scroll", () => {
  const scrollProgressBar = document.getElementById("scrollBar");
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / totalHeight) * 100;

  scrollProgressBar.style.width = `${scrolled}%`;
});

const fadeDivs = document.querySelectorAll(".fade-scroll");

function fadeInOnScroll() {
  const windowHeight = window.innerHeight;

  fadeDivs.forEach((fadeDiv) => {
    const fadeDivTop = fadeDiv.getBoundingClientRect().top;

    if (
      fadeDivTop < windowHeight * 0.9 &&
      !fadeDiv.classList.contains("faded")
    ) {
      fadeDiv.style.opacity = 1;
      fadeDiv.style.transform = "translateY(0)";
      fadeDiv.classList.add("faded");
    } else if (
      fadeDivTop >= windowHeight * 0.9 &&
      fadeDiv.classList.contains("faded")
    ) {
      fadeDiv.style.opacity = 0;
      fadeDiv.style.transform = "translateY(50px)";
      fadeDiv.classList.remove("faded");
    }
  });
}

window.addEventListener("scroll", fadeInOnScroll);
window.addEventListener("load", fadeInOnScroll);

// Initial call to fadeInOnScroll when the page loads
fadeInOnScroll();