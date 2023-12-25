// Use 'use strict' instead of 'use server' for strict mode
'use strict';

import { NextResponse } from "next/server";

const nodemailer = require("nodemailer");
// const Flutterwave = require('flutterwave-node-v3');

// under node_modules\flutterwave-node-v3 i changed the the package.json to packageInfo.json so as to bypass 'use strict' mode

// const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

export async function POST(request) {
  const requestBody = await request.json();
  const headers = request.headers;
  const signature = headers.get('verif-hash');

  // console.log('requestBody', requestBody);

  const secretHash = process.env.FLW_SECRET_HASH;

  if (!signature || (signature !== secretHash)) { 
    // In the webhook endpoint, check if the verif-hash header is present 
    // and that it matches the secret hash you set. If the header is missing, or the value doesn't match, 
    // you can discard the request, as it isn't from Flutterwave.

    // This request isn't from Flutterwave; discard
    // res.status(401).end();
    return NextResponse.json({ message: 'This request isn\'t from Flutterwave' }, { status: 401 });
  }

  // Accessing properties
  const eventType = requestBody.event;
  const chargeData = requestBody.data;

  const transactionId = chargeData.id;
  const transactionReference = chargeData.tx_ref;
  const flutterwaveTransactionReference = chargeData.flw_ref;
  const transactionAmount = chargeData.amount;
  // const transactionCurrency = chargeData.currency;
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

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: "mishaeljoe55@zohomail.com",
      pass: process.env.NEXT_SECRET_APP_SPECIFIED_KEY,
    },
  });

  if (eventType === 'charge.completed') {

    // const response = await flw.Transaction.verify({ id: transactionId.toString() });

    if (status === "successful") {
      // Success! Confirm the customer's payment

      try {
        
        const mailOptions = {
          from: 'mishaeljoe55@zohomail.com', // sender address
          to: "mishaeljoe55@gmail.com", // list of receivers
          subject: "New Successful Transaction Notification", // Subject line
          text: "Beging Delivering Process", // plain text body
          html: `
            <h1>Great news! A new transaction has been successfully processed on Alfa-Mercado.</h1>
            <h3>NOTE: Before giving the customer value always confirm the Transaction status to see if it is a success or failure status</h3> </br>
            <h3>Here are the details:</h3> </br>
  
            <p>Transaction Details:</p>
            <ul>
              <li> Transaction ID: <b>${transactionId}<b><li>
              <li> Transaction Amount: <b>${transactionAmount}<b><li>
              <li> Transaction Reference: <b>${transactionReference}<b><li>
              <li> Payment Type: <b>${paymentType}<b><li>
              <li> Processor Response: <b>${processorResponse}</b><li>
              <li> Transaction Status: <b>${status}<b><li>
              <li> Transaction Date: <b>${createdAt}<b><li>
            </ul>

            <p>Customer Details:</p>
            <ul>
              <li> Customer Name: <b>${customerName}<b><li>
              <li> Customer ID: <b>${customerId}<b><li>
              <li> Customer Email: <b>${customerEmail}<b><li>
              <li> Customer Phone Number: <b>${customerPhoneNumber}<b><li>
              <li> Card Type: <b>${cardType}<b> <li>
            </ul>

            <p>Other Details:</p>
            <ul>
              <li> Flutterwave Transaction Reference: <b>${flutterwaveTransactionReference}<b> <li>
              <li> Narration: <b>${narration}<b> <li>
            </ul>
  
            <h3>NOTE: Before giving the customer value, Please review this information to ensure everything looks correct. If you have any questions or need further assistance, feel free to reach out.</h3>
            <p>Thank you for your attention, and congratulations on the successful transaction!</p>
            
            <b>Best regards</b>
            <b>Alfa-Mercado Automated Notification</b>
          `, // html body
        }

        const customersSuccessPayment = {
          from: 'mishaeljoe55@zohomail.com', // sender address
          to: `${customerEmail}`, // list of receivers
          subject: "Successful Transaction Notification", // Subject line
          text: "", // plain text body
          html: `
            <h2>Congratulations! We are thrilled to inform you that your recent transaction on Alfa-Mercado was successful. Your purchase has been confirmed, and we are grateful for your trust in us.</h2>
            <h3>NOTE: Before giving the customer value always confirm the Transaction status to see if it is a success or failure status</h3> </br>
            <h3>Here are the details:</h3> </br>
  
            <p>Transaction Details:</p>
            <ul>
              <li> Transaction ID: <b>${transactionId}<b><li>
              <li> Transaction Amount: <b>${transactionAmount}<b><li>
              <li> Transaction Reference: <b>${transactionReference}<b><li>
              <li> Payment Type: <b>${paymentType}<b><li>
              <li> Processor Response: <b>${processorResponse}</b><li>
              <li> Transaction Status: <b>${status}<b><li>
              <li> Transaction Date: <b>${createdAt}<b><li>
            </ul>
            
            // <h4>Your order is now being processed, and you can expect the following:</h4>

            // <p>Shipping Information:</p>
            // <ul>
            //   <li> Shipping Address: <b><b><li>
            //   <li> Estimated Delivery Date: <b>4 days<b><li>
            // </ul>

            // <p>Product Details:</p>
            // <ul>
            //   <li> Product Name: <b><b> <li>
            //   <li> Quantity: <b><b> <li>
            //   <li> Price: <b><b> <li>
            // </ul>


            // <p>Payment Summary:</p>
            // <ul>
            //   <li> Subtotal: <b><b> <li>
            //   <li> Tax: <b><b> <li>
            //   <li> Shipping Fee: <b><b> <li>
            //   <li> Total Amount: <b><b> <li>
            // </ul>
  
            <p>If you have any questions or concerns regarding your order, feel free to contact our support team at mishaeljoe55@zohomail.com.</p>
            <p>Thank you for choosing Alfa-Mercado. We appreciate your business and look forward to serving you again in the future.</p>
            
            <b>Best regards</b>
            <b>Alfa-Mercado Team</b>
          `, // html body
        }
    
        await transporter.sendMail(mailOptions);
        // await transporter.sendMail(customersSuccessPayment);
        // transporter.sendMail(mailOptions);
    
        return NextResponse.json({message: 'message sent successfully'}, {status: 200});
      } catch (err) {
        console.error('Error response body:', err);
        // You might want to handle or log the error more appropriately
        return NextResponse.json({ error: 'An error occurred while sending the message.' });
      }

    } else {
      // Inform the customer their payment was unsuccessful

      try {
    
        const mailOptions = {
          from: 'mishaeljoe55@zohomail.com', // sender address
          to: `${customerEmail}`, // list of receivers
          subject: "Failed Transaction Notification", // Subject line
          text: "unsuccessful Payment", // plain text body
          html: `
            <h1>Failed Transaction Notification</h1> </br>

            <h3>Dear ${customerName}, </h3> </br>
            
            <p>We hope this message finds you well. We regret to inform you that your recent transaction on Alfa-Mercado was unsuccessful. Our records indicate that there was an issue with the payment method you provided.</p> </br>

            <p>Transaction Details:</p>
            <ul>
              <li> Transaction ID: <b>${transactionId}<b><li>
              <li> Transaction Amount: <b>${transactionAmount}<b><li>
              <li> Transaction Reference: <b>${transactionReference}<b><li>
              <li> Payment Type: <b>${paymentType}<b><li>
              <li> Processor Response: <b>${processorResponse}</b><li>
              <li> Transaction Status: <b>${status}<b><li>
              <li> Transaction Date: <b>${createdAt}<b><li>
            </ul>
  
            <p>Please review your payment details and ensure that they are accurate. If you believe there has been an error, you may want to contact your financial institution or try an alternative payment method.</p>
            <p>If you continue to experience issues, feel free to reach out to our support team at mishaeljoe55@zohomail.com</p>
            <p>We apologize for any inconvenience this may have caused. Thank you for choosing Alfa-Mercado, and we appreciate your understanding.</p>
  
            <b>Best regards,</b>
            <p>Alfa-Mercado Team</p>
          `, // html body
        }

        const automatedFailNotification = {
          from: 'mishaeljoe55@zohomail.com', // sender address
          to: `mishaeljoe55@gmail.com`, // list of receivers
          subject: "Alert: Failed Transaction Notification on Alfa-Mercado", // Subject line
          text: "unsuccessful Payment", // plain text body
          html: `
            <h1>Failed Transaction Notification</h1> </br>

            <h3>Dear Mishael, </h3> </br>
            
            <p>This is an automated notification from Alfa-Mercado regarding a failed transaction. Please review the details below:</p> </br>

            <p>Transaction Details:</p>
            <ul>
              <li> Customer Name: <b>${customerName}<b><li>
              <li> Transaction ID: <b>${transactionId}<b><li>
              <li> Transaction Amount: <b>${transactionAmount}<b><li>
              <li> Transaction Reference: <b>${transactionReference}<b><li>
              <li> Payment Type: <b>${paymentType}<b><li>
              <li> Processor Response: <b>${processorResponse}</b><li>
              <li> Transaction Status: <b>${status}<b><li>
              <li> Transaction Date: <b>${createdAt}<b><li>
            </ul>
  
            <b>Action Required:</b>
            <p>Please investigate the issue promptly. Check the provided transaction details and identify the cause of the failure. If necessary, reach out to the customer to provide assistance or request updated payment information.</p>
            <p>If you need further assistance or have any questions, feel free to contact our support team.</p>
            <p>Thank you for your attention to this matter.</p>
  
            <b>Best regards,</b>
            <p>Alfa-Mercado Automated System</p>
          `, // html body
        }
    
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(automatedFailNotification);
        // transporter.sendMail(mailOptions);
    
        return NextResponse.json({message: 'Failed Transaction Notification Message Sent Successfully'}, {status: 200});
      } catch (err) {
        console.error('Error response body:', err);
        // You might want to handle or log the error more appropriately
        return NextResponse.json({ error: 'An error occurred while sending the message.' });
      }

      // return NextResponse.json({ message: 'Payment unsuccessful' }, { status: 400 });
    }
    
  }
}

