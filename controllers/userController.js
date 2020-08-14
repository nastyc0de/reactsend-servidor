const User = require('../models/User');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

exports.newUser = async(req, res) => {
    // mostrar los mensajes de validacion
    const errores = validationResult(req);
    if (!errores.isEmpty) {
        return res.status(400).json({errores: errores.array()});
    }
    const {email, password} = req.body;
    
    let user = await User.findOne({email});
    
    if (user) {
        return res.status(400).json({msg: 'El usuario ya esta registrado'});
    }
    // crear un nuevo usuario
    user = new User(req.body);
    
    // encriptar el password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);    

    try {
        await user.save();
        res.json({msg: 'Usuario creado correctamente'});
    } catch (error) {
        console.log(error);
    }
}