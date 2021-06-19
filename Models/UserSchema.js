const mongoose=require('mongoose');

const schema=mongoose.Schema

const userSchema=new schema({
    userid:{
        type: String
    },
    useremailid:{
        type:String
    },
    username:{
        type:String
    }
})

module.exports={
    userSchema
}