// Use 'use strict' instead of 'use server' for strict mode
'use strict';

import got from 'got';

export async function POST(request) {
  const origin = request.headers.get(`origin`)
  const requestBody = await request.json();
  const { amount } = requestBody;
  const { email, phone_number, name} = requestBody.customer;
  const { address, secondary_phone_number, city, state, postal_code, itemsInCart} = requestBody.meta;
  
  // console.log(amount);

  try {
    const response = await got.post('https://api.flutterwave.com/v3/payments', {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_SECRET_FLUTTERWAVE_SECRET_KEY}`,
      },
      json: {
        tx_ref: "123345fiifflsow" + Math.floor(Math.random() * 999999),
        amount: amount,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        redirect_url: `${origin}/success`,
        meta: {
          secondary_phone_number: secondary_phone_number ,
          address: address,
          postal_code: postal_code ,
          city: city,
          state: state,
          itemsInCart: itemsInCart,
        },
        customer: {
          email: email,
          phonenumber: phone_number,
          name: name,
        },
        customizations: {
          title: 'Unimart store',
          description: 'Payment for items in cart',
          logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png",
        },
      },
    }).json();

    // console.log(response);

    return Response.json(response);
  } catch (err) {
    console.error('Error code:', err);
    console.error('Error response body:', err);
    // You might want to handle or log the error more appropriately
    return Response.json({ error: 'An error occurred during the request.' });
  }
}
