// Use 'use strict' instead of 'use server' for strict mode
'use strict';

import { NextResponse } from "next/server";

const nodemailer = require("nodemailer");
const crypto = require('crypto');

type Product = {
  price: number,
  quantity: number,
  colors?: string[],
  images: {
    asset: {
      _ref: string
    }
  }[],
  sizes?: string[],
  company: string,
  name: string,
  categories?: string[],
}

type ProductForMailOptions = {
  product_name: number,
  quantity: number,
  color?: string[],
  new_Img: string,
  sizes?: string[],
  company: string,
  name: string,
  category?: string[],
  price: number,
}

export async function POST(request: Request) {
  const requestBody = await request.json();
  // console.log('requestBody', requestBody)
  const headers = request.headers;
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const cartItems = requestBody.data.metadata.itemsInCart;

  const arrOfProducts = cartItems.map(( product: Product) => {
    // console.log('product', product);
    const img = product.images[0].asset._ref;
    const newImg = img.replace('image-', 'https://cdn.sanity.io/images/l27j660s/production/').replace('-jpg', '.jpg');

    // console.log('new img: ', newImg)
    return {
      product_name: product.name,
      quantity: product.quantity,
      price: product.price,
      company: product.company,
      new_Img: newImg,
      sizes: product.sizes,
      category: product.categories,
      color: product.colors,
    }
  })
  // console.log('arrOfProducts', arrOfProducts);

  const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(request.body)).digest('hex');
  const signature = headers.get('x-paystack-signature');

  if (hash !== signature) {
    // Retrieve the request's body
    
    // Assuming `requestBody` contains the provided data
    // Accessing properties
    const eventType = requestBody.event;
    // console.log('eventType', eventType);

    const chargeData = requestBody.data;

    const transactionId = chargeData.id;
    // console.log('transactionId', transactionId);

    const transactionReference = chargeData.reference;
    // console.log('transactionReference', transactionReference);

    const transactionAmount = chargeData.amount / 100; // Assuming the amount is in kobo and needs to be converted to naira
    // console.log('transactionAmount', transactionAmount);

    const processorResponse = chargeData.gateway_response;
    // console.log('processorResponse', processorResponse);

    const status = chargeData.status;
    // console.log('status', status);

    const paymentType = chargeData.channel;
    // console.log('paymentType', paymentType);

    const createdAt = chargeData.created_at;
    // console.log('createdAt', createdAt);

    const customerName = chargeData.metadata.name;
    // console.log('customerName', customerName);

    const customerPhoneNumber = chargeData.metadata.phone_number;
    // console.log('customerPhoneNumber', customerPhoneNumber);

    const customerEmail = chargeData.customer.email;
    // console.log('customerEmail', customerEmail);

    const cardType = chargeData.authorization.card_type;
    // console.log('cardType', cardType);


    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: "mishaeljoe55@zohomail.com",
        pass: process.env.NEXT_SECRET_APP_SPECIFIED_KEY,
      },
    });

      
    if (eventType === 'charge.success') {

      if (status === "success") {
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
                <li> Customer Email: <b>${customerEmail}<b><li>
                <li> Customer Phone Number: <b>${customerPhoneNumber}<b><li>
                <li> Card Type: <b>${cardType}<b> <li>
              </ul>

              <p>Customer Product(s):</p>
              ${arrOfProducts.map((product: ProductForMailOptions) =>  (
              '\nProduct Name: ' + product.product_name + 
              ', \nLink to Product Image: ' + product.new_Img + 
              ', \nProduct quantity: ' + product.quantity + 
              ', \nProduct price: ' + product.price + 
              ', \nCompany Name: ' + product.company + 
              ', \nProduct Sizes: ' + product.sizes + 
              ', \nProduct Category: ' + product.category + 
              ', \nProduct Color: ' + product.color
              ))}

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
              
              <h4>Your order is now being processed, and you can expect the following:</h4>
              <p>Shipping Information:</p>
              <ul>
                <li> Estimated Delivery Date: <b>3 days<b><li>
              </ul>

              <p>Product Details:</p>
              ${arrOfProducts.map((product: ProductForMailOptions) =>  (
                '\nProduct Name: ' + product.product_name + 
                ', \nProduct quantity: ' + product.quantity + 
                ', \nProduct price: ' + product.price 
              ))}

              <p>Payment Summary:</p>
              <ul>
                <li> Total Amount: <b>${transactionAmount}<b> <li>
              </ul>
    
              <p>If you have any questions or concerns regarding your order, feel free to contact our support team at mishaeljoe55@zohomail.com.</p>
              <p>Thank you for choosing Alfa-Mercado. We appreciate your business and look forward to serving you again in the future.</p>
              
              <b>Best regards</b>
              <b>Alfa-Mercado Team</b>
            `, // html body
          }
      
          await transporter.sendMail(mailOptions);
          await transporter.sendMail(customersSuccessPayment);
          // transporter.sendMail(mailOptions);
      
          return NextResponse.json({ message: 'message sent successfully' }, { status: 200 });
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
  } else {
      return NextResponse.json({ message: 'This request isn\'t from Paystack' }, { status: 401 });
  }
}
