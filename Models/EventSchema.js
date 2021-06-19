var mongoose=require('mongoose');

const schema=mongoose.Schema

const EventSchema=new schema({
    eventid:{
        type:String
    },
    name:{
        type:String
    },
    userid:{
        type:String
    },
    date:{
        type:String
    },
    questionschoosen:[{
        questionid: {
            type:String
        },
        correctoption: {
            type: Number
        }
    }],
    numberofquestion:{
        type:Number
    },
    friendsperformance:[{
        userid: {
            type:String
        },
        name: {
            type:String
        },
        score: {
            type:Number
        }
    }]
})

module.exports={
    EventSchema
}