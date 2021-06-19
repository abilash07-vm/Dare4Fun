var {QuestionSchema}=require('../Models/QuestionSchema');
var mongoose=require('mongoose');

var Question=mongoose.model('Question',QuestionSchema);

const addQuestion=(req,res)=>{
    let newquestion=new Question(req.body);
    newquestion.save()
        .then((question)=>{
            res.json(question);
        }).catch((err)=>{
            res.send(err);
        })
};

const getAllDefaultQuestions=(req,res)=>{
    let id=req.params.id;
    Question.find({
        $or:[{
                type: 'default'
            },{
                userid: id
            }
        ]
         },(err,questions)=>{
        if(!err){
            console.log(questions);
            res.send(questions);
        }
    });
}
const getQuestionById=(id)=>{
    return Question.findOne({questionid:id},question=>{
        return question
    });
}


module.exports={
    addQuestion,
    getAllDefaultQuestions,
    getQuestionById
}