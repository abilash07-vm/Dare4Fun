var {addQuestion, getQuestionById, getAllDefaultQuestions}=require('../Controllers/QuestionController')

module.exports=(app,params)=>{
    app.route('/newQuestion')
        .post(addQuestion)
    app.route('/getQuestion/:id')
        .get(async(req,res)=>{
            let id=req.params.id;
            res.send(await getQuestionById(id));
        })
    app.route('/getAllQuestions/:id')
        .get(getAllDefaultQuestions)
}