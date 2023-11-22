"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useStateContext } from "@/context/stateContext"
import Link from "next/link"

export function CartSummary() {
  const { cartItems, totalPrice, grandTotalPrice, shippingFee } = useStateContext();

  const disabledIsLoading = cartItems.length === 0 ? true : false
  const [isLoading, setIsLoading] = useState(disabledIsLoading)

  const Subtotal = totalPrice >= 1 ? totalPrice : 0;

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
          <dt className="text-sm">Subtotal</dt>
          <dd className="text-sm font-medium">&#8358; {Subtotal}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="flex items-center text-sm">
            <span>Shipping estimate</span>
          </dt>
          <dd className="text-sm font-medium">&#8358; {Number(shippingFee)}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="text-base font-medium">Order total</dt>
          <dd className="text-base font-medium">&#8358; {grandTotalPrice}</dd>
        </div>
      </dl>

      <div className="mt-6">
      <Button className="w-full" disabled={disabledIsLoading}>
          <Link className="flex w-full" href={`/checkout`}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
            {isLoading ? 'Loading...' : 'Checkout' }
          </Link>
        </Button>
      </div>
    </section>
  )
}
