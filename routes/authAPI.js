const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
//require user schema 

const User = require('../models/userSchema');


//login
router.post('/login', async (req, res) => {
    const userFound = await User.findOne({ email: req.body.email })

    if(userFound == null) {
        res.json({ message: 'Please verify your email or password!' });
    }
    else{

      const passwordEqual = await bcrypt.compare(req.body.password,userFound.password);
     if(passwordEqual)
     {
        res.json({ message: 'Login successfuly' });
     }
     else{
        res.json({ message: 'Please verify your email or password!' });
     }
    }
    
});

//register

router.post('/register', async (req, res) => {
    const userFound = await User.findOne({ email: req.body.email })
    if (userFound == null) {
        //To hash a password
        bcrypt.hash(req.body.password, 10, async (error, hash) => {
            if (error) {
                res.status(500).json({ message: 'server error!' });
            }
            // store hash in your password DB.
            req.body.password = hash;
            await User.create(req.body);
            res.json({ message: 'register successfuly!' });
        });
    } else {
        res.status(400).json({ message: 'E-mail exist!' });
    }

});

module.exports = router;