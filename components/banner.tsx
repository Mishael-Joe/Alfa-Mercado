
// import { useState, useEffect } from 'react';
// import { client } from "@/sanity/lib/client"
// import Image from 'next/image';
// import { urlForImage } from '@/sanity/lib/image';


// async function HeroBanner() {
//   // const [bannerData, setBannerData] = useState<any>([])

//   // const fetchBanner = async () => {
//   //   try {
//   //     const banner = '*[_type == "banner"]';
//   //     const banners = await client.fetch(banner)

//   //     if (banners) {
//   //       setBannerData([...banners])
//   //     }
//   //   } catch (error) {
//   //     console.error('Error while fetching banner:', error);
//   //   }
//   // }

//   // useEffect(() => {
//   //   fetchBanner();
//   // }, []);
//   // console.log('Banner:', banners[0].image);

//   const banner = '*[_type == "banner"]';
//   const banners = await client.fetch(banner)
//   return (
//       <section className='mx-auto max-w-6xl'>
          
//           <div className='relative'>
//             <p className=' py-2 left-3 md:text-4xl sm:text-xl absolute text-slate-100'>{banners[0] && banners[0].smallText}</p>
  
//             <div>
//               <Image src={banners[0] && urlForImage(banners[0].image).url()} width={400} height={200} priority alt='' className='object-cover w-[100%] h-[50%] rounded-lg'/>
//             </div>
  
//               <p className=' text-[3rem] sm:text-[6rem] md:text-[10rem] absolute left-3 top-10 text-slate-100'>{banners[0] && banners[0].largeText2}</p>
//               <p className=' md:text-4xl bottom-2 right-4 absolute text-slate-100'>{banners[0] && banners[0].buttonText}</p>
//               <p className=' md:text-4xl sm:top-[10rem] sm:text-2xl absolute top-[7rem] md:top-[15rem] left-3 text-slate-100'>{banners[0] && banners[0].desc}</p>
//           </div>
//       </section>
//   )
// }

// export default HeroBanner

import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'

function HeadBanner({ heroBanner }: any) {
  return (
    <section className='mx-auto max-w-6xl'>
        
        <div className='relative'>
          <p className=' py-2 left-3 md:text-4xl sm:text-xl absolute text-slate-100'>{heroBanner.smallText}</p>

          <div>
            <Image src={urlForImage(heroBanner.image).url()} width={400} height={200} priority alt='' className='object-cover w-[100%] h-[50%] rounded-lg'/>
          </div>

            <p className=' text-[3rem] sm:text-[6rem] md:text-[10rem] absolute left-3 top-10 text-slate-100'>{heroBanner.largeText2}</p>
            <p className=' md:text-4xl bottom-2 right-4 absolute text-slate-100'>{heroBanner.buttonText}</p>
            <p className=' md:text-4xl sm:top-[10rem] sm:text-2xl absolute top-[7rem] md:top-[15rem] left-3 text-slate-100'>{heroBanner.desc}</p>
        </div>
    </section>
  )
}

export default HeadBanner