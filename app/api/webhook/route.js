// Use 'use strict' instead of 'use server' for strict mode
'use strict';

import { NextResponse } from "next/server";

const nodemailer = require("nodemailer");

export async function POST(request) {
  const requestBody = await request.json();

  // Accessing properties
  const eventType = requestBody.event;
  const chargeData = requestBody.data;
  const transactionId = chargeData.id;
  const transactionReference = chargeData.tx_ref;
  const flutterwaveTransactionReference = chargeData.flw_ref;
  const transactionAmount = chargeData.amount;
  const processorResponse = chargeData.processor_response;
  const narration = chargeData.narration;
  const status = chargeData.status;
  const paymentType = chargeData.payment_type;
  const createdAt = chargeData.created_at;

  const customerName = chargeData.customer.name;
  const customerId = chargeData.customer.id;
  const customerPhoneNumber = chargeData.customer.phone_number;
  const customerEmail = chargeData.customer.email;
  const cardType = chargeData.card.type;


  // console.log('requestBody', requestBody);

  if (eventType === 'charge.completed') {
    
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
        subject: "New Transaction From Alfa-Mercado", // Subject line
        text: "Beging Delivering Process", // plain text body
        html: `
          <h1>New Transaction </h1> </br>
          <h2>NOTE: Before giving the customer value always confirm the Transaction status to see if it is a success or failure status</h2> </br>
          <h3>Here are they Transaction Details </h3> </br>

          <p>Transaction status: <b>${status}<b> </p> </br>
          <p>Customer's Name: <b>${customerName}<b> </p> </br>
          <p>Customer's ID: <b>${customerId}<b> </p> </br>
          <p>Customer's Phone Number: <b>${customerPhoneNumber}<b> </p> </br>
          <p>Customer's Email: <b>${customerEmail}<b> </p> </br>
          <p>Transaction Amount: <b>${transactionAmount}<b> </p> </br>
          <p>Processor Response: <b>${processorResponse}<b> </p> </br>
          <p>Created At: <b>${createdAt}<b> </p> </br>
          <p>Card Type: <b>${cardType}<b> </p> </br>

          <p>Transaction Id: <b>${transactionId}<b> </p> </br>
          <p>Transaction Reference: <b>${transactionReference}<b> </p> </br>
          <p>Flutterwave Transaction Reference: <b>${flutterwaveTransactionReference}<b> </p> </br>
          <p>Narration: <b>${narration}<b> </p> </br>
          <p>Payment Type: <b>${paymentType}<b> </p> </br>

          <h4>NOTE: Before giving the customer value always confirm the Transaction status to see if it is a success or failure status</h4> </br>
          <b>Best Wishes, Alfa</b> </br>
        `, // html body
      }
  
     await transporter.sendMail(mailOptions);
  
      return NextResponse.json({message: 'message sent successfully'}, {status: 200});
    } catch (err) {
      console.error('Error response body:', err);
      // You might want to handle or log the error more appropriately
      return NextResponse.json({ error: 'An error occurred while sending the message.' });
    }
  }
}