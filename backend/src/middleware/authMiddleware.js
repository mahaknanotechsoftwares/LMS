const jwt = require('jsonwebtoken');
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

const authenticate = passport.authenticate('jwt', { session: false });

// Role-based middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
    next();
  };
};
// Ensure user is authenticated
const protect = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authorized" });
  }
  next();
};

// Ensure user is instructor
const instructorOnly = (req, res, next) => {
  if (req.user.role !== "instructor") {
    return res.status(403).json({ error: "Access denied: Instructor only" });
  }
  next();
};

//Ensure user is admin
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied: Admin only" });
  }
  next();
};

module.exports = { authenticate, authorize, protect, instructorOnly, adminOnly };