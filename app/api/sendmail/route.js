// Use 'use strict' instead of 'use server' for strict mode
'use strict';

import { NextResponse } from "next/server";

const nodemailer = require("nodemailer");

export async function POST(request) {
  const requestBody = await request.json();
  const { body }  = requestBody;
  console.log('Body', body);
  
  try {
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
          user: "mishaeljoe55@zohomail.com",
          pass: process.env.NEXT_SECRET_APP_SPECIFIED_KEY,
        },
    });

    const mailOptions = {
      from: 'mishaeljoe55@zohomail.com', // sender address
      to: "mishaeljoe55@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<b>${requestBody}</b>`, // html body
    }

   await transporter.sendMail(mailOptions);

    return NextResponse.json({message: 'message sent successfully'}, {status: 200});
  } catch (err) {
    console.error('Error response body:', err);
    // You might want to handle or log the error more appropriately
    return NextResponse.json({ error: 'An error occurred while sending the message.' });
  }
}
