const mongoose = require("mongoose");
const Joi = require("joi");

mongoose.connect("mongodb://localhost/userDB")
    .then(()=> console.log("connected to mongodb..."))
    .catch(err=> console.log("Error:", err));

const userSchema = new mongoose.Schema({
email: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true
},      
password: {
    type: String,
    minlength: 5,
    required: true
},
phone: {
    type: Number,
    required: true
}    
});

const User = mongoose.model("User", userSchema);

function validateUser(user){
    const schema = Joi.object({
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).required(),
        phone: Joi.number().required()
    });
    return validation = schema.validate(user);
};

module.exports.User = User;
exports.validateUser = validateUser;