document.querySelectorAll('.video-item').forEach(item => {
  const video = item.querySelector('video');

  item.addEventListener('mouseenter', () => {
    video.play();
  });

  item.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0; // optional: reset to start
  });
});
