"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Plus, Minus } from "lucide-react"

import { addCommasToNumber } from "@/lib/utils"
import { useStateContext } from "@/context/stateContext"
import { getSizeName } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast";

import ShareButton from "../utils/shareBTN"
// import { useRouter } from 'next/router';

// interface Props {}

export function ProductInfo({ product }: any) {
  // const router = useRouter();
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''; // or router.pathname for the path without query parameters

  console.log('Current URL:', currentUrl);
  // console.log(product);
  const [selectedSize, setSelectedSize] = useState(() => {
    if (product.sizes === undefined || product.sizes === null) {
      return null;
    }
    return product.sizes[0];
  });
  
  const { toast } = useToast();
  const {addToCart, quantity, incrementQuantity, decrementQuantity} = useStateContext();


  const notify = (product: any) => {
    toast({
      title: `${product.name}. Quantity: ${quantity}`,
      description: `Product added to cart`,
      action: (
        <Link href={`/cart`}>
          <Button variant={`link`} className="gap-x-2 whitespace-nowrap">
            <span>open cart</span>
            <ArrowRight className="h-5 w-5"/>
          </Button>
        </Link>
      ),
    })
  };

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight">&#8358; {addCommasToNumber(product.price)}</p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6 text-base">{product.description}</div>
      </div>

      <div className="mt-4">
        <div className="flex gap-4 pb-4 w-full justify-between">
          <div className="flex gap-4 pb-4">
            <Button type="button" onClick={decrementQuantity}><Minus className="h-5 w-5"/></Button>
            <Button className=" border-none" disabled>{quantity}</Button>
            <Button type="button" onClick={incrementQuantity}><Plus className="h-5 w-5"/></Button>
          </div>

          <div>
            <ShareButton slug={currentUrl} />
          </div>
        </div>
        <p>
          {/* Size: <strong>{selectedSize && getSizeName(selectedSize)}</strong> */}
          {selectedSize ? `size: ${getSizeName(selectedSize)}` : ''}
        </p>
        {product.sizes && product.sizes.map((size: any) => (
          <Button onClick={() => setSelectedSize(size)} key={size} variant={selectedSize ? "default" : `outline`} className="mr-2 mt-4">
            {size && getSizeName(size)}
          </Button>
        ))}
      </div>

      <form className="mt-6">
        <div className="mt-4 flex">
          <Button
            type="button"
            className="w-full bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
            onClick={() => {notify(product); addToCart(product, quantity)}}
          >
            Add to cart
          </Button>
        </div>
      </form>
    </div>
  )
}
