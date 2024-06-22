document.addEventListener("DOMContentLoaded", function () {
    const fadeInDiv = document.getElementById("self");
    fadeInDiv.classList.add("fade-in");
  });

  document.addEventListener("DOMContentLoaded", function () {
    // Select the div element
    const divToFadeIn1 = document.getElementById("about-text");
    const divToFadeIn2 = document.getElementById("instagram-icon");

    // Set a timeout to fade in the div after 1 seconds
    setTimeout(function () {
      divToFadeIn1.style.opacity = "1";
    }, 1000);

    setTimeout(function () {
      divToFadeIn2.style.opacity = "1";
    }, 2000); //

  });