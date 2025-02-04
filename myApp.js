const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet());

// Define HSTS duration (90 days)
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;

app.use(
  helmet({
    // Configure frameguard
    frameguard: { action: 'deny' }, 

    // Configure contentSecurityPolicy
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], // Allow resources only from this site
        scriptSrc: ["'self'", "trusted-cdn.com"], // Allow scripts from this site and trusted-cdn.com
      },
    },

    // Disable DNS prefetch control (if you prefer)
    dnsPrefetchControl: false, 

    // Enable other helmet features (defaults)
    xssFilter: true,
    noSniff: true,
    ieNoOpen: true,
    hsts: { maxAge: ninetyDaysInSeconds, force: true },
    noCache: true,
  })
);










































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
