require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const applicantsRouter = require('./routes/applicants');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/applicants', applicantsRouter);
app.get('/', (req, res) => res.send('FutureJoin API'));

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
}

start();