const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHbs = require('express-handlebars');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
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

app.use((req, res, next) => {
  User.findById('5e35e33c68e04c049872c8de')
    .then(user => {
      req.user = user; // calling the full mongoose model here
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('', errorController.errorPage);

// mongoConnect(() => {
//   app.listen(4000);
// });

mongoose
  .connect(
    'mongodb+srv://nodejs:zxcvbnmlp@cluster0-dnqwk.mongodb.net/shop?retryWrites=true&w=majority'
  )
  .then(result => { 
    User.findOne().then(user => {
      // checking if there's an existing user
      if (!user) {
        const user = new User({
          name: 'David',
          email: 'david@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });

    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });
