let currentPhotoIndex = 0;

const photoElement = document.getElementById('photo');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const randomButton = document.getElementById('random');

prevButton.addEventListener('click', () => {
    animateSwipe('right');
    setTimeout(showPreviousPhoto, 300);
});

nextButton.addEventListener('click', () => {
    animateSwipe('left');
    setTimeout(showNextPhoto, 300);
});

randomButton.addEventListener('click', () => {
    animateSwipe('random');
    setTimeout(showRandomPhoto, 300);
});

photoElement.addEventListener('contextmenu', (event) => {
    event.preventDefault(); // Disable right-click context menu on the image
});

// Touch event listeners
photoElement.addEventListener('touchstart', handleTouchStart, false);
photoElement.addEventListener('touchmove', handleTouchMove, false);
photoElement.addEventListener('touchend', handleTouchEnd, false);

let xDown = null;
let yDown = null;
let xDiff = null;
let yDiff = null;

function handleTouchStart(evt) {
    const firstTouch = (evt.touches || evt.originalEvent.touches)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
    xDiff = 0;
    yDiff = 0;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    xDiff = xDown - xUp;
    yDiff = yDown - yUp;
}

function handleTouchEnd() {
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (Math.abs(xDiff) > 50) { // Ensure swipe distance is enough to be a swipe
            if (xDiff > 0) {
                // Swipe left
                animateSwipe('left');
                setTimeout(showNextPhoto, 300);
            } else {
                // Swipe right
                animateSwipe('right');
                setTimeout(showPreviousPhoto, 300);
            }
        }
    }
    xDown = null;
    yDown = null;
    xDiff = null;
    yDiff = null;
}

function animateSwipe(direction) {
    photoElement.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
    if (direction === 'left') {
        photoElement.style.transform = 'translateX(-100%)';
    } else if (direction === 'right') {
        photoElement.style.transform = 'translateX(100%)';
    } else {
        const randomDirection = Math.random() > 0.5 ? 'translateX(-100%)' : 'translateX(100%)';
        photoElement.style.transform = randomDirection;
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

function showRandomPhoto() {
    currentPhotoIndex = Math.floor(Math.random() * photos.length);
    updatePhoto();
}

function updatePhoto() {
    photoElement.src = photos[currentPhotoIndex];
}

// Initial photo
updatePhoto();
