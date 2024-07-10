const express = require('express');
const app = express();
// uses this port from heroku (i think we're using render?) otherwise hosted on port: 8080 (can change)
const PORT = process.env.PORT || 5173; //port number that vite runs on, change later
require('dotenv').config();
app.use(express.json());
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})


// routes

