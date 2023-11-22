import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

import { useStateContext } from "@/context/stateContext"
// import Link from "next/link"
import { addCommasToNumber } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState, FormEvent } from 'react';

export function CheckoutSummary() {
  const { cartItems, totalPrice, shippingFee, grandTotalPrice, formData } = useStateContext();
  const { toast } = useToast();
  const disabledIsLoading = false
  const [isLoading, setIsLoading] = useState(disabledIsLoading)

  const config = {
    amount: grandTotalPrice,
    customer: {
      name: formData.name,
      email: formData.email,
      phone_number: formData.primaryPhoneNumber,
    },
    meta: {
      secondary_phone_number: formData.secondaryPhoneNumber || '',
      address: formData.address,
      postal_code: formData.postalcode || '',
      city: formData.city,
      state: formData.state,
      itemsInCart: {...cartItems}
    },
  };


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(() => true)

    if (
      formData.name === '' || 
      formData.email === '' || 
      formData.phone_number === '' ||
      formData.address === '' ||
      formData.city === '' ||
      formData.state === ''
      ) {
      toast({
        variant: "destructive",
        title: `ERROR`,
        description: `Provide Your Contact Details`,
      })
      
      return
    }

    try {
      const response = await fetch('/api/flutterwave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      
      const data = await response.json();
      // console.log(data)
      
      if (response.status === 200) {
        // console.log(data.data.link);
        window.location.href = data.data.link; // Redirect to the payment link
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    setIsLoading(() => false);
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
        
        <Button className="w-full"  onClick={(event) => handleSubmit(event)}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
          {isLoading ? 'Loading...' : 'Pay Now' }
        </Button>
      </div>
    </section>
  )
}
