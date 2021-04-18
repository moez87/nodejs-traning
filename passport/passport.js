const passport = require('passport');

const User = require('../models/userSchema')

passport.use(new BearerStrategy(
    (token, done)=> {
      User.findOne({ token: token }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    }
  ));

  module.exports = router;