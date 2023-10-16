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
    conexion.query('SELECT * FROM cliente', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('vistaSuperAdmin', {results:results});
        }
    })
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

router.get('/infoRegistro', (req, res)=>{
    res.render('infoRegistro');
})

router.get('/editarCliente/:id_cliente', (req, res)=>{
    const id_cliente = req.params.id_cliente;
    conexion.query('SELECT * FROM cliente WHERE id_cliente = ?', [id_cliente], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('editarCliente', {client:results[0]});
        }
    })
})

router.get('/eliminarCliente/:id_cliente', (req, res)=>{
    const id_cliente = req.params.id_cliente;
    conexion.query('DELETE FROM cliente WHERE id_cliente = ?', [id_cliente], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/vistaSuperAdmin');
        }
    })

})

const crud = require('./controllers/crud');

router.post('/validacionEmpleado', crud.validacionEmpleado);
router.post('/validacionCliente', crud.validacionCliente);
router.post('/crearCliente', crud.crearCliente);
router.post('/updateCliente', crud.updateCliente);

module.exports = router;