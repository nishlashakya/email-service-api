var express = require('express');
var router = express.Router();
var MailService = require('email-service')
const mailgun = require("mailgun-js");

const sgMail = require('@sendgrid/mail');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('API is working properly');
});

// router.post('/', function(req, res, next) {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//   const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_API_URL });

//   // console.log('req,,,,,,,', mg.messages().send())
//   const msg = {
//     to: req.body.to,
//     from: 'nishlashakya@wlit.org.np', // Use the email address or domain you verified above
//     subject: req.body.subject,
//     text: req.body.message,
//   };
//   (async () => {
//     try {
//       // await sgMail.send(msg);
//       mg.messages().send(msg, function (error, body) {
//         console.log('error........', error)
//         console.log(body);
//       });
//       res.send({message: 'Email sent'})
//     } catch (error) {
//       console.error(error);
//       console.log('here...........')
//       if (error.response) {
//         console.error(error.response.body)
//       }
//     }
//   })();
// });


router.post('/', function(req, res, next) {
  let sendService = new MailService({
    services: {
      mailgun: {
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_API_DOMAIN,
      },
      sendgrid: {
        apiKey: process.env.SENDGRID_API_KEY
      },
      mandrill: {
        apiKey: ''
      },
      servicesFailoverOrder: [
        'mailgun',
        'sendgrid',
        'mandrill'
      ]
    }
  });
  const data = {
    to: req.body.to,
    from: 'nishlashakya@wlit.org.np', // Use the email address or domain you verified above
    subject: req.body.subject,
    text: req.body.message,
  };
  sendService.send(data.from, data.to, data.subject, data.text)
    .then((res) => {
      console.log(res, 'result')
    })
    .catch((e) => {
      console.log(e)
    })
})

module.exports = router;
