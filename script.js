let currentPhotoIndex = 0;

const photoElement = document.getElementById('photo');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const randomButton = document.getElementById('random');

prevButton.addEventListener('click', showPreviousPhoto);
nextButton.addEventListener('click', showNextPhoto);
randomButton.addEventListener('click', showRandomPhoto);

// Add touch event listeners for swipe gestures
let touchStartX = 0;
let touchEndX = 0;

photoElement.addEventListener('touchstart', handleTouchStart);
photoElement.addEventListener('touchend', handleTouchEnd);

function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipeGesture();
}

// Add mouse event listeners for swipe gestures
let mouseStartX = 0;
let mouseEndX = 0;

photoElement.addEventListener('mousedown', handleMouseStart);
photoElement.addEventListener('mouseup', handleMouseEnd);

function handleMouseStart(event) {
    mouseStartX = event.screenX;
    document.addEventListener('mousemove', handleMouseMove);
}

function handleMouseEnd(event) {
    mouseEndX = event.screenX;
    document.removeEventListener('mousemove', handleMouseMove);
    handleSwipeGesture();
}

function handleMouseMove(event) {
    mouseEndX = event.screenX;
}

function handleSwipeGesture() {
    if (touchEndX < touchStartX || mouseEndX < mouseStartX) {
        showNextPhoto();
    } else if (touchEndX > touchStartX || mouseEndX > mouseStartX) {
        showPreviousPhoto();
    }
}

function showPreviousPhoto() {
    currentPhotoIndex = (currentPhotoIndex > 0) ? currentPhotoIndex - 1 : photos.length - 1;
    updatePhoto();
}

function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex < photos.length - 1) ? currentPhotoIndex + 1 : 0;
    updatePhoto();
}

function showRandomPhoto() {
    currentPhotoIndex = Math.floor(Math.random() * photos.length);
    updatePhoto();
}

function updatePhoto() {
    photoElement.src = photos[currentPhotoIndex];
}

// Initial photo
updatePhoto();
