"use client"

import { CheckoutSummary } from "@/components/checkout-cart-summary";
import { useStateContext } from "@/context/stateContext"
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const LoginForm = () => {
    const { isSignedIn, user } = useUser();
    if (!isSignedIn) redirect('/sign-in');
    const { cartItems, totalPrice, formData, handleChange, updateUser } = useStateContext();
    if (isSignedIn) updateUser(user);
    const disableNameInput = user.fullName !== undefined || null || '' ? true : false;
    const disableEmailInput = user.primaryEmailAddress?.emailAddress !== undefined || null || '' ? true : false;


    // console.log('isSignedIn', isSignedIn);
    // console.log('user', user);
    // console.log('user', user.phoneNumbers[0].phoneNumber);

    return (        
        <div>
            <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready To Pay
                </h1>

                <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <h2 id="cart-heading" className="sr-only">Pleasa, Fill out your Information</h2>
                        {/* Cart Items */}
                        {/* <CartItems /> */}
                        <div className="mt-4">
                            <input 
                            name="name"
                            value={formData.name}
                            type="text"
                            onChange={handleChange}
                            placeholder="Your Name "
                            required
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border-2 dark:border-1 border-gray-300 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-gray-200 dark:focus:border-gray-200 focus:ring-green-100 focus:outline-none focus:ring focus:ring-opacity-10 focus:border-2" 
                            disabled={disableNameInput}
                            />
                        </div>
                        
                        <div className="mt-4">
                            <input 
                            name="email"
                            value={formData.email}
                            type="email"
                            onChange={handleChange}
                            placeholder="E-Mail"
                            required
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border-2 dark:border-1 border-gray-300 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-gray-200 dark:focus:border-gray-200 focus:ring-green-100 focus:outline-none focus:ring focus:ring-opacity-10 focus:border-2" 
                            disabled={disableEmailInput}
                            />
                        </div>

                        <div className="mt-4">
                            <input 
                            name="primaryPhoneNumber"
                            value={formData.primaryPhoneNumber}
                            type="text"
                            onChange={handleChange}
                            placeholder="primary Phone Number"
                            required
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border-2 dark:border-1 border-gray-300 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-gray-200 dark:focus:border-gray-200 focus:ring-green-100 focus:outline-none focus:ring focus:ring-opacity-10 focus:border-2" 
                            />
                        </div>

                        <div className="mt-4">
                            <input 
                            name="secondaryPhoneNumber"
                            value={formData.secondaryPhoneNumber}
                            type="text"
                            onChange={handleChange}
                            placeholder="secondary Phone Number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border-2 dark:border-1 border-gray-300 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-gray-200 dark:focus:border-gray-200 focus:ring-green-100 focus:outline-none focus:ring focus:ring-opacity-10 focus:border-2" 
                            />
                        </div>

                        <div className="mt-4">
                            <input 
                            name="address"
                            value={formData.address}
                            type="text"
                            onChange={handleChange}
                            required
                            placeholder="Your address" 
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border-2 dark:border-1 border-gray-300 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-gray-200 dark:focus:border-gray-200 focus:ring-green-100 focus:outline-none focus:ring focus:ring-opacity-10 focus:border-2" 
                            />
                        </div>

                        <div className="mt-4">
                            <input 
                            name="postalcode"
                            value={formData.postalcode}
                            type="text"
                            onChange={handleChange}
                            placeholder="Your postal code" 
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border-2 dark:border-1 border-gray-300 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-gray-200 dark:focus:border-gray-200 focus:ring-green-100 focus:outline-none focus:ring focus:ring-opacity-10 focus:border-2" 
                            />
                        </div>

                        <div className="mt-4">
                            <input 
                            name="city"
                            value={formData.city}
                            type="text"
                            onChange={handleChange}
                            required
                            placeholder="Your city" 
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border-2 dark:border-1 border-gray-300 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-gray-200 dark:focus:border-gray-200 focus:ring-green-100 focus:outline-none focus:ring focus:ring-opacity-10 focus:border-2" 
                            />
                        </div>

                        <div className="mt-4">
                            <input 
                            name="state"
                            value={formData.state}
                            type="text"
                            onChange={handleChange}
                            required
                            placeholder="Your state" 
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border-2 dark:border-1 border-gray-300 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-gray-200 dark:focus:border-gray-200 focus:ring-green-100 focus:outline-none focus:ring focus:ring-opacity-10 focus:border-2" 
                            />
                        </div>

                    </section>
                    {/* Cart Summary */}
                    <CheckoutSummary />
                </form>
            </main>
        </div>
    )
}

export default LoginForm