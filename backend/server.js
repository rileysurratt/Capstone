const express = require('express');
const app = express();
// uses this port from heroku (i think we're using render?) otherwise hosted on port: 8080 (can change)
const PORT = process.env.PORT || 3000; //port number that vite runs on, change later
require('dotenv').config();

const productRoutes = require('./routes/API/products');

const userRoutes = require('./routes/API/users');
const authRoutes = require('./routes/API/auth');
const category = require('./routes/API/category')
app.use(express.json());

app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', category);


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})

module.exports = app;


