const express = require('express');
const router = express.Router();

const conexion = require('./database/db');

router.get('/', (req, res)=>{
    res.render('index');
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


module.exports = router;