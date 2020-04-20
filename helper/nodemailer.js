const nodemailer = require('nodemailer');
const util = require('util');

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'aldrich.neil.hung@gmail.com',
        pass : 'vrjofuvespxozjmp'
    },
    tls : {
        rejectUnauthorized : false
    }
});

const transportAwait = util.promisify(transporter.sendMail).bind(transporter);

module.exports = {
    transporter,
    transportAwait
};