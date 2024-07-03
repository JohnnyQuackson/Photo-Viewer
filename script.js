let currentPhotoIndex = 0;

const photoElement = document.getElementById('photo');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const randomButton = document.getElementById('random');

prevButton.addEventListener('click', () => {
    animateSwipe('right');
    setTimeout(showPreviousPhoto, 500);
});

nextButton.addEventListener('click', () => {
    animateSwipe('left');
    setTimeout(showNextPhoto, 500);
});

randomButton.addEventListener('click', () => {
    animateSwipe('random');
    setTimeout(showRandomPhoto, 500);
});

photoElement.addEventListener('contextmenu', (event) => {
    event.preventDefault(); // Disable right-click context menu on the image
});

// Touch event listeners
photoElement.addEventListener('touchstart', handleTouchStart, false);
photoElement.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;

function handleTouchStart(evt) {
    const firstTouch = (evt.touches || evt.originalEvent.touches)[0];
    xDown = firstTouch.clientX;
}

function handleTouchMove(evt) {
    if (!xDown) {
        return;
    }

    let xUp = evt.touches[0].clientX;
    let xDiff = xDown - xUp;

    if (Math.abs(xDiff) > 50) { // Ensure swipe distance is enough to be a swipe
        if (xDiff > 0) {
            // Swipe left
            animateSwipe('left');
            setTimeout(showNextPhoto, 500);
        } else {
            // Swipe right
            animateSwipe('right');
            setTimeout(showPreviousPhoto, 500);
        }
        xDown = null; // Reset xDown
    }
}

function animateSwipe(direction) {
    photoElement.style.opacity = '0';
    if (direction === 'left') {
        photoElement.style.transform = 'translateX(-100%)';
    } else if (direction === 'right') {
        photoElement.style.transform = 'translateX(100%)';
    } else {
        const randomDirection = Math.random() > 0.5 ? 'translateX(-100%)' : 'translateX(100%)';
        photoElement.style.transform = randomDirection;
    }
    setTimeout(() => {
        photoElement.style.transition = 'none';
        photoElement.style.transform = direction === 'left' ? 'translateX(100%)' : 'translateX(-100%)';
        photoElement.style.opacity = '0';
        setTimeout(() => {
            photoElement.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
            photoElement.style.transform = 'translateX(0)';
            photoElement.style.opacity = '1';
        }, 20);
    }, 500);
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
