var QuestionRoute =require('./QuestionRoute');
var UserRoute=require('./userRoute');
var EventRoute=require('./eventRouter');
var generateKey=require('../Methods/GenerateKey');
const { getAllFeedbacks, addFeedback } = require('../Controllers/FeedbackController');
module.exports=(app,params)=>{
    app.route('')
        .get((req,res)=>{
            res.sendStatus(200);
        })  

    app.route('/randomid')
        .get((req,res)=>{
            let id=generateKey();
            res.send({id})
        })
    app.route('/feedbacks')
        .get(getAllFeedbacks)
        .post(addFeedback)
    QuestionRoute(app,params);
    UserRoute(app,params);
    EventRoute(app,params);
}