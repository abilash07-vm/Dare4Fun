var mongoose=require('mongoose');

const FeedbackSchema=mongoose.Schema({
    name:{
        type: String
    },
    feedback:{
        type: String
    }
})

module.exports={
    FeedbackSchema
}