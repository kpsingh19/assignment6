const passport = require("passport");
const passportJWT = require("passport-jwt");
const dotenv = require("dotenv");
const userService = require("./user-service");

dotenv.config();

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const strategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(strategyOptions, (jwt_payload, done) => {
  userService.findUserById(jwt_payload._id)
    .then(user => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch(err => done(err, false));
}));

module.exports = passport;