/*
Subject: Successful Transaction Notification

Dear [Customer Name],

Congratulations! We are thrilled to inform you that your recent transaction on Alfa-Mercado was successful. Your purchase has been confirmed, and we are grateful for your trust in us.

Transaction Details:
- Transaction ID: [Transaction ID]
- Transaction Amount: [Transaction Amount]
- Transaction Reference: [Transaction Reference]
- Payment Type: [Payment Type]
- Processor Response: [Processor Response]
- Transaction Status: [Transaction Status]
- Transaction Date: [Transaction Date]

Your order is now being processed, and you can expect the following:

1. **Shipping Information:**
   - Shipping Address: [Customer Address]
   - Estimated Delivery Date: [Estimated Delivery Date]

2. **Product Details:**
   - Product Name: [Product Name]
   - Quantity: [Quantity]
   - Price: [Price]

3. **Payment Summary:**
   - Subtotal: [Subtotal]
   - Tax: [Tax]
   - Shipping Fee: [Shipping Fee]
   - Total Amount: [Total Amount]

If you have any questions or concerns regarding your order, feel free to contact our support team at [Your Support Email].

Thank you for choosing Alfa-Mercado. We appreciate your business and look forward to serving you again in the future.

Best regards,
Alfa-Mercado Team

*/


// // Use 'use strict' instead of 'use server' for strict mode


