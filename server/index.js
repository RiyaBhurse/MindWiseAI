const express = require('express');
var cors = require('cors');

require('dotenv').config();

const dbConfig = require('./config/db');

const app = express();

const userRoutes = require('./routes/userRoutes');

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));

app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
