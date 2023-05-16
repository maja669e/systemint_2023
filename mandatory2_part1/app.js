import express from "express";
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import session from 'express-session';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.get('/login', (req, res) => {
 
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

passport.use(new Auth0Strategy({
    domain: 'dev-fanu6ezuspfbskrx.us.auth0.com',
    clientID: 'Uk7gnLafNoVaAX71XUDRllkQHtxSlFsc',
    clientSecret: 'maiFn1Gztqf13uDkTpQ-CaX6C5B41G3Snh1J0oKOxlpyrLu7yRYmTNfmFD0JXciA',
    callbackURL: 'http://localhost:3000/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

app.get('/login/auth0', passport.authenticate('auth0', {
  scope: 'openid email profile',
  connection: 'Username-Password-Authentication',
}, function (req, res) {
  req.session.destroy(function (err) {
    res.redirect('/login');
  });
}));

app.get('/signup/auth0', passport.authenticate('auth0', {
  scope: 'openid email profile',
  connection: 'Username-Password-Authentication',
}, function (req, res) {
  req.session.destroy(function (err) {
    res.redirect('/signup');
  });
}));

app.get('/callback', passport.authenticate('auth0', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}));

app.get('/dashboard', isAuthenticated, (req, res) => {
  const { email, name, picture } = req.user._json;

  if (!email) {
    return res.status(400).send('Email not found in user data');
  }

  res.render('dashboard', { email, name, picture });
});

app.get('/logout', function(req, res){
    req.logout(); // provide a callback function if you need to perform an action after logout
    req.session.destroy(function (err) {
      res.redirect('/login');
    });
  });
app.listen(PORT, () => console.log("Server is now running on port", PORT));
