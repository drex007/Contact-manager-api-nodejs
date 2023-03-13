const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config()

const app = express();

let port;

if (process.env.DEBUG == 1) {
    port = process.env.DEV_PORT;
} else {
    port = process.env.LIVE_PORT
}

app.use(express.json()) //For accessing json body 
app.use('/api/contact', require('./routes/contactRoutes')); // This router was defined for our contactRoutes

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on  ${port}`);
})    