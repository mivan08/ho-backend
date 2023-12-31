const express = require('express')
const router = express.Router()
const asyncHandler = require('../../middleware/async')
const sendEmail = require('../../utils/sendMail')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// @route    Post api/contact
// @desc     Send a message
router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    let { firstName, lastName, email, subject, message, consent } = req.body

    console.log(req.body.firstName)

    const contactMessage = `
<html>
  <head>
    <style>
      .button {
        background-color: #4caf50; /* Green */
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
      }
      #firstName {
        font-weight: 700;
      }
    </style>
  </head>
  <body>
   
    <p>Hi Gelu, <span id="firstName">${firstName}</span> wants to talk to you!</p>
    <p>First name: ${firstName}</p>
    <p>Last name: ${lastName}</p>
    <p>Subject: ${subject}</p>
    <p>Email: ${email}</p>
    <p>Consent: ${consent}</p>
    <p>Message: ${message}</p>
    <p>
      Best Regards,<br />
      Gelu Horotan!
    </p>
  </body>
</html>
`
    const confirmMessage = `
<html>
  <head>
    <style>
      .button {
        background-color: #4caf50; /* Green */
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
      }
      #firstName {
        font-weight: 700;
      }
    </style>
  </head>
  <body>
  <h3>Thank You for Contacting Me! Let's Make Amazing Things Happen.</h3>
<p>Hi <span id="firstName">${firstName}</span>,</p>
<p>
  Thank you for reaching out to me through my personal portfolio platform. I
  appreciate your message and the opportunity to connect with you. I wanted to
  let you know that I'll be getting back to you as fast as possible to discuss your
  inquiry in more detail.
</p>

<p>
  Please note that this email was sent from a no-reply address, so I won't be
  able to respond to any replies directly. However, I'll be reaching out to you
  shortly to continue our conversation.
</p>
<p>
  Thank you for your interest in my work. I look forward to speaking with you
  soon!
</p>
<p>
  Best Regards,<br />
  Gelu Horotan
</p>
 <h4>Socials:</h4>
  <a href="https://github.com/GeluHorotan" target="_blank" rel="noopener noreferrer">
   
    Github
  </a>
  <br/>
  <a href="https://www.linkedin.com/in/gelu-horotan/" target="_blank" rel="noopener noreferrer">

    LinkedIn
  </a>
   <br/>
  <a href="https://twitter.com/oxymoron365" target="_blank" rel="noopener noreferrer">

    Twitter
  </a>
    <br/>
  <a href="https://geluhorotan.com/" target="_blank" rel="noopener noreferrer">
     

  Portfolio
  </a>
  </body>
</html>
`

    await sendEmail(
      process.env.NOREPLY_MAIL_USERNAME,
      email,
      'Thank you for Contacting Me!',
      confirmMessage
    )

    await sendEmail(
      process.env.NOREPLY_MAIL_USERNAME,
      'horotangelu17@gmail.com',
      `${firstName} wants to talk to you`,
      contactMessage
    )

    res.status(200).json({
      success: true,
      msg: 'Your message was sent succesfully!'
    })
  })
)

module.exports = router
