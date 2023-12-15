import { siteConfig } from "@/config/site";

function page() {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
    return (
      <div className=' md:max-w-5xl md:container md:mx-auto min-h-screen my-auto flex justify-center items-center'>
        <div className='py-8 px-4 flex flex-col gap-4'>
  
          <h1 className=' text-xl font-semibold text-center md:text-3xl'>Privacy Policy</h1>
  
          <p className=' text-xl'>Effective Date: {formattedDate}</p>
  
          <p>At <span className=' font-semibold font-mono'>{siteConfig.name}</span> we are committed to protecting the privacy of our users. This Privacy Policy outlines the information we collect, how we use it, and the choices you have regarding your personal information. By using our website, you agree to the terms outlined in this policy.</p>

          <p className="">Information We Collect:</p>
  
          <p><span className='font-semibold text-lg'>Personal Information:</span> - We may collect personal information such as your name, email address, shipping address, and payment details when you make a purchase.</p>
  
          <p><span className='font-semibold text-lg'>Usage Data:</span> - We collect information about how you interact with our website, including pages visited, time spent on the site, and referring pages.</p>
  
          <p><span className='font-semibold text-lg'>Device Information:</span> - We may collect information about the device you use to access our website, including the device type, operating system, and browser type.</p>

          <p className="">How We Use Your Information:</p>
  
          <p><span className='font-semibold text-lg'>Order Processing:</span> - We use your personal information to process and fulfill your orders, including shipping and payment processing.</p>
  
          <p><span className='font-semibold text-lg'>Communication:</span> - We may use your email address to send order updates, promotional materials, and other relevant information. You can opt-out of promotional emails at any time.</p>
  
          <p><span className='font-semibold text-lg'>Website Improvement:</span> - We analyze usage data to improve the functionality and user experience of our website.</p>
  
          <p><span className='font-semibold text-lg'>Security:</span> - Your information is important to us, and we implement security measures to protect it from unauthorized access.</p>
  
          <p className=' text-center py-2 font-bold text-lg'>Third-Party Services:</p>
  
          <p><span className='font-semibold text-lg'>Payment Processors:</span> - We use secure third-party payment processors to handle transactions. Your payment information is encrypted and processed securely.</p>
  
          <p><span className='font-semibold text-lg'>Analytics:</span>- We may use third-party analytics services to analyze website usage patterns. These services may use cookies and similar technologies.</p>
          
          <p className=' text-center py-2 font-bold text-lg'>Your Choices:</p>
  
          <p><span className='font-semibold text-lg'>Opt-Out:</span> - You can opt-out of receiving promotional emails by following the instructions in the emails or contacting our customer support.</p>
  
          <p><span className='font-semibold text-lg'>Cookies:</span> - Most web browsers allow you to control cookies through settings. However, disabling cookies may affect the functionality of the site.</p>
        
          
          <p className=' text-center py-2 font-bold text-lg'>Information Sharing</p>
  
          <p><span className='font-semibold text-lg'>Service Providers:</span>- We may share your information with third-party service providers for order processing, shipping, and analytics.</p>
  
          <p><span className='font-semibold text-lg'>Legal Compliance:</span>- We may disclose information when required by law or to protect our rights.</p>
          
          <p>Thank you for choosing <span className=' font-semibold font-mono'>{siteConfig.name}</span>. We're excited to be part of your academic adventure and look forward to supporting you every step of the way. Happy shopping!</p>
  
          <p><span className='font-semibold text-lg'>Children's Privacy:</span> Our services are not intended for individuals under the age of *13* . We do not knowingly collect personal information from children.</p>
  
          <p><span className='font-semibold text-lg'>Changes to this Privacy Policy:</span> - We may update this Privacy Policy periodically. The effective date will indicate the most recent revisions.</p>
          
          <p><span className='font-semibold text-lg'>Contact Us:</span> - If you have any questions or concerns about this Privacy Policy, please contact us at contact{siteConfig.name}@gmail.com.</p>
          
          <p>Thank you for trusting <span className=' font-semibold font-mono'>{siteConfig.name}</span>. Your privacy is important to us, and we are dedicated to ensuring the security and confidentiality of your personal information.</p>
  
        </div>
      </div>
    )
  }
  
  export default page