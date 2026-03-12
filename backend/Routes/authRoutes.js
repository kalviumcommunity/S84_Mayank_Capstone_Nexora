const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../Models/User');

// Email/Password Signup
router.post('/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({
      displayName: name,
      name: name,
      email,
      password: hashedPassword,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
    });

    const payload = { user: { _id: user._id, displayName: user.displayName, name: user.name, email: user.email, avatar: user.avatar } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.status(201).json({ token, user: payload.user });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// Email/Password Login
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    if (!user.password) return res.status(400).json({ message: 'Please login with Google' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { user: { _id: user._id, displayName: user.displayName, name: user.name, email: user.email, avatar: user.avatar } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.json({ token, user: payload.user });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// Google Auth Routes
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    // Generate JWT
    const payload = {
      user: {
        _id: req.user._id,
        googleId: req.user.googleId,
        displayName: req.user.displayName,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
      }
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });

    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4000';
    res.redirect(`${frontendUrl}/login?token=${token}`);
  }
);

// Get Current User
router.get('/api/user', (req, res) => {
    console.log('GET /api/user called');
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
            if (err) {
                console.error('JWT Verification Error:', err.message);
                return res.sendStatus(403);
            }
            res.json(decoded.user);
        });
    } else {
        console.log('No Authorization header');
        res.sendStatus(401);
    }
});

module.exports = router;