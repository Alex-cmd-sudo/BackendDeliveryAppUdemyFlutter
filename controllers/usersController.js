const { json } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');

module.exports = {

    login(req, res){

        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, myUser) => {

            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Ocurrio un error con la consulta de usuario',
                    error: err
                });
            }
            if(!myUser){
                return res.status(401).json({
                    success: false,
                    message: 'El email no fue encontrado',
                    error: err
                });
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password);
            
            if(isPasswordValid){
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});

                const data = {
                    id: `${myUser.id}`,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    telephone: myUser.telephone,
                    image: myUser.image,
                    session_token: `JWT ${token}`
                };

                return res.status(200).json({
                    success: true,
                    message: 'El ususario fue autenticado',
                    data: data
                });
            }
            else{
                return res.status(401).json({
                    success: false,
                    message: 'La contraseña es incorrecta',                    
                });
            }

        });

    },
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
                return res.status(201).json({
                    success: true,
                    message: 'Registro realizado correctamente',
                    data: data
                });
            }

        });
    },
    async registerWithImage(req, res){
        
        const user = JSON.parse(req.body.user); // captura datos de la peticion

        const files = req.files;

        if(files.length > 0){
            const path = `image_${Date.now}`;
            const url = await storage(files[0], path);

            if(url != undefined && url != null){
                user.image = url;
            }
        }
        
        User.create(user, (err, data) => {

            if(err){
                return res.status(501).json({
                    success: false,
                    message: 'Ocurrio un error con el registro del usuario',
                    error: err
                });
            }

            const token = jwt.sign({id: user.id, email: user.email}, keys.secretOrKey, {});
            user.session_token = `JWT${token}`;

            user.id = `${data}`;

            return res.status(200).json({
                success: true,
                message: 'Registro realizado correctamente',
                data: user
            });
        });
    }
}