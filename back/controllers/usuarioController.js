var Usuario = require('../models/usuario');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const registro_usuario_admin = async function (req, res) {
    if(req.user){   
         
        let data = req.body;
        let usuarios = await Usuario.find({email: data.email})

        if (usuarios.length >= 1) {
            res.status(200).send({ data:undefined,message:'Correo electronico ya existe'})

        } else
            bcrypt.hash('123456', null, null, async function (err, hash) {
                if (err) {
                    res.status(200).send({ data: undefined, message: 'No se puedo encriptar la contraseña' });
                } else {
                    data.password = hash;
                    let usuario = await Usuario.create(data);
                    res.status(200).send({ data: usuario});
                }
            });
               
    }else{
        res.status(500).send({ data:undefined,message:'Error de tOken'}) 
    }
    
}

const login_usuario = async function (req,res) {
    var data = req.body;
    var usuarios = await Usuario.find({email:data.email});

    if (usuarios.length >= 1) {
        //si existe el correo
        bcrypt.compare(data.password, usuarios[0].password, async function (err, check) {

            if (check) {
                res.status(200).send({
                     token:jwt.createToken(usuarios[0]),
                     usuario: usuarios[0]
                    });
    
            } else {
                res.status(200).send({ data: undefined, message: 'Contraseña incorrecta' });
            }

        });
    } else {
        res.status(200).send({ data: undefined, message: 'Correo no Existe' });
    }
}

module.exports = {
    registro_usuario_admin,
    login_usuario
}