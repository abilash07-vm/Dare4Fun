var { createEvent,getEventById, addFriendsperformance}=require('../Controllers/EventController')
module.exports=(app,params)=>{
    app.route('/createevent')
        .post(createEvent)
    app.route('/getevent/:id')
        .get(getEventById)
    app.route('/addfriendsperformance/:id')
        .post(addFriendsperformance)
}