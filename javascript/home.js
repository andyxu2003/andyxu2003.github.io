// Scrollbar

window.onscroll = function() {
    updateScrollBar();
    showProgressBar();
  };

  function updateScrollBar() {
      var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;
      document.getElementById("progressBar").style.width = scrolled + "%";
  }

  function showProgressBar() {
      var progressBar = document.getElementById("progressBar");
      if (progressBar.classList.contains("hidden")) {
          progressBar.classList.remove("hidden");
      }
  }

// Fade in on scroll

// Select all images with the class "fade-in"
const fadeImages = document.querySelectorAll('img.fade-in');

// Options for the IntersectionObserver
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3 // Image becomes visible when 10% of it is in the viewport
};

// Function to handle intersection changes for images
function handleIntersect(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            observer.unobserve(entry.target);
        }
    });
}

// Create a new IntersectionObserver
const observer = new IntersectionObserver(handleIntersect, options);

// Observe each fade-in image
fadeImages.forEach(image => {
    observer.observe(image);
});