// import { NextResponse } from "next/server";

// const nodemailer = require("nodemailer");
// const Flutterwave = require('flutterwave-node-v3');

// // under node_modules\flutterwave-node-v3 i changed the the package.json to packageInfo.json so as to bypass 'use strict' mode

// const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

// export async function POST(request) {
//   const requestBody = await request.json();
//   const headers = request.headers;
//   const signature = headers.get('verif-hash');

//   // console.log('requestBody', requestBody);

//   const secretHash = process.env.FLW_SECRET_HASH;

//   if (!signature || (signature !== secretHash)) { 
//     // In the webhook endpoint, check if the verif-hash header is present 
//     // and that it matches the secret hash you set. If the header is missing, or the value doesn't match, 
//     // you can discard the request, as it isn't from Flutterwave.

//     // This request isn't from Flutterwave; discard
//     // res.status(401).end();
//     return NextResponse.json({ message: 'This request isn\'t from Flutterwave' }, { status: 401 });
//   }

//   // Accessing properties
//   const eventType = requestBody.event;
//   const chargeData = requestBody.data;

//   const transactionId = chargeData.id;
//   const transactionReference = chargeData.tx_ref;
//   const flutterwaveTransactionReference = chargeData.flw_ref;
//   const transactionAmount = chargeData.amount;
//   const transactionCurrency = chargeData.currency;
//   const processorResponse = chargeData.processor_response;
//   const narration = chargeData.narration;
//   const status = chargeData.status;
//   const paymentType = chargeData.payment_type;
//   const createdAt = chargeData.created_at;

