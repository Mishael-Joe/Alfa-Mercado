import { siteConfig } from "@/config/site"

function page() {
    return (
      <div className=' md:max-w-5xl md:container md:mx-auto min-h-screen my-auto flex justify-center items-center'>
        <div className='py-8 px-4 flex flex-col gap-4'>
  
          <h1 className=' text-xl font-semibold text-center md:text-3xl'>Shipping and Return policies</h1>
  
          <p className=' text-center '>Shipping Policy</p>
  
          <p>At <span className=' font-semibold font-mono'>{siteConfig.name}</span>, we strive to provide a seamless and efficient shopping experience for our valued students. Here's a breakdown of our shipping policy:</p>
  
          <p><span className='font-semibold text-lg'>Order Processing:</span> Orders are typically processed within 1-3 business days. You will receive a confirmation email once your order has been successfully placed.</p>
  
          <p><span className='font-semibold text-lg'>Shipping Methods:</span> We offer standard and expedited shipping options. Delivery times may vary based on your location and the selected shipping method.</p>
  
          <p><span className='font-semibold text-lg'>Shipping Costs:</span> Shipping costs are calculated at checkout based on the weight of your order and your location. We may offer free shipping promotions during certain periods, so keep an eye out for those!</p>
  
          <p><span className='font-semibold text-lg'>Tracking Information:</span> Once your order is shipped, you will receive a tracking number to monitor the progress of your delivery.</p>
  
          <p><span className='font-semibold text-lg'>International Shipping:</span> We currently offer shipping within [list of countries]. Please check the shipping options available for your location during checkout.</p>
  
          <p><span className='font-semibold text-lg'>Delivery Issues:</span> If you encounter any issues with your delivery, please contact our customer support team, and we'll assist you in resolving the issue promptly.</p>

          <p className=' text-center py-2 font-bold text-lg'>Return and Refund Policy</p>
  
          <p>We want you to be completely satisfied with your purchase from <span className=' font-semibold font-mono'>{siteConfig.name}</span>. Here's an overview of our return and refund policy:</p>

          <p className=' text-xl'>Returns:</p>
  
          <p>You have <span className='font-semibold text-lg'>7</span> days from the date of delivery to initiate a return. Items must be in their original condition, unused, and with all original tags and packaging.</p>
  
          <p><span className='font-semibold text-lg'>Return Process:</span> To initiate a return, contact our customer support team with your order number and a brief explanation of the reason for the return. We will provide you with instructions on how to return the item.</p>

          <p className=' text-xl'>Refunds:</p>

          <p>Refunds will be issued to the original payment method once we receive and inspect the returned items. Please allow <span className='font-semibold text-lg'>4</span> business days for the refund to reflect in your account.</p>

          <p><span className='font-semibold text-lg'>Return Shipping:</span> Return shipping costs are the responsibility of the customer unless the return is due to a defect or an error on our part.</p>

          <p><span className='font-semibold text-lg'>Exchanges:</span> Currently, we do not offer direct exchanges. If you need a different item, please follow the return process and place a new order.</p>

          <p><span className='font-semibold text-lg'>Damaged or Defective Items:</span> If you receive a damaged or defective item, please contact us immediately, and we will arrange for a replacement or refund.</p>
          
          <p>At <span className=' font-semibold font-mono'>{siteConfig.name}</span>, we value your satisfaction, and our team is here to assist you with any questions or concerns regarding shipping and returns. Thank you for choosing us as your academic shopping partner!</p>
  
        </div>
      </div>
    )
  }
  
  export default page