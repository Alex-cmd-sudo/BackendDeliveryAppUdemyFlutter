const { json } = require('express');
const User = require('../models/user');

module.exports = {
    register(req, res){
        
        const user = req.body; // captura datos de la peticion
        
        User.create(user, (err, data) => {

            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Ocurrio un error con el registro del usuario',
                    error: err
                });
            }
            else{
                return res.status(201),json({
                    success: true,
                    message: 'Registro realizado correctamente',
                    data: data
                });
            }

        });
    }
}