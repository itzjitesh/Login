const {User, validateUser} = require("../db/validate");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/", async(req, res)=>{
    const {error} = validateUser(req.body);
    if (error) res.status(404).send(error);

    bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
        if (err) res.status(404).send(err);
        
        const user = new User({
            email: req.body.email,
            password: hash,
            phone: req.body.phone
        });
    
        const result = await user.save();
        res.send(result);
    });
});

module.exports = router;