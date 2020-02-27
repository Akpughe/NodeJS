const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
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

const fileStorage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  },
})

const  fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ){

    cb(null, true);
  }else{

    cb(null, false);
  }

}

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
app.use(multer({storage: fileStorage, fileFilter:fileFilter }).single('image'))
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
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if(!user){
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
});



app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.errorPage500)

app.use('', errorController.errorPage);

//error handling middleware
app.use((error, req, res, next) => {
  // res.redirect('/500')
  res
    .status(404)
    .render('500', {
      pageTitle: 'Error 500',
      path: '/500',
      isAuthenticated: req.isLoggedIn
    });
})
//--------------//

// mongoConnect(() => {
//   app.listen(4000);
// });

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    console.log("listening on port 4000")
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });
