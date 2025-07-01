const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoute');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoute');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
 
app.use('/api/', bookingRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send("BookMyTurf API is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}/`);
})
