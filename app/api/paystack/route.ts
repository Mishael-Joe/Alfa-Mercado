'use strict';

// import { NextResponse } from "next/server";
export async function POST(request: Request) {
    const requestBody = await request.json();
    // console.log('requestBody', requestBody);

    const { amount } = requestBody;
    const { email, phone_number, name, uniqueRef } = requestBody.customer;
    const { address, secondary_phone_number, city, state, postal_code, itemsInCart, deliveryMethod} = requestBody.meta;

    const subamount = Number(amount * 100);
    console.log('uniqueRef', uniqueRef)

    try {
        const url = "https://api.paystack.co/transaction/initialize";
        const fields = {
          email: email,
          amount: subamount,
          reference: uniqueRef,
          customer: {
            first_name: name,
            phone: phone_number,
          },
          metadata: {
            name: name,
            city: city,
            state: state,
            address: address,
            postal_code: postal_code,
            phone_number: phone_number,
            itemsInCart: {...itemsInCart},
            deliveryMethod: deliveryMethod,
            secondary_phone_number: secondary_phone_number,
          }
        };
  
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
          body: JSON.stringify(fields),
        });
        // console.log('response', response);
  
        const result = await response.json();
        // console.log('result', result.data.authorization_url);

        return Response.json(result);
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: 'An error occurred during the request.' });
    }
  
}
