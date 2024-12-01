const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

let SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

let apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
let emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();

function replaceContent(content, creds){
    let allKeysArr = Object.keys(creds);
    allKeysArr.forEach(function(key) {
        content = content.replace(`#{${key}}`, creds[key]);
    })
    return content;
}

async function EmailHelper(templateName, recieverMail, creds){
    try{
        const templatePath = path.join(__dirname, "email_templates", templateName);
        let content = fs.promises.readFile(templatePath, 'utf8');
        const emailDetails = {
            to: recieverMail,
            from: process.env.EMAIL,
            subject: "Reset Password OTP",
            text: `Hi, ${creds.name} this is your reset otp ${creds.otp}`,
            html: replaceContent(content, creds)
        };

        const transporterDetails = {
            host: "smtp-relay.brevo.com",
            port: 587,
            auth: {
                user: 'apikey',
                pass: process.env.BREVO_SMTP_PASSWORD
            }
        }

        const transporter = nodemailer.createTransport(transporterDetails);
        await transporter.sendMail(emailDetails);
        console.log("Email sent");
    }
    catch(error){
        console.log(error);
    }
}

module.exports = EmailHelper;