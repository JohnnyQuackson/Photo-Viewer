document.addEventListener('DOMContentLoaded', function() {
    const userIdButton = document.getElementById('user-id-button');
    const telegram = window.Telegram.WebApp;

    telegram.ready();  // Initialize the Telegram Web App

    if (telegram.initDataUnsafe && telegram.initDataUnsafe.user) {
        const user = telegram.initDataUnsafe.user;
        userIdButton.textContent = `ID: ${user.id}`;
    } else {
        userIdButton.textContent = 'User data is not available.';
    }
});
