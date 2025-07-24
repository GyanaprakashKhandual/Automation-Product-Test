const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
  const { email, password } = req.body;

  // ✅ Hardcoded valid credentials
  const validEmail = 'metroniq@aviduinteractive.com';
  const validPassword = 'metroniq@123';

  // ❌ Invalid credentials
  if (email !== validEmail || password !== validPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  try {
    // ✅ Create JWT token
    const token = jwt.sign(
      { email }, // payload
      process.env.JWT_SECRET, // secret key from .env
      { expiresIn: '30d' } // 30 days expiry
    );

    // ✅ Set token as secure cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { email },
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login };
