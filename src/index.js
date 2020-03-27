const express = require('express');
const cors = require('cors');
const routes = require('./routes')
const app = express();

app.use(cors()); //configure who can access the app from the front-end
app.use(express.json()); //Using req body as json
app.use(routes); //will use the routes.js

app.listen(3333, (req, res) => {
    console.log('Server Running...')
});   