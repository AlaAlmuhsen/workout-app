const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema

const userScema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
} , {timestamps : true})


// static signup method
userScema.statics.signup = async function(email, password){
    
    // validation 
    if (!email || !password) {
        throw Error('All felids must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('email is not valid ')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('password  not strong enough ')
    }

    const exists = await this.findOne({ email})

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    const user = await this.create({email, password: hash});

    return user;

}

// static login method
userScema.statics.login = async function(email, password){
    if (!email || !password) {
        throw Error('All felids must be filled')
    }

    const user = await this.findOne({email})

    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User' , userScema);