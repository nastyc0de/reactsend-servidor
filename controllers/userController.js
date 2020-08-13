const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.newUser = async(req, res) => {
    
    //  verificar si el usuario ya estuvo registrado
    const {email, password} = req.body;

    let user = await User.findOne({email});
    
    if(user){
        return res.status(400).json({msg:'El usuario ya esta registrado'});
    }
    // creando un nuevo usuario
    user = await new User(req.body);

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