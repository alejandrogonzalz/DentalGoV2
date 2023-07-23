import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../users/User';
import bcrypt from 'bcrypt';
import session from 'express-session';
import { ExtendedUser } from '../../types';

export const sessionConfig = session({
  secret: `${process.env.SECRET}`,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1 hour
  },
});

// LocalStrategy constructor takes a verify function as an argument
const strategy = new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, onDone) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return onDone(null, false, { message: 'Email not found' }); // false means the authentication failed: email is not valid
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) throw error;
        if (result === true) {
          return onDone(null, user); // a user to which the credential belongs, and are valid, it calls the callback with the authenticating user
        } else {
          return onDone(null, false, { message: 'Incorrect email or password' }); // false means the authentication failed password != user.password
        }
      });
    } catch (error) {
      return onDone(error);
    }
  },
);

passport.use(strategy);

passport.serializeUser((user, onDone) => {
  process.nextTick(() => {
    onDone(null, { ...user });
  });
});

passport.deserializeUser((user: any, onDone) => {
  process.nextTick(() => onDone(null, user));
});

export const protect = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};

export const router = Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
  const { userType, name, email, _id } = (req?.user as ExtendedUser) || {};
  res.json({ user: { userType, name, email, _id } });
});

router.delete('/logout', protect, (req, res) => {
  req.logout(() => {});
  res.json({ message: 'Logout succesfully' });
});

// borrar luego por cuestiones de seguridad
router.get('/who-am-i', protect, (req, res) => {
  res.json({ user: req.user });
});