//   const customerName = chargeData.customer.name;
//   const customerId = chargeData.customer.id;
//   const customerPhoneNumber = chargeData.customer.phone_number;
//   const customerEmail = chargeData.customer.email;
//   const cardType = chargeData.card.type;

//   const transporter = nodemailer.createTransport({
//     host: 'smtp.zoho.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: "mishaeljoe55@zohomail.com",
//       pass: process.env.NEXT_SECRET_APP_SPECIFIED_KEY,
//     },
//   });

//   if (eventType === 'charge.completed') {

//     const response = await flw.Transaction.verify({ id: transactionId.toString() });

//     if (response.data.status === "successful" && response.data.amount === transactionAmount && response.data.currency === transactionCurrency) {
//       // Success! Confirm the customer's payment

//       try {
        
//         const mailOptions = {
//           from: 'mishaeljoe55@zohomail.com', // sender address
//           to: "mishaeljoe55@gmail.com", // list of receivers
//           subject: "New Successful Transaction Notification", // Subject line
//           text: "Beging Delivering Process", // plain text body
//           html: `
//             <h1>Great news! A new transaction has been successfully processed on Alfa-Mercado.</h1>
//             <h3>NOTE: Before giving the customer value always confirm the Transaction status to see if it is a success or failure status</h3> </br>
//             <h3>Here are the details:</h3> </br>
  
//             <p>Transaction Details:</p>
//             <ul>
//               <li> Transaction ID: <b>${transactionId}<b><li>
//               <li> Transaction Amount: <b>${transactionAmount}<b><li>
//               <li> Transaction Reference: <b>${transactionReference}<b><li>
//               <li> Payment Type: <b>${paymentType}<b><li>
//               <li> Processor Response: <b>${processorResponse}</b><li>
//               <li> Transaction Status: <b>${status}<b><li>
//               <li> Transaction Date: <b>${createdAt}<b><li>
//             </ul>

//             <p>Customer Details:</p>
//             <ul>
//               <li> Customer Name: <b>${customerName}<b><li>
//               <li> Customer ID: <b>${customerId}<b><li>
//               <li> Customer Email: <b>${customerEmail}<b><li>
//               <li> Customer Phone Number: <b>${customerPhoneNumber}<b><li>
//               <li> Card Type: <b>${cardType}<b> <li>
//             </ul>

//             <p>Other Details:</p>
//             <ul>
//               <li> Flutterwave Transaction Reference: <b>${flutterwaveTransactionReference}<b> <li>
//               <li> Narration: <b>${narration}<b> <li>
//               <li> Payment Type: <b>${paymentType}<b> <li>
//               <li> Customer Phone Number: <b>${customerPhoneNumber}<b><li>
//               <li> Card Type: <b>${cardType}<b> <li>
//             </ul>
  
//             <h3>NOTE: Before giving the customer value, Please review this information to ensure everything looks correct. If you have any questions or need further assistance, feel free to reach out.</h3>
//             <p>Thank you for your attention, and congratulations on the successful transaction!</p>
            
//             <b>Best regards</b>
//             <b>Alfa-Mercado Automated Notification</b>
//           `, // html body
//         }
    
//         await transporter.sendMail(mailOptions);
//         // transporter.sendMail(mailOptions);
    
//         return NextResponse.json({message: 'message sent successfully'}, {status: 200});
//       } catch (err) {
//         console.error('Error response body:', err);
//         // You might want to handle or log the error more appropriately
//         return NextResponse.json({ error: 'An error occurred while sending the message.' });
//       }

//     } else {
//       // Inform the customer their payment was unsuccessful

//       try {
    
//         const mailOptions = {
//           from: 'mishaeljoe55@zohomail.com', // sender address
//           to: `${customerEmail}`, // list of receivers
//           subject: "Failed Transaction Notification", // Subject line
//           text: "unsuccessful Payment", // plain text body
//           html: `
//             <h1>Failed Transaction Notification</h1> </br>

//             <h3>Dear ${customerName}, </h3> </br>
            
//             <p>We hope this message finds you well. We regret to inform you that your recent transaction on Alfa-Mercado was unsuccessful. Our records indicate that there was an issue with the payment method you provided.</p> </br>

//             <p>Transaction Details:</p>
//             <ul>
//               <li> Transaction ID: <b>${transactionId}<b><li>
//               <li> Transaction Amount: <b>${transactionAmount}<b><li>
//               <li> Transaction Reference: <b>${transactionReference}<b><li>
//               <li> Payment Type: <b>${paymentType}<b><li>
//               <li> Processor Response: <b>${processorResponse}</b><li>
//               <li> Transaction Status: <b>${status}<b><li>
//               <li> Transaction Date: <b>${createdAt}<b><li>
//             </ul>
  
