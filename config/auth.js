module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Molimo prijavite se da vidite tu stranicu.');
    res.redirect('/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');      
  },
  isLoggedIn: function(req, res) {
    if (req.isAuthenticated()) {
      return true;
    }
    return false;
  }
};
