var mongoose=require('mongoose');
var {FeedbackSchema} =require('../Models/FeedbackSchema');

const Feedback=mongoose.model('feedbacks',FeedbackSchema);

const getAllFeedbacks=(req,res)=>{
    Feedback.find({})
        .then((data)=>{
            res.send(data);
        })
}

const addFeedback=(req,res)=>{
    let newfeedabck=new Feedback(req.body);
    newfeedabck.save()
        .then((data)=>{
            res.send({});
        })
}
module.exports={
    getAllFeedbacks,
    addFeedback
}