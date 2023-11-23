"use client"

import Link from "next/link"
import { useStateContext } from "@/context/stateContext"
import { CheckCheck, XCircle } from "lucide-react";
import { useSearchParams, usePathname } from "next/navigation";

export default function Page() {
  
  const { clearItemsInCart, successFormData } = useStateContext();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const startsWithSuccess = pathname.startsWith('/success')
  
  const status = searchParams.get('status');
  const transaction_reference = searchParams.get('tx_ref');
  // console.log(searchParams)
  // console.log(status)
  // console.log(transaction_reference)
  // console.log(pathname)
  
  if ( status === 'cancelled') {

    return (
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <>
          <XCircle className="mx-auto h-10 w-10 text-red-500 dark:text-red-400" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-red-500 dark:text-red-400 sm:text-5xl">
            Payment cancelled!!
          </h1>
          <h3 className="mt-8 text-2xl leading-7">
            Sorry <span className="font-extrabold">{successFormData.name}</span>, Payment was not successfull!
          </h3>
          <p className="mt-8">
            Your transaction reference{" "}
            <span className="mx-1 font-extrabold text-indigo-500">{transaction_reference}</span>
          </p>
          </>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/cart"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Back to cart
            </Link>
            <a href="#" className="text-sm font-semibold">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    )
  }
  

  if ( status === 'failed') {

    return (
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <>
          <XCircle className="mx-auto h-10 w-10 text-red-500 dark:text-red-400" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-red-500 dark:text-red-400 sm:text-5xl">
            Opps, Something went wrong!!!
          </h1>
          <h3 className="mt-8 text-2xl leading-7">
            Sorry <span className="font-extrabold">{successFormData.name}</span>, Payment was not successfull!
          </h3>
          <p className="mt-8">
            Your transaction reference{" "}
            <span className="mx-1 font-extrabold text-indigo-500">{transaction_reference}</span>
          </p>
          </>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/cart"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Back to cart
            </Link>
            <a href="#" className="text-sm font-semibold">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    )
  }
  
  if ( status === 'success') {

    const clearStorage = () => {
      if (startsWithSuccess) {
        clearItemsInCart();
      }
    }

    clearStorage();

    return (
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          {/* Checkout session */}
          <>
          <CheckCheck className="mx-auto h-10 w-10 text-lime-500 dark:text-lime-400" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-lime-500 dark:text-lime-400 sm:text-5xl">
            Order Successful!
          </h1>
          <h3 className="mt-8 text-2xl leading-7">
            Thank you, <span className="font-extrabold">{successFormData.name}</span>!
          </h3>
          <p className="mt-8">
            Check your purchase email{" "}
            <span className="mx-1 font-extrabold text-indigo-500">{successFormData.email}</span> for
            your invoice.
          </p>
          <p className="mt-8">
            Your transaction reference{" "}
            <span className="mx-1 font-extrabold text-indigo-500">{transaction_reference}</span>
          </p>
          </>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <a href="#" className="text-sm font-semibold">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    )
  }
  
}
