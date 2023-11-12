"use client"

import Image from "next/image"
import Link from "next/link"
import { urlForImage } from "@/sanity/lib/image"
import { Clock, X } from "lucide-react"

import { shimmer, toBase64 } from "@/lib/image"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { CartItemsEmpty } from "@/components/cart-items-empty"
import { addCommasToNumber } from "@/lib/utils"
import { useStateContext } from "@/context/stateContext"

export function CartItems() {
    const { toast } = useToast();
    // const cartRef = useRef();
    const { onRemove, cartItems, toggleCartItemQuantity } = useStateContext();

  const notify = (product: any) => {
    toast({
      variant: "destructive",
      title: `${product.name}. Quantity: ${product.quantity}`,
      description: `Product removed from cart`,
    })
  };

  if (cartItems.length === 0) return <CartItemsEmpty />;

  return (
    <ul
      role="list"
      className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-500 dark:border-gray-500"
    //   ref={cartRef}
    >
      {cartItems.length >= 1 && cartItems.map((product: any, productIdx: any) => (
        // console.log(product),
        <li key={product._id} className="flex py-6 sm:py-10">
          <div className="shrink-0">
            <Image
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(200, 200))}`}
              src={urlForImage(product.images[0]).url()}
              alt={product.name}
              width={200}
              height={200}
              className="h-24 w-24 rounded-md border-2 border-gray-200 object-cover object-center dark:border-gray-800 sm:h-48 sm:w-48"
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
            <div className="relative justify-between pr-9 sm:flex sm:gap-x-6 sm:pr-0">
              <div>
                <div className="flex justify-between">
                  <h3 className="text-sm">
                    <Link href={`/products/${product.slug}`} className="font-medium">
                      {product.name}
                    </Link>
                  </h3>
                </div>
                <p className="mt-1 text-sm font-medium">&#8358; {addCommasToNumber(product.price)}</p>
                {/* <p className="mt-1 text-sm font-medium">
                  Size: {/* @ts-ignore *
                  <strong>{getSizeName(size)}</strong>
                </p> */}
              </div>

              <div className="mt-4 sm:mt-0 sm:pr-9">
                <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                  Quantity, {product.name}
                </label>
                <div>
                    <Button type="button" onClick={() => {toggleCartItemQuantity(product._id, 'decrease')}}>Dec</Button>
                        <p>{product.quantity}</p>
                    <Button type="button" onClick={() => {toggleCartItemQuantity(product._id, 'increase')}}>plus</Button>
                </div>
                {/* <Input
                  id={`quantity-${productIdx}`}
                  name={`quantity-${productIdx}`}
                  type="number"
                  className="w-16"
                  min={1}
                  max={10}
                  value={product.quantity}
                  onChange={event => console.log(event)}
                /> */}
                <div className="absolute right-0 top-0">
                  <Button
                    variant="ghost"
                    type="button"
                    className="-mr-2 inline-flex p-2"
                    onClick={() => {notify(product); onRemove(product)}}
                  >
                    <span className="sr-only">Remove</span>
                    <X className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>

            <p className="mt-4 flex space-x-2 text-sm">
              <Clock className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>Ships in 1 week</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
