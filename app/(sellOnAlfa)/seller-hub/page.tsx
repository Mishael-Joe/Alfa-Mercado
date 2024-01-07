import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site'
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';


let reasons = [
  { why: 'Connect to more buyers'},
  { why: 'Sell more Products'},
  { why: 'Improve revenue'},
  { why: 'Top notch product delivery'},
];

function page() {
  return (
    <section className='max-w-6xl mx-auto my-5 px-6 h-full'>
      <div className="px-4 pt-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-normal">{siteConfig.sellPageName}</h1>
        <p className="mx-auto mt-4 text-base">{siteConfig.description}</p>
      </div>
      
      <div className="px-4 text-center">
        <p className="mx-auto mt-4 text-base">Thank you for expressing interest in partnering with Alfa-Mercado. We value collaborations with suppliers, producers, and fellow students</p>
      </div>

      <div className="px-4 pt-10 text-center">
        <p className="mx-auto my-4 text-base md:text-2xl">Our mission</p>

        <div className='flex flex-col gap-4 md:flex-row justify-center items-center'>
          <div className='basis-1/2'>
            <Image src={'/working-together.jpg'} width={450} height={450} alt='working-together' className='rounded-md object-contain w-full'/>
          </div>

          <div className=' basis-1/2 text-2xl'>
            <p>To enable small businesses grow by uniting buyers around Africa and beyond.</p>
          </div>
        </div>

      </div>

      <div className="px-4 pt-10 text-center">
        <p className="mx-auto my-4 text-base md:text-2xl">Why sell on Alfa</p>

        <div className='flex flex-col gap-4 md:flex-row  justify-center'>
          {reasons.map((reason, i) => (
            <Button className='mx-2 md:h-16 lg:h-12' key={i} disabled>
              {reason.why}
            </Button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-10 text-center">
        <p className="mx-auto my-4 text-base md:text-2xl">How it works</p>

        <div className='flex flex-col gap-4 md:flex-row  justify-center'>
          
          <Card>
            <CardHeader>
              <CardDescription>Step 1</CardDescription>
              <CardTitle>Register</CardTitle>
            </CardHeader>

            <CardContent>
              <p>Fill in the registration form and submit the required documents</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Step 2</CardDescription>
              <CardTitle>Check your mail</CardTitle>
            </CardHeader>

            <CardContent>
              <p>Once you've submitted the form, Check your mail for further instructions.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Step 3</CardDescription>
              <CardTitle>List your Products</CardTitle>
            </CardHeader>

            <CardContent>
              <p>Upload your best selling products and start selling</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Step 4</CardDescription>
              <CardTitle>Benefit from Promotions</CardTitle>
            </CardHeader>

            <CardContent>
              <p>Get visibility from our promotions and insights on best selling products</p>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  )
}

export default page