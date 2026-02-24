const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const passport = require('passport');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(passport.initialize());


//  routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/webhooks', require('./routes/webhookRoutes'));

// Error handler 
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('LMS Backend API running...');
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// const express = require('express');
// // const cors = require('cors');
// const sequelize = require('./config/db');
// const routes = require('./routes');
// const errorHandler = require('./middleware/errorHandler');

// const app = express();
// // app.use(cors());
// app.use(express.json());

// app.use('/api', routes);
// app.use(errorHandler);

// app.get('/', (req, res) => {
//   res.send('LMS Backend API running...');
// });


// const PORT = process.env.PORT || 5000;

// sequelize.sync({ alter: true }).then(() => {
//   console.log('Database synced');
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//});