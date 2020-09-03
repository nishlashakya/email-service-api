var express = require('express');
var router = express.Router();
var MailService = require('email-service')

router.get('/', function(req, res, next) {
  res.send('API is working properly');
});

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
    from: 'nishlashakya@wlit.org.np',
    subject: req.body.subject,
    text: req.body.message,
  };
  sendService.send(data.from, data.to, data.subject, data.text)
    .then(() => {
      res.send({message: 'Email sent'})
    })
    .catch((e) => {
      console.log(e)
    })
})

module.exports = router;
