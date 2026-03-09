const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nexora')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: { type: String, unique: true },
  password: String,
  avatar: String,
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(cors({ 
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:4000', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001', 'http://127.0.0.1:4000'], 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
})); 
app.use(express.json());
app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || 'mock-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock-client-secret',
      callbackURL: 'http://localhost:8000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0]?.value,
            avatar: profile.photos?.[0]?.value,
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Email/Password Signup
app.post('/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({
      displayName: name,
      email,
      password: hashedPassword,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
    });

    const payload = { user: { _id: user._id, displayName: user.displayName, email: user.email, avatar: user.avatar } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.status(201).json({ token, user: payload.user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Email/Password Login
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    if (!user.password) return res.status(400).json({ message: 'Please login with Google' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { user: { _id: user._id, displayName: user.displayName, email: user.email, avatar: user.avatar } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.json({ token, user: payload.user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Routes
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    // Generate JWT
    const payload = {
      user: {
        _id: req.user._id,
        googleId: req.user.googleId,
        displayName: req.user.displayName,
        email: req.user.email,
        avatar: req.user.avatar
      }
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });

    // Redirect to frontend with token
    res.redirect(`http://localhost:4000/login?token=${token}`);
  }
);

app.get('/api/user', (req, res) => {
    console.log('GET /api/user called');
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log('Token received:', token.substring(0, 10) + '...');
        jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
            if (err) {
                console.error('JWT Verification Error:', err.message);
                return res.sendStatus(403);
            }
            console.log('User decoded:', decoded.user);
            res.json(decoded.user);
        });
    } else {
        console.log('No Authorization header');
        res.sendStatus(401);
    }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
