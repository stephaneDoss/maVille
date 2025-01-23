const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'stephmoro23@gmail.com',
        pass: 'coef lgbg ysbs szii' 
    }
});

module.exports = transporter;