const express = require('express');
const DBConnect = require('./config/db');

// crear el servidor
const app = express();

// conectar a la base de datos
DBConnect();
console.log('comenzando react send');
// Puerto de la app
const port = process.env.PORT || 4000;

// rutas de la app
app.use('/api/user', require('./routes/users'));

//  arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})