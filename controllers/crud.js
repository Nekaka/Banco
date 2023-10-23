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

exports.crearCliente = (req, res)=>{
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;
    const correo = req.body.correo;
    const pass = req.body.password;

    conexion.query('INSERT INTO cliente SET ?', {nombre:nombre, apellido:apellido, direccion:direccion, telefono:telefono, correo_electronico:correo, pass:pass, id_acceso: 3}, (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('registro',{
                alert:true,
                alertTitle: 'Cliente registrado',
                alertMessage: '!Se ha registrado un nuevo cliente!',
                alertIcon:'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'vistaSuperAdmin'
            })
        }
    })
}

exports.updateCliente = (req, res)=>{
    const id_cliente = req.body.id_cliente;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;
    const correo = req.body.correo;
    const pass = req.body.password;
    const id_acceso= req.body.id_acceso;

    conexion.query('UPDATE cliente SET ? WHERE id_cliente = ?', [{id_cliente:id_cliente, nombre:nombre, apellido:apellido, direccion:direccion, telefono:telefono, correo_electronico:correo, pass:pass, id_acceso:id_acceso}, id_cliente], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('editarCliente', {
                client:results[0],
                alert:true,
                alertTitle: 'Cliente editado',
                alertMessage: '!Se ha editado el cliente!',
                alertIcon:'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'vistaSuperAdmin'
            })
        }
    })
}