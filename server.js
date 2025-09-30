const express = require('express');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(express.json());

// Routes
app.use('/bookings', bookingRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
