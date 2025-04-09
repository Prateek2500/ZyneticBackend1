const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./DB/db');

const app = express();
dotenv.config();
connectDB();

const userRoute = require('./Routes/userRoute');
const bookRoute = require('./Routes/bookRoute');

// middleware
app.use(helmet());
app.use(cors()); 
app.use(express.json()); 

//routes
app.use('/api/users', userRoute);
app.use('/api/books', bookRoute);

app.get('/', (req, res) => {
  res.send('API is running...');
});

//error
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});