const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');


const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

const mongoConnect = require('./util/database').mongoConnect;

// app.engine('hbs', expressHbs({extname: 'hbs', layoutsDir: 'views/layouts', defaultLayout: 'main-layout'}));
// app.set('view engine', 'hbs')
// app.set('view engine', 'pug');
// app.set('views', 'views')
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then(user => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch(err => console.log(err));
  next(0);
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('', errorController.errorPage);

mongoConnect(() => { 
  app.listen(4000)
})

