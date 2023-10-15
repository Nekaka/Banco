const router = require('../router');
const { query } = require('../database/db');
const conexion = require('../database/db');

exports.validacionEmpleado = (req, res)=>{
    const correo = req.body.correo;
    const pass = req.body.password;

    if(correo && pass){
        conexion.query('SELECT * FROM empleado WHERE correo_electronico = ? AND pass = ? ', [correo, pass], (error, results)=>{
            if(error){
                throw error;
            }else{
                const id_acceso = results[0].id_acceso;
                if(results.length > 0 && id_acceso == 1){
                    //ENTRA A LA VISTA SUPER ADMIN
                    res.render('login',{
                        alert:true,
                        alertTitle: 'Conexion exitosa',
                        alertMessage: '¡Bienvenido Super Administrador! ',
                        alertIcon:'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'vistaSuperAdmin'
                    })
                }else if(results.length > 0 && id_acceso == 2){
                    //ENTRA A LA VISTA DE CLIENTE
                    res.render('login',{
                        alert:true,
                        alertTitle: 'Conexion exitosa',
                        alertMessage: '!Bienvenido Empleado!',
                        alertIcon:'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'vistaEmpleado'
                    })
                }else{
                    //NO ENTRA
                    res.render('login',{
                        alert:true,
                        alertTitle: 'Error',
                        alertMessage: 'Nombre o contraseña incorrectos!',
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    })
                }
            }
        })
    }
}

exports.validacionCliente = (req, res)=>{
    const correo = req.body.correo;
    const pass = req.body.password;

    if(correo && pass){
        conexion.query('SELECT * FROM cliente WHERE correo_electronico = ? AND pass = ? ', [correo, pass], (error, results)=>{
            if(error){
                throw error;
            }else{
                if(results.length > 0){
                    //ENTRA
                    res.render('login',{
                        alert:true,
                        alertTitle: 'Conexion exitosa',
                        alertMessage: '¡Bienvenido! ',
                        alertIcon:'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'registro'
                    })
                }else{
                    //NO ENTRA
                    res.render('login',{
                        alert:true,
                        alertTitle: 'Error',
                        alertMessage: 'Nombre o contraseña incorrectos!',
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    })
                }
            }
        })
    }
}