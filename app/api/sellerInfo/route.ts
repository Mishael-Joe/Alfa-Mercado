'use strict';

// export const dynamic = 'force-dynamic' // defaults to 
import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");


export async function POST(request: Request) {
  const requestBody = await request.json();
  const { seller, email, phoneNumber, businessName, productName, productDescription, productCategory, productPrice, qualitiesAvailable, } = requestBody;

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: "mishaeljoe55@zohomail.com",
      pass: process.env.NEXT_SECRET_APP_SPECIFIED_KEY,
    },
  });

  try {
    const mailOptions = {
      from: 'mishaeljoe55@zohomail.com', // sender address
      to: "mishaeljoe55@gmail.com", // list of receivers
      subject: `New Partnership Inquiry Form Submission - Action Required`, // Subject line
      text: "", // plain text body
      html: `
        <h3>Dear Team Alfa-mercado,</h3> </br>

        <p>I hope this message finds you well. I wanted to bring to your attention that we have received a new partnership inquiry from a potential collaborator. Please review the details below at your earliest convenience:</p> </br>
        
        <p>Seller Information:</p> </br>
        <ul>
          <li> Seller Name:<b> ${seller}. <b><li>
          <li> Seller Email:<b> ${email}. <b><li>
          <li> Seller Phone Number:<b> ${phoneNumber}. <b><li>
          <li> Seller Business Name:<b> ${businessName}. <b><li>
        </ul>
        
        <p>Product Details:</p> </br>
        <ul>
          <li> Product Name: <b> ${productName}. <b><li>
          <li> Product Description: <b> ${productDescription}. <b><li>
          <li> Product Price: <b> ${productPrice}. <b><li>
          <li> Product Category: <b> ${productCategory}. <b><li>
          <li> Product Quantity: <b> ${qualitiesAvailable}. <b><li>
        </ul>
        
        
        <p>This information was submitted through our partnership inquiry form. It is crucial to promptly review the details and assess the potential partnership. Your quick attention to this matter is greatly appreciated.</p> </br>
        <p>If you have any questions or require additional information, please do not hesitate to reach out. Thank you for your dedication and swift action in handling partnership inquiries.</p> </br>
        
        <b>Best regards</b> </br>
        <b>Alfa-Mercado Automated Notification</b>
      `, // html body
    }
    
    const furtherInfo = {
      from: 'mishaeljoe55@zohomail.com', // sender address
      to: `${email}`, // list of receivers
      subject: ` Acknowledgment of Your Partnership Inquiry and Request for Product Pictures`, // Subject line
      text: "", // plain text body
      html: `
        <h4>Dear ${seller},</h4>

        <p>I trust this message finds you well. Thank you for expressing interest in partnering with our organization. We have received your partnership inquiry form, and we are currently in the process of reviewing the details provided.</p> </br>
        
        <p>To proceed with the evaluation process, we kindly request that you provide us with clear visuals of the products you intend to sell on our platform. Including a variety of images from different angles will greatly assist us in understanding the products better.</p> </br>

        <p>Please submit a minimum of eight high-quality pictures for each product, ensuring that all sides of the product are well-captured. These images will significantly contribute to the assessment of your offerings and help us make informed decisions during the partnership evaluation.</p> </br>

        <p>Feel free to attach the images directly to this email or use a file-sharing service for larger files. If you encounter any difficulties or have additional information to share, please don't hesitate to reach out to us.</p> </br>

        <p>We appreciate your proactive collaboration in this process and look forward to the possibility of establishing a successful partnership.</p> </br>

        <p>Thank you for considering Alfa-mercado as your platform of choice.</p> </br>

        <b>Best regards</b>
        <b>Team Alfa-Mercado</b>
      `, // html body
    }

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(furtherInfo);
    
    return NextResponse.json({ message: 'Sucessfully sent' }, {status: 200} )
  } catch (error: any) {
    throw new Error('Error while sending Partnership Inquiry mail',error);
  }
}