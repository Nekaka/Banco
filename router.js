const express = require('express');
const router = express.Router();

const conexion = require('./database/db');

router.get('/', (req, res)=>{
    res.render('index');
})

router.get('/login', (req, res)=>{
    res.render('login');
})

router.get('/index', (req, res)=>{
    res.render('index');
})

router.get('/registro', (req, res)=>{
    res.render('registro');
})

// router.get('/', (req, res)=>{
//     conexion.query('SELECT * FROM clientes', (error, results)=>{
//         if(error){
//             throw error;
//         }else{
//             res.send(results);
//         }
//     });
// });

const crud = require('./controllers/crud');

router.post('/validacionEmpleado', crud.validacionEmpleado);

module.exports = router;