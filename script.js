let currentPhotoIndex = 0;

const photoElement = document.getElementById('photo');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const themeToggleButton = document.getElementById('theme-toggle');

prevButton.addEventListener('click', () => {
    animateSwipe('right');
    setTimeout(showPreviousPhoto, 300);
});

nextButton.addEventListener('click', () => {
    animateSwipe('left');
    setTimeout(showNextPhoto, 300);
});

themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('bright-theme');
});

photoElement.addEventListener('contextmenu', (event) => {
    event.preventDefault(); // Disable right-click context menu on the image
});

// Touch event listeners
photoElement.addEventListener('touchstart', handleTouchStart, false);
photoElement.addEventListener('touchmove', handleTouchMove, false);
photoElement.addEventListener('touchend', handleTouchEnd, false);

let startX = 0;
let endX = 0;

function handleTouchStart(evt) {
    startX = evt.touches[0].clientX;
}

function handleTouchMove(evt) {
    endX = evt.touches[0].clientX;
}

function handleTouchEnd() {
    const threshold = 50; // Minimum swipe distance to be considered a swipe
    if (startX - endX > threshold) {
        // Swipe left
        animateSwipe('left');
        setTimeout(showNextPhoto, 300);
    } else if (endX - startX > threshold) {
        // Swipe right
        animateSwipe('right');
        setTimeout(showPreviousPhoto, 300);
    }
}

function animateSwipe(direction) {
    photoElement.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
    if (direction === 'left') {
        photoElement.style.transform = 'translateX(-100%)';
    } else if (direction === 'right') {
        photoElement.style.transform = 'translateX(100%)';
    }
    photoElement.style.opacity = '0';
    setTimeout(() => {
        photoElement.style.transition = 'none';
        photoElement.style.transform = direction === 'left' ? 'translateX(100%)' : 'translateX(-100%)';
        photoElement.style.opacity = '0';
        setTimeout(() => {
            photoElement.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
            photoElement.style.transform = 'translateX(0)';
            photoElement.style.opacity = '1';
        }, 20);
    }, 300);
}

function showPreviousPhoto() {
    currentPhotoIndex = (currentPhotoIndex > 0) ? currentPhotoIndex - 1 : photos.length - 1;
    updatePhoto();
}

function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex < photos.length - 1) ? currentPhotoIndex + 1 : 0;
    updatePhoto();
}

function updatePhoto() {
    photoElement.src = photos[currentPhotoIndex];
}

// Initial photo
updatePhoto();
