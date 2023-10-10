const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use('/', require('./router'));

app.listen(5000, ()=>{
    console.log('SERVER corriendo en el puerto 5000');
});