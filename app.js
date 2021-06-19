const express=require('express');
const cors=require('cors');
const router=require('./routers/mainrouer')

const mongoose=require('mongoose')

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const PORT=process.env.PORT || 8080;
const mongodbUrl="mongodb+srv://abilashvm07:Biceps^17@cluster-1.stf1z.mongodb.net/Dare4Fun?retryWrites=true&w=majority"

router(app,{});


// conect To mongodb
mongoose.Promise=Promise
mongoose.connect(mongodbUrl,{ useNewUrlParser: true, useUnifiedTopology:true })
    .then(()=>{
        console.log('Connected to mongodb Sucessfully!');
    }).catch(err=>{
        console.log('Error at mongodb :',err);
    });


app.listen(PORT,()=>{
    console.log(`Server Running At ${PORT}`);
})