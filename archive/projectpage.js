window.addEventListener("scroll", () => {
    const scrollProgressBar = document.getElementById("scrollBar");
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / totalHeight) * 100;

    scrollProgressBar.style.width = `${scrolled}%`;
  });

  document.addEventListener("DOMContentLoaded", function () {
    const fadeInDiv = document.getElementById("main");
    fadeInDiv.classList.add("fade-in");
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