exports.errorPage = (req, res, next) => {
    res.status(404).render('error', { pageTitle: 'Error 404', path: '',
    isAuthenticated: req.isLoggedIn });
  };


exports.errorPage500 = (req, res, next) => {
    res.status(404).render('500', { pageTitle: 'Error 500', path: '/500',
    isAuthenticated: req.isLoggedIn });
  };