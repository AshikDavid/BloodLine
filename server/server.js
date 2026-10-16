const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const requestRoutes = require('./routes/requestRoutes');
const donationRoutes = require('./routes/donationRoutes');
const adminRoutes = require('./routes/adminRoutes');


connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors();
app.use(express.json());
app.use(require('morgan')('dev'))

app.get('/', (req, res) => {
  res.json({
    app: 'LifeLink API',
    version: 'v1'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    data: null
  });
});
module.exports = app;
if(process.env.development != 'Production'){
app.listen(PORT, () => {
  console.log(`LifeLink API running on port ${PORT}`);
})
}
