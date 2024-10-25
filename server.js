const express =  require('express');
const dotenv = require( 'dotenv' );
const cors = require('cors');
const connectDB = require( './config/db.js');
const auth = require( './routes/auth.js');
const cropRoutes = require('./routes/Info.js');
dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json({ extended: false }));
app.use(cors());
// Routes
app.use('/api/auth', auth);
app.use('api/info/crops',cropRoutes);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
