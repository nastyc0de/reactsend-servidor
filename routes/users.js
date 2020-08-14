const express = require('express');
const userController= require('../controllers/userController');
const router = express.Router();
const {check} = require('express-validator');

router.post('/',
    [
        check('name','El nombre es obligatorio').not().isEmpty()
    ],
    userController.newUser
);
module.exports = router;
// router.get('/')
