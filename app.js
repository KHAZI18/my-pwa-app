// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker Registered'))
        .catch(error => console.log('Service Worker Registration Failed', error));
}

// Handle PWA Install Prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;

    // Show the Install button
    const installButton = document.getElementById('install-btn');
    if (installButton) {
        installButton.style.display = 'block';

        installButton.addEventListener('click', () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(choice => {
                if (choice.outcome === 'accepted') {
                    console.log('User installed the PWA');
                }
                deferredPrompt = null;
                installButton.style.display = 'none';
            });
        });
    }
});

// Detect if PWA is already installed
window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    const installButton = document.getElementById('install-btn');
    if (installButton) installButton.style.display = 'none';
});
