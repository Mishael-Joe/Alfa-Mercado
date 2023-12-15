import { siteConfig } from "@/config/site";

function page() {
    // const currentDate = new Date().getFullYear();
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    return (
      <div className=' md:max-w-5xl md:container md:mx-auto min-h-screen my-auto flex justify-center items-center'>
        <div className='py-8 px-4 flex flex-col gap-4'>
  
          <h1 className=' text-xl font-semibold text-center md:text-3xl'>TERMS AND CONDITIONS</h1>
  
          <p className=' text-xl'>Effective Date: {formattedDate}</p>
  
          <p>Welcome to <span className=' font-semibold font-mono'>{siteConfig.name}</span> By using our website, you agree to comply with and be bound by the following Terms and Conditions. Please read these terms carefully before using our services.</p>
  
          <p><span className='font-semibold text-lg'>1. Acceptance of Terms:</span> - By accessing or using our website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.</p>
  
          <p><span className='font-semibold text-lg'>2. Use of Services:</span> - You must be at least 18 years old to use our services. By using our website, you affirm that you are at least 18 years old or have the consent of a parent or guardian.</p>
  
          <p><span className='font-semibold text-lg'>3. User Account:</span> - You may be required to create a user account to access certain features of our website. You are responsible for maintaining the confidentiality of your account information.</p>
  
          <p><span className='font-semibold text-lg'>4. Order and Payment:</span> - When you place an order on our website, you agree to provide accurate and complete information for the purchase.</p>
  
          <p><span className='font-semibold text-lg'>5. Product Information:</span> - We strive to provide accurate product information, but we do not guarantee the accuracy, completeness, or reliability of any product descriptions or other content on the site.</p>
  
          <p><span className='font-semibold text-lg'>6. Intellectual Property:</span> - All content on our website, including logos, images, and text, is the property of <span className=' font-semibold font-mono'>{siteConfig.name}</span> and is protected by intellectual property laws. You may not use, reproduce, or distribute any content without our written permission.</p>
  
          <p><span className='font-semibold text-lg'>7. Limitation of Liability:</span> - <span className=' font-semibold font-mono'>{siteConfig.name}</span> is not liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our website or products.</p>
  
          <p><span className='font-semibold text-lg'>8. Indemnification:</span> - You agree to indemnify and hold <span className=' font-semibold font-mono'>{siteConfig.name}</span> harmless from any claims, damages, or expenses arising out of your use of our services.</p>
  
          <p><span className='font-semibold text-lg'>9. Termination:</span> - We reserve the right to terminate or suspend your account and access to our services at our discretion, without prior notice.</p>
  
          <p><span className='font-semibold text-lg'>10. Governing Law:</span> - These Terms and Conditions are governed by and construed in accordance with the laws of [Your Country/State].</p>
  
          <p><span className='font-semibold text-lg'>11. Changes to Terms:</span> - We may update these Terms and Conditions from time to time. The effective date will indicate the most recent revisions. Continued use of our services after changes constitutes acceptance of the modified terms.</p>
  
          <p><span className='font-semibold text-lg'>12. Contact Us:</span> - If you have any questions or concerns about these Terms and Conditions, please contact us at contact{siteConfig.name}@gmail.com. </p>
          
          <p>Thank you for choosing <span className=' font-semibold font-mono'>{siteConfig.name}</span>. We appreciate your adherence to these terms as they contribute to a safe and enjoyable shopping experience for all users.</p>
  
        </div>
      </div>
    )
  }
  
  export default page