const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();

app.use(cors());
app.use(routes);

app.listen(3333, () => {
    console.log('Servidor iniciado na porta 3333: http://localhost:3333/')
});