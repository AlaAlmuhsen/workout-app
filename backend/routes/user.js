const express = require('express');
const {
    loginUser,
    singupUser
} = require('../controllers/userController');


const router = express.Router();

// login route
router.post('/login' , loginUser);


// singup route
router.post('/singup' , singupUser);



module.exports = router;