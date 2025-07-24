require('dotenv').config();  
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.route');
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();



const allowedOrigins = [
  'http://localhost:3000',
  'https://metroniq.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true // Optional: only needed if you're using cookies or sessions
}));
             
app.use(express.json());      


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy ' });
});


app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
