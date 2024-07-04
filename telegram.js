document.addEventListener('DOMContentLoaded', function() {
    const telegram = window.Telegram.WebApp;
    const userIdButton = document.getElementById('user-id-button');
    
    if (telegram && telegram.initDataUnsafe) {
        const user = telegram.initDataUnsafe.user;

        if (user) {
            userIdButton.textContent = `ID: ${user.id}`;
        } else {
            userIdButton.textContent = 'User data is not available.';
        }
    } else {
        userIdButton.textContent = 'Telegram WebApp is not initialized.';
    }
});
