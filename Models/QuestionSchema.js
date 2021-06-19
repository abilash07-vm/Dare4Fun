var mongoose=require('mongoose');

const schema=mongoose.Schema

const QuestionSchema=new schema({
    questionid:{
        type:String
    },question:{
        type: String
    },
    numberofanswer: {
        type: Number
    },
    options:{
        type: [String]
    },
    type:{
        type: String
    },
    optiontype:{
        type:String
    },
    userid:{
        type:String
    }
});

module.exports={
    QuestionSchema
}