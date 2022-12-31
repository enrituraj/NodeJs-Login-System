module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/dashboard');      
    },
    authRole: function authrole(role){
      return (req, res,next) =>{
        if(req.user.role !== role){
          console.log(req.user.role);
          res.redirect('dashboard');
        }
        next();
      }
    }
};
  