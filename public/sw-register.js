// Service Worker Registration Script
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });

  // Handle service worker updates
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', function() {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  // Listen for messages from the service worker
  navigator.serviceWorker.addEventListener('message', function(event) {
    if (event.data === 'reload') {
      window.location.reload();
    }
  });
} 