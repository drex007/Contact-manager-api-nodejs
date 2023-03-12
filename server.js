const express = require('express');
const dotenv = require('dotenv').config()

const app = express();

let port;

if (process.env.DEBUG == 1) {
    port = process.env.DEV_PORT;
} else {
    port = process.env.LIVE_PORT
}

app.get('/api/contacts', (req, res) => {
    return res.send({ "message": "success" }) // or =>  res.json({"message": "messaga"})

})

app.listen(port, () => {
    console.log(`Server is running on  ${port}`);
})    