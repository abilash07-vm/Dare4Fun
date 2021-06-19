const { getUserByid , addUser }=require('../Controllers/UserController')


module.exports=(app,params)=>{
    app.route('/addUser')
        .post(addUser)
    app.route('/getUser/:id')
        .get(async(req,res)=>{
            let user=await getUserByid(req.params.id);
            res.send(user)
        })
}