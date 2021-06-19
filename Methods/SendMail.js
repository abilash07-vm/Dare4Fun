// const sgMail = require('@sendgrid/mail')


const nodemailer = require('nodemailer');
const log = console.log;

module.exports= (to,sub,body)=>{
    // const SENDGRID_API_KEY='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';
    // sgMail.setApiKey(SENDGRID_API_KEY);
    // const msg = {
    //     to: 'abil17ec004@rmkcet.ac.in', // Change to your recipient
    //     from: 'abilashvm07@gmail.com', // Change to your verified sender
    //     subject: 'Sending Email using Node.js',
    //     text: 'Thank you for being member in abi.org',
    //     html: '<strong>Thank you for being member in abi.org</strong>',
    // }
    // sgMail.send(msg)
    //     .then(() => {
    //         console.log('Email sent')
    //     })
    //     .catch((error) => {
    //         console.error(error)
    //     })

    if(to==null){
        console.log('mailid is ',to);
        return;
    }


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dare4fun123@gmail.com',
            pass: 'Biceps^17'
        }
    });


    let mailOptions = {
        from: 'dare4fun123@gmail.com', 
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
