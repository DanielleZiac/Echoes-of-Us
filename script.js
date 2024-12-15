const mapContainer = document.querySelector('.map-container');
const mapImage = document.querySelector('.scrollview');

let isDragging = false;
let startX, startY, scrollLeft, scrollTop, scale = 1; // For zoom functionality

// Mouse Events for dragging
mapImage.addEventListener('mousedown', (e) => {
    isDragging = true;
    mapImage.style.cursor = 'grabbing';
    startX = e.pageX - mapContainer.offsetLeft;
    startY = e.pageY - mapContainer.offsetTop;
    scrollLeft = mapContainer.scrollLeft;
    scrollTop = mapContainer.scrollTop;
});

mapImage.addEventListener('mousemove', (e) => {
    if (!isDragging) return; // Only drag if mouse is down
    const x = e.pageX - mapContainer.offsetLeft;
    const y = e.pageY - mapContainer.offsetTop;
    const walkX = (x - startX);
    const walkY = (y - startY);
    mapContainer.scrollLeft = scrollLeft - walkX;
    mapContainer.scrollTop = scrollTop - walkY;
});

mapImage.addEventListener('mouseup', () => {
    isDragging = false;
    mapImage.style.cursor = 'grab';
});

mapImage.addEventListener('mouseleave', () => {
    isDragging = false;
    mapImage.style.cursor = 'grab';
});

// Touch Events for dragging on mobile
mapImage.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    startX = touch.pageX - mapContainer.offsetLeft;
    startY = touch.pageY - mapContainer.offsetTop;
    scrollLeft = mapContainer.scrollLeft;
    scrollTop = mapContainer.scrollTop;
});

mapImage.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Prevent scrolling of the page
    const touch = e.touches[0];
    const x = touch.pageX - mapContainer.offsetLeft;
    const y = touch.pageY - mapContainer.offsetTop;
    const walkX = (x - startX);
    const walkY = (y - startY);
    mapContainer.scrollLeft = scrollLeft - walkX;
    mapContainer.scrollTop = scrollTop - walkY;
});

// Wheel Event for Zooming
mapContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomIntensity = 0.1;
    if (e.deltaY < 0) { // Zoom in
        scale += zoomIntensity;
    } else { // Zoom out
        scale -= zoomIntensity;
    }

    // Prevent zoom from going too far out or in
    if (scale < 1) scale = 1;
    if (scale > 3) scale = 3;

    // Apply the zoom effect
    mapImage.style.transform = `translate(${mapImage.offsetLeft}px, ${mapImage.offsetTop}px) scale(${scale})`;
});


  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {

        const href = this.getAttribute('href');

    if (href === 'login.html') {
      // Allow the default behavior for login link
      return; // Do not prevent default or execute scrolling logic
    }

      e.preventDefault(); // Prevent default anchor behavior
      const targetId = this.getAttribute('href').substring(1); // Get the ID from href
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth', // Smooth scrolling
          block: 'start' // Scroll to the top of the target element
        });
      }
    });
  });

  // Scroll to the top when clicking the logo
  document.querySelector('.logo a').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('home').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });

  document.getElementById("allow-button").addEventListener("click", function() {
    document.getElementById("cover").classList.add("hidden");
});