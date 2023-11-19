'use server'

// Notice from where NextResponse is imported:
import { NextResponse } from "next/server";

// Notice the funciton definiton:
export default async function GET(req) {
  if (req.method === "POST") {
    return NextResponse.json(
      { error: "Method not allowed" },
      {
        status: 405
      }
    );
  }
}



// pages/api/payment.js

// export default async function handler(req, res) {

//   if (req.method === "GET") {
//     res.JSON(`Hello world`)
//   }


//   if (req.method === 'POST') {
//     const { cartItems } = req.body;
//     console.log(cartItems);
//     try {
//       const response = await fetch("https://api.flutterwave.com/v3/payments", {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${process.env.NEXT_SECRET_FLUTTERWAVE_SECRET_KEY}`,
//         },
//         body: JSON.stringify({
//             tx_ref: "123345fiifflsow" + Math.floor(Math.random() * 999999),
//             amount: "10000",
//             currency: "NGN",
//             payment_options: 'card,mobilemoney,ussd',
//             redirect_url: "https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
//             meta: {
//                 consumer_id: 23,
//                 consumer_mac: "92a3-912ba-1192a",
//             },
//             customer: {
//                 email: "user@gmail.com",
//                 phonenumber: "080****4528",
//                 name: "Yemi Desola",
//             },
//             customizations: {
//                 title: "Pied Piper Payments",
//                 logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png",
//             },
//             }),
//        });

//       const data = await response.json();
//       console.log(data);

//       if (response.ok) {
//         res.status(200).json(data);
//       } else {
//         console.log(`Error: ${response.status} - ${data.message}`);
//         console.error(`Error: ${response.status} - ${data.message}`);
//         alert(`Error: ${response.status} - ${data.message}`);
//         res.status(response.status).json({ error: data.message });
//       }
//     } catch (error) {
//       console.error('Error making payment:', error);
//       alert('Error making payment:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }
