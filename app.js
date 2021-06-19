const express=require('express');
const config=require('./config/config')
const cors=require('cors');
const router=require('./routers/mainrouer')
const path=require('path')
const mongoose=require('mongoose')

const app=express();
app.use(cors());


app.use(express.static(path.join(__dirname,'public')))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const PORT=process.env.PORT || 8080;
const mongodbUrl=config.MONGO_DB_URL;
router(app,{});


// conect To mongodb
mongoose.Promise=Promise
mongoose.connect(mongodbUrl,{ useNewUrlParser: true, useUnifiedTopology:true })
    .then(()=>{
        console.log('Connected to mongodb Sucessfully!');
    }).catch(err=>{
        console.log('Error at mongodb :',err);
    });


app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
})

app.listen(PORT,()=>{
    console.log(`Server Running At ${PORT}`);
})