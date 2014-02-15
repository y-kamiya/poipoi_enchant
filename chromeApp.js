chrome.app.runtime.onLaunched.addListener(function() {
      chrome.app.window.create('src/index.html', {
          bounds: {
            width: 1000,
            height: 700,
          },
          minWidth: 1000,
          minHeight: 700
      });
});
