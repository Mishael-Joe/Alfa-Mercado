// import { useState } from "react"

// import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

import { useStateContext } from "@/context/stateContext"
// import Link from "next/link"
import { addCommasToNumber } from "@/lib/utils";
import { useState, FormEvent } from 'react';

export function CheckoutSummary() {
  const { cartItems, totalPrice, shippingFee, grandTotalPrice, formData } = useStateContext();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();

  // const config = {
  //   tx_ref: "123345fiifflsow" + Math.floor(Math.random() * 999999),
  //   amount: grandTotalPrice,
  //   currency: 'NGN',
  //   payment_options: 'card,mobilemoney,ussd',
  //   customer: {
  //     name: formData.name,
  //     email: formData.email,
  //     phone_number: formData.primaryPhoneNumber,
  //   },
  //   meta: {
  //     secondary_phone_number: formData.secondaryPhoneNumber || '',
  //     address: formData.address,
  //     postal_code: formData.postalcode || '',
  //     city: formData.city,
  //     state: formData.state
  //   },
  //   customizations: {
  //     title: 'My store',
  //     description: 'Payment for items in cart',
  //     logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
  //   },
  // };

  const config = {
    details: {...formData},
    cartItem: {...cartItems}
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (formData.name === '' || formData.email === '' || formData.phone_number === '') {
      toast({
        variant: "destructive",
        title: `ERROR`,
        description: `Provide Your Contact Details`,
      })
      
      return
    }

    try {
      const response = await fetch('/api/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItems),
      });
      console.log(response)

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        console.log(data.message);
        window.location.href = data.redirect_url; // Redirect to the payment link
      } else {
        console.log(data.message);
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Internal Server Error');
    }
  };

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-6 shadow-md dark:border-gray-900 dark:bg-black sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm">Name:<span className=" text-red-600">*</span></dt>
          <dd className="text-sm font-medium">{formData.name}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm">Email:<span className=" text-red-600">*</span></dt>
          <dd className="text-sm font-medium">{formData.email}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm">Primary Phone Number:<span className=" text-red-600">*</span></dt>
          <dd className="text-sm font-medium">{formData.primaryPhoneNumber}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm">Secondary Phone Number:</dt>
          <dd className="text-sm font-medium">{formData.secondaryPhoneNumber}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm">Address:<span className=" text-red-600">*</span></dt>
          <dd className="text-sm font-medium">{formData.address}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm">Postal code:</dt>
          <dd className="text-sm font-medium">{formData.postalcode}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm">City:<span className=" text-red-600">*</span></dt>
          <dd className="text-sm font-medium">{formData.city}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm">State:<span className=" text-red-600">*</span></dt>
          <dd className="text-sm font-medium">{formData.state}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm">Subtotal</dt>
          <dd className="text-sm font-medium">&#8358; {addCommasToNumber(Number(totalPrice))}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="flex items-center text-sm">
            <span>Shipping estimate</span>
          </dt>
          <dd className="text-sm font-medium">&#8358; {addCommasToNumber(Number(shippingFee))}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="text-base font-medium">Order total</dt>
          <dd className="text-base font-medium">&#8358; {addCommasToNumber(Number(grandTotalPrice))}</dd>
        </div>
      </dl>

      <div className="mt-6">
        
        <Button className="w-full" disabled onClick={(event) => handleSubmit(event)}>
          pay Now
          {/* <FlutterWaveButton {...fwConfig} /> */}
        </Button>
      </div>
    </section>
  )
}


 // const fwConfig = { public_key: 'FLWPUBK_TEST-64f66244da5182e6674ae2095e212eb4-X',
  //   ...config,
  //   text: 'Pay Now',
  //   callback: (response: any) => {
  //       console.log(response);
  //       closePaymentModal() // this will close the modal programmatically
  //   },
  //   onClose: () => {},
  // };
  // function onCheckout() {}