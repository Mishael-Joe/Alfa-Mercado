// Use 'use strict' instead of 'use server' for strict mode
'use strict';

import { NextResponse } from "next/server";


export async function POST(request) {
  const origin = request.headers.get(`origin`)
  const requestBody = await request.json();
  const nodemailer = require("nodemailer");
  console.log(requestBody);

  try {
    const transporter = nodemailer.createTransport({
        service: 'Zoho',
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "mishaeljoe555@zoho.com",
          pass: process.env.NEXT_SECRET_APP_SPECIFIED_KEY,
        },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
        from: 'mishaeljoe555@zoho.com', // sender address
        to: "mishaeljoe555@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
        });
    
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
        //
        // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
        //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
        //       <https://github.com/forwardemail/preview-email>
        //
    }
    main().catch(console.error);

    return NextResponse.json({message: 'message sent successfully'}, {status: 200});
  } catch (err) {
    console.error('Error response body:', err);
    // You might want to handle or log the error more appropriately
    return NextResponse.json({ error: 'An error occurred while sending the message.' });
  }
}
