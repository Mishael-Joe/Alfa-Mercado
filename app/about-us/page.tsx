import { siteConfig } from "@/config/site"

function page() {
    return (
      <div className=' md:max-w-5xl md:container md:mx-auto min-h-screen my-auto flex justify-center items-center'>
        <div className='py-8 px-4 flex flex-col gap-4'>
  
          <h1 className=' text-xl font-semibold text-center md:text-3xl'>ABOUT US</h1>
  
          <p className=' text-center '>Your Student-Centric Online Hub</p>
  
          <p>Welcome to <span className=' font-semibold font-mono'>{siteConfig.name}</span> , where student life meets convenience and empowerment! 
          <p>We understand the challenges and demands of student life, and that's why we've curated a unique online shopping experience tailored just for you.</p>
          </p>
  
          <p><span className='font-semibold text-lg'>Empowering Your Academic Journey:</span> At <span className=' font-semibold font-mono'>{siteConfig.name}</span>, our mission is to empower students on their academic journey. Whether you're diving into the world of textbooks, seeking the latest tech gadgets, or enhancing your study environment, we've got you covered. We believe that the right tools can make a significant difference in your educational experience.</p>
  
          <p><span className='font-semibold text-lg'>A Campus Store at Your Fingertips:</span> Consider us your virtual campus store, offering a wide range of products and services carefully selected to meet the diverse needs of students. From affordable laptops and essential stationery to textbooks and study aids, we aim to be your go-to resource for all things academic.</p>
  
          <p><span className='font-semibold text-lg'>Beyond the Classroom:</span> We go beyond the classroom essentials, recognizing that student life extends to various facets. Need a break from studies? Explore our comfort and relaxation section, featuring items designed to create a stress-free zone in your busy schedule. Looking for a quick bite during those long study sessions? Check out our meal plans and snack boxes.</p>
  
          <p><span className='font-semibold text-lg'>Unlocking Opportunities:</span> <span className=' font-semibold font-mono'>{siteConfig.name}</span>, isn't just about products; it's about unlocking opportunities. Dive into our online courses and tutoring services to enhance your learning experience. Discover exclusive student discounts and memberships that add value to your purchases.</p>
  
          <p><span className='font-semibold text-lg'>Supporting Your Journey:</span> We understand that student life isn't just about academics. That's why we offer services like job search and resume assistance, career counseling, and fitness packages. <span className=' font-semibold font-mono'>{siteConfig.name}</span> is your partner in the holistic student experience, supporting you in various aspects of your personal and academic growth.</p>
  
          <p className=' text-center py-2 font-bold text-lg'>*Why Choose Us?*</p>
  
          <p><span className='font-semibold text-lg'>Student-Centric Approach:</span> Every product and service is chosen with the student in mind, aiming to simplify and enhance the student experience.</p>
  
          <p><span className='font-semibold text-lg'>Quality and Affordability:</span> We believe in providing high-quality products at affordable prices, making education more accessible to everyone.</p>
  
          <p><span className='font-semibold text-lg'>Convenience at Your Fingertips:</span> With just a click, you can access a variety of products and services tailored to your needs, saving you time and effort.</p>
  
          <p><span className='font-semibold text-lg'>Empowering Student Success:</span> Our commitment is to contribute to your success by offering tools and resources that empower you throughout your academic journey.</p>
          
          <p>Thank you for choosing <span className=' font-semibold font-mono'>{siteConfig.name}</span>. We're excited to be part of your academic adventure and look forward to supporting you every step of the way. Happy shopping!</p>
  
        </div>
      </div>
    )
  }
  
  export default page