//             <p>Please review your payment details and ensure that they are accurate. If you believe there has been an error, you may want to contact your financial institution or try an alternative payment method.</p>
//             <p>If you continue to experience issues, feel free to reach out to our support team at mishaeljoe55@zohomail.com</p>
//             <p>We apologize for any inconvenience this may have caused. Thank you for choosing Alfa-Mercado, and we appreciate your understanding.</p>
  
//             <b>Best regards,</b>
//             <p>Alfa-Mercado Team</p>
//           `, // html body
//         }

//         const automatedFailNotification = {
//           from: 'mishaeljoe55@zohomail.com', // sender address
//           to: `mishaeljoe55@gmail.com`, // list of receivers
//           subject: "Alert: Failed Transaction Notification on Alfa-Mercado", // Subject line
//           text: "unsuccessful Payment", // plain text body
//           html: `
//             <h1>Failed Transaction Notification</h1> </br>

//             <h3>Dear Mishael, </h3> </br>
            
//             <p>This is an automated notification from Alfa-Mercado regarding a failed transaction. Please review the details below:</p> </br>

//             <p>Transaction Details:</p>
//             <ul>
//               <li> Customer Name: <b>${customerName}<b><li>
//               <li> Transaction ID: <b>${transactionId}<b><li>
//               <li> Transaction Amount: <b>${transactionAmount}<b><li>
//               <li> Transaction Reference: <b>${transactionReference}<b><li>
//               <li> Payment Type: <b>${paymentType}<b><li>
//               <li> Processor Response: <b>${processorResponse}</b><li>
//               <li> Transaction Status: <b>${status}<b><li>
//               <li> Transaction Date: <b>${createdAt}<b><li>
//             </ul>
  
//             <b>Action Required:</b>
//             <p>Please investigate the issue promptly. Check the provided transaction details and identify the cause of the failure. If necessary, reach out to the customer to provide assistance or request updated payment information.</p>
//             <p>If you need further assistance or have any questions, feel free to contact our support team.</p>
//             <p>Thank you for your attention to this matter.</p>
  
//             <b>Best regards,</b>
//             <p>Alfa-Mercado Automated System</p>
//           `, // html body
//         }
    
//         await transporter.sendMail(mailOptions);
//         await transporter.sendMail(automatedFailNotification);
//         // transporter.sendMail(mailOptions);
    
//         return NextResponse.json({message: 'Failed Transaction Notification Message Sent Successfully'}, {status: 200});
//       } catch (err) {
//         console.error('Error response body:', err);
//         // You might want to handle or log the error more appropriately
//         return NextResponse.json({ error: 'An error occurred while sending the message.' });
//       }

//       // return NextResponse.json({ message: 'Payment unsuccessful' }, { status: 400 });
//     }
    
//   }
// }

// /*
// Subject: Successful Transaction Notification

// Dear [Customer Name],

// Congratulations! We are thrilled to inform you that your recent transaction on Alfa-Mercado was successful. Your purchase has been confirmed, and we are grateful for your trust in us.

// Transaction Details:
// - Transaction ID: [Transaction ID]
// - Transaction Amount: [Transaction Amount]
// - Transaction Reference: [Transaction Reference]
// - Payment Type: [Payment Type]
// - Processor Response: [Processor Response]
// - Transaction Status: [Transaction Status]
// - Transaction Date: [Transaction Date]

// Your order is now being processed, and you can expect the following:

// 1. **Shipping Information:**
//    - Shipping Address: [Customer Address]
//    - Estimated Delivery Date: [Estimated Delivery Date]

// 2. **Product Details:**
//    - Product Name: [Product Name]
//    - Quantity: [Quantity]
//    - Price: [Price]

// 3. **Payment Summary:**
//    - Subtotal: [Subtotal]
//    - Tax: [Tax]
//    - Shipping Fee: [Shipping Fee]
//    - Total Amount: [Total Amount]

// If you have any questions or concerns regarding your order, feel free to contact our support team at [Your Support Email].

// Thank you for choosing Alfa-Mercado. We appreciate your business and look forward to serving you again in the future.

// Best regards,
// Alfa-Mercado Team

// */