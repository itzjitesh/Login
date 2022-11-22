const {User} = require("../db/validate");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async(req, res)=>{

    const email= req.body.email;
    const password= req.body.password;

    User.findOne({email: email}, (err, foundUser)=>{
        if(err){
            console.log(err);
        }
        else{
            if(foundUser){                
                bcrypt.compare(password, foundUser.password, function(err, result) {
                    if (result === true){
                        res.send("You are logged in");
                    }
                    else{
                        console.log(err);
                    }
                });                
            }
        }
    });
});

module.exports = router;