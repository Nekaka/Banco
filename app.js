const express = require('express');
const app = express();
const { json } = require('express');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.urlencoded({extended:false}));
app.use(express(json));

app.use('/', require('./router'));

app.listen(5000, ()=>{
    console.log('SERVER corriendo en el puerto 5000');
});