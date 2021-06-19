const nodemailer = require('nodemailer');
const config= require('../config/config');
const log = console.log;

module.exports= (to,sub,body)=>{
    if(to==null){
        console.log('mailid is ',to);
        return;
    }


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.MAIL_ID,
            pass: config.PASSWORD
        }
    });


    let mailOptions = {
        from: config.MAIL_ID, 
        to: to,
        subject: sub,
        text: body
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return log('Error occurs At MAIL',err);
        }
        return log('Email sent!!!');
    });
}
