const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash')
// const expressHbs = require('express-handlebars');

const MONGODB_URI =
  'mongodb+srv://nodejs:zxcvbnmlp@cluster0-dnqwk.mongodb.net/shop';

const app = express();
// constructor
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const csrfProtection = csrf();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');

const User = require('./models/user');

// app.engine('hbs', expressHbs({extname: 'hbs', layoutsDir: 'views/layouts', defaultLayout: 'main-layout'}));
// app.set('view engine', 'hbs')
// app.set('view engine', 'pug');
// app.set('views', 'views')
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// session cookie
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
); // session middleware

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use('', errorController.errorPage);

// mongoConnect(() => {
//   app.listen(4000);
// });

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });
