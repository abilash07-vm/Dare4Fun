const mongoose = require('mongoose');
var { EventSchema }=require('../Models/EventSchema');
var {getUserByid}=require('./UserController');
const sendMail=require('../Methods/SendMail')

const Event=mongoose.model('QuestionEvent',EventSchema);

const createEvent=(req,res)=>{
    let url=`${req.body.url}`;
    url=`${url}/result/${req.body.eventid}/${req.body.userid}`
    let newEvent=new Event(req.body);
    newEvent.save().then(async(event)=>{
        let user=await getUserByid(req.body.userid);
        sendMail(user.useremailid,"Created Quiz",`For tracking your friends score visit ${url}`);
        res.json(event);
    })
}

const getEventById=(req,res)=>{
    let id=req.params.id;
    Event.findOne({eventid:id})
        .then((eventdetails)=>{
            res.json(eventdetails);
        })
}
const getEmailidfromEventid=(id)=>{
    return Event.findOne({eventid:id})
        .then(async(eventdetails)=>{
            let userid=eventdetails.userid;
            let user= await getUserByid(userid)
            return user.useremailid
        })
}
const addFriendsperformance=(req,res)=>{
    let id=req.params.id;
    Event.updateOne({eventid:id},{
        $push:{
            friendsperformance:{
                $each: [req.body],
            }
        }
    }).then(async(temp)=>{
        let data=req.body
        let name=data.name,score=data.score;
        let emailid=await getEmailidfromEventid(id);
        sendMail(emailid,'New Answer Recieved',`Your friend ${name} has scored ${score}% in Just4Fun\n Check it out`)
        res.send({});
    })
}

module.exports={
    createEvent,
    getEventById,
    addFriendsperformance
}