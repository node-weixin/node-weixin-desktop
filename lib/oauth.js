// Your GitHub Applications Credentials
var options = {
    client_id: 'your_client_id',
    client_secret: 'your_client_secret',
    scopes: ["user:email", "notifications"] // Scopes limit access for OAuth tokens.
};

// Build the OAuth consent page URL
var authWindow = new BrowserWindow({ width: 800, height: 600, show: false, 'node-integration': false });
var githubUrl = 'https://github.com/login/oauth/authorize?';
var authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scopes;
authWindow.loadURL(authUrl);
authWindow.show();

function handleCallback (url) {
  var raw_code = /code=([^&]*)/.exec(url) || null;
  var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
  var error = /\?error=(.+)$/.exec(url);

  if (code || error) {
    // Close the browser if code found or error
    authWindow.destroy();
  }

  // If there is a code, proceed to get token from github
  if (code) {
    self.requestGithubToken(options, code);
  } else if (error) {
    alert('Oops! Something went wrong and we couldn\'t' +
      'log you in using Github. Please try again.');
  }
}

// Handle the response from GitHub - See Update from 4/12/2015

authWindow.webContents.on('will-navigate', function (event, url) {
  handleCallback(url);
});

authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
  handleCallback(newUrl);
});

// Reset the authWindow on close
authWindow.on('close', function() {
    authWindow = null;
}, false);