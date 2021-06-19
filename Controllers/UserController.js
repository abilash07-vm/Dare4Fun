const mongoose = require('mongoose')
const { userSchema }=require('../Models/UserSchema')

const User=mongoose.model('User',userSchema);

const getUserByid=(id)=>{
    return User.findOne({userid:id})
        .then((user)=>{
            return user;
        })
}

const addUser=(req,res)=>{
    let newUser=User(req.body);
    newUser.save()
        .then((user)=>{
            res.send(user);
        })
}

module.exports={
    getUserByid,
    addUser
}