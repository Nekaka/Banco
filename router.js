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

router.get('/vistaSuperAdmin', (req, res)=>{
    res.render('vistaSuperAdmin');
})

router.get('/vistaCliente', (req, res)=>{
    res.render('vistaCliente');
})

router.get('/vistaEmpleado', (req, res)=>{
    res.render('vistaEmpleado');
})

router.get('/loginEmpleado', (req, res)=>{
    res.render('loginEmpleado');
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
router.post('/validacionCliente', crud.validacionCliente);

module.exports = router;