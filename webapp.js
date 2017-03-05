const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const morgan = require('morgan');
const csurf = require('csurf');

const config = require('./config');
const twilioNotifications = require('./middleware/twilioNotifications');

// Create Express web app
const app = express();

// Use morgan for HTTP request logging in dev and prod
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming form-encoded HTTP bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// Create and manage HTTP sessions for all requests
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true
}));

// Use connect-flash to persist informational messages across redirects
app.use(flash());

// Configure application routes
const routes = require('./controllers/router');
const router = express.Router();

// Add CSRF protection for web routes
// if (process.env.NODE_ENV !== 'test') {
//   app.use(csurf());
//   app.use(function(request, response, next) {
//     response.locals.csrftoken = request.csrfToken();
//     next();
//   });
// }

routes(router);
app.use(router);

// Handle 404
app.use(function(request, response, next) {
  response.status(404);
  response.sendFile(path.join(__dirname, 'public', '404.html'));
});

// Mount middleware to notify Twilio of errors
//  app.use(twilioNotifications.notifyOnError);

// Handle Errors
app.use(function(err, request, response, next) {
  console.error('An application error has occurred:');
  console.error(err.stack);
  response.status(500);
  response.sendFile(path.join(__dirname, 'public', '500.html'));
});

// Export Express app
module.exports = app;
