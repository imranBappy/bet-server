const nodemailer = require('nodemailer');

const emailSender = (email, text)=>{

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'b24winbet@gmail.com',
          pass: 'Kdf48aa10102*7^8J9j*0K'
        }
      });

    const mailOption = {
        from:'b24winbet@gmail.com',
        to:email,
        subject:'B24win.com',
        text: text
    }
    transporter.sendMail(mailOption,(error, info)=>{
      return {error, info}
    })
}

module.exports = emailSender