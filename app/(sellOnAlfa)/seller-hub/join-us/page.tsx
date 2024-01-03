import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site'
import React from 'react'

let reasons = [
  { why: 'Connect to more buyers'},
  { why: 'Sell more Products'},
  { why: 'Improve revenue'},
  { why: 'Top notch product delivery'},
];

function page() {
  return (
    <section>
      <div className="px-4 pt-20 text-center">
        <h1 className="text-4xl font-extrabold tracking-normal">{siteConfig.sellPageName}</h1>
        <p className="mx-auto mt-4 max-w-3xl text-base">{siteConfig.description}</p>
      </div>

      <div className="px-4 pt-20 text-center">
        <p className="mx-auto my-4 max-w-3xl text-base">Why sell on Alfa</p>

        {reasons.map(reason => (
          <Button className='mx-2' disabled>
            {reason.why}
          </Button>
        ))}
      </div>

      <div className="px-4 pt-20 text-center">
        <p className="mx-auto my-4 max-w-3xl text-base">How it works</p>

        {reasons.map(reason => (
          <Button className='mx-2' disabled>
            {reason.why}
          </Button>
        ))}
      </div>
      
      <div className="px-4 pt-20 text-center">
        <Button className='mx-2 mb-8'>
          Start selling
        </Button>
      </div>
    </section>
  )
}

export default page