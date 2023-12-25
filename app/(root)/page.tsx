// "use client"

// import { useState, useEffect } from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';

// import HeadBanner from '@/components/banner'
// import { cn } from "@/lib/utils"
// import { client } from "@/sanity/lib/client";
// import { groq } from "next-sanity"
// import { Loader2 } from "lucide-react";

// import { ProductFilters } from "@/components/product-filters"
// import { ProductGrid } from "@/components/product-grid"
// import { ProductSort } from "@/components/product-sort"
// import FirstTimeVisitor from '@/utils/FirstTimeVisitor/page';

// // import HeroBanner from '@/components/banner';
// // import HeroBanner from '@/components/_hero/page';


// interface Props {
//   searchParams: {
//     date?: string;
//     price?: string;
//     color?: string;
//     category?: string;
//     size?: string;
//     search?: string;
//   };
// }

// const PER_PAGE = 6; // Adjust as needed

// export default function Home({ searchParams }: Props) {
//   // console.log('searchParams:', searchParams);

//   const [products, setProducts] = useState<any>([]);
//   const [isBannner, setIsBannner] = useState<any>([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(1);
//   const [skeleton, setSkeleton] = useState(true);

//   const fetchBanner = async () => {
//     console.log('searchParams:', searchParams);
//     try {
//       const banner = '*[_type == "banner"]';
//       const banners = await client.fetch(banner)

//       if (banners.length === 0) {
//         setHasMore(false);
//       } else {
//         setIsBannner([...banners]);
//       }
//     } catch (error) {
//       console.error('Error while fetching banner:', error);
//     }
//   }

//   const fetchMoreData = async () => {
    
//     try {
//       const start = (page - 1) * PER_PAGE;
//       const { color, category, size, search } = searchParams;
//       const { date = 'desc', price } = searchParams; //we make use of object distructuring here with a default date set to descending
//       const priceOrder = price ? `| order(price ${price})` : ''
//       const dateOrder = date ? `| order(_createdAt ${date})` : ''

//       // const priceOrder = searchParams.price ?  `| order(price ${searchParams.price})` : ''  // we are not using object destructuring here
//       // const dateOrder = searchParams.date ? `| order(_createdAt ${searchParams.date})` : ''  // we are not using object destructuring here

//       const order = `${priceOrder} ${dateOrder}`

//       const productFilter = `(_type == "fashion" || _type == "body-care-product" || _type == "phone-accessories" || _type == "school-supplies")`
//       const categoryFilter = category ? `&& "${category}" in categories` : ``
//       const colorFilter = color ? `&& "${color}" in colors` : ``
//       const sizeFilter = size ? `&& "${size}" in sizes` : ``
//       const searchFilter = search ? `&& [name, categories] match "${search}**"` : ``

//       const filter = `*[${productFilter}${categoryFilter}${colorFilter}${sizeFilter}${searchFilter}]`

      
//       const product = groq `${filter} ${order} {
//         _id,
//         _type,
//         name,
//         currency,
//         sku,
//         price,
//         images,
//         description,
//         _createdAt,
//         "slug": slug.current
//       }`;
      
//       const response = await client.fetch(product); // Your query here

//       const newProducts = response.slice(start, start + PER_PAGE);

//       if (newProducts.length === 0) {
//         setHasMore(false);
//       } else {
//         setProducts([...products, ...newProducts]);
//         setPage(page + 1);
//       }

//       // console.log('banners', banners)
//     } catch (error) {
//       console.error('Error fetching more data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchBanner();
//   }, []); // Fetch initial data on component mount
  
//   // console.log('searchParams:', searchParams);
//   useEffect(() => {
//     fetchMoreData();
//   }, [searchParams]); // Fetch initial data on component mount

//   // console.log('Products', products)
  
//   useEffect(() => {
//     setTimeout(() => {setSkeleton(false)}, 2000)
//   }, []);

//   return (
//     <main className="min-h-screen px-5 md:px-4 py-4">
//       <FirstTimeVisitor />
//       {isBannner[0] && <HeadBanner heroBanner={isBannner && isBannner[0]}/>}

//       <section>
//         <div>
//           <section className="mx-auto max-w-7xl px-6">
//             <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-24 dark:border-gray-800">
//               <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
//                 {products.length} result{products.length === 1 ? '' : 's'}
//               </h1>
//               {/* Product Sort */}
//               <ProductSort />
//             </div>

//             <div aria-labelledby="products-heading" className="pb-24 pt-6">
//               {skeleton ? (
//                 <div className={cn("grid grid-cols-1 gap-x-8 gap-y-10", !skeleton ? 'lg:grid-cols-4' : 'lg:grid-cols-[1fr_3fr]')}>
//                 <div className="hidden lg:block">
//                   {/* Product filters */}
//                   <ProductFilters />
//                 </div>
                
//                   <div className="container mx-auto animate-pulse">
//                     <div className="grid grid-cols-1 gap-8 sm:gap-6 xl:mt-8 xl:gap-12 sm:grid-cols-2 lg:grid-cols-3">
//                       <div className="w-full ">
//                         <div className="w-full h-64 bg-gray-300 rounded-lg md:h-72 dark:bg-gray-600"></div>

//                         <h1 className=" w-40 sm:w-56 h-4 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
//                         <p className="w-24 h-3 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
//                       </div>

//                       <div className="w-full ">
//                         <div className="w-full h-64 bg-gray-300 rounded-lg md:h-72 dark:bg-gray-600"></div>

//                         <h1 className=" w-40 sm:w-56 h-4 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
//                         <p className="w-24 h-3 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
//                       </div>

//                       <div className="w-full ">
//                         <div className="w-full h-64 bg-gray-300 rounded-lg md:h-72 dark:bg-gray-600"></div>

//                         <h1 className=" w-40 sm:w-56 h-4 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
//                         <p className="w-24 h-3 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
//                       </div>
//                     </div>
//                   </div>
//               </div>
//               ) : (
//                 <InfiniteScroll
//                   dataLength={products.length}
//                   next={fetchMoreData}
//                   hasMore={hasMore}
//                   loader={<h4 className='flex items-center justify-center pt-10'><div className='flex items-center gap-6'><Loader2 className="h-4 w-4 animate-spin" />Loading...</div></h4>}
//                   endMessage={
//                     <p className='text-center pt-10'></p>
//                   }
//                 >
//                   {/* Product grid */}
//                   <div className={cn("grid grid-cols-1 gap-x-8 gap-y-10", products.length > 0 ? 'lg:grid-cols-4' : 'lg:grid-cols-[1fr_3fr]')}>
//                     <div className="hidden lg:block">
//                       {/* Product filters */}
//                       <ProductFilters />
//                     </div>

//                     {/* Product grid */}
//                     <ProductGrid products={products} />
//                   </div>
//                 </InfiniteScroll>
//               )}
//             </div>
              
//           </section>
//         </div>

        

//       </section>
//     </main>
//   );
// }



import HeadBanner from '@/components/banner'
import { cn } from "@/lib/utils"
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity"
// import dynamic from 'next/dynamic'

import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/product-sort"

interface Props {
  searchParams: {
    date?: string,
    price?: string,
    color?: string,
    category?: string,
    size?: string,
    search?: string
  }
}


export default async function Home({ searchParams }: Props) {
  const { color, category, size, search } = searchParams;
  const { date = 'desc', price } = searchParams; //we make use of object distructuring here with a default date set to descending
  const priceOrder = price ? `price ${price},` : '';
  const dateOrder = date ? `_createdAt ${date},` : '';

  const order = `${priceOrder} ${dateOrder}`.slice(0, -1); // Remove the trailing comma

  const productFilter = `(_type == "fashion" || _type == "body-care-product" || _type == "phone-accessories" || _type == "school-supplies")`;
  const categoryFilter = category ? `&& "${category}" in categories` : ``;
  const colorFilter = color ? `&& "${color}" in colors` : ``;
  const sizeFilter = size ? `&& "${size}" in sizes` : ``;
  const searchFilter = search ? `&& [name, categories] match "${search}**"` : ``;

  const filter = `*[${productFilter}${categoryFilter}${colorFilter}${sizeFilter}${searchFilter}]`;

  const banner = '*[_type == "banner"]';
  const product = groq`${filter} | order(${order}) {
    _id,
    name,
    price,
    images,
    _createdAt,
    "slug": slug.current
  }`;

  const banners = await client.fetch(banner);
  const products = await client.fetch(product);

  console.log(products[0]);
 
  return (
    <main className="min-h-screen px-5 md:px-4 py-4">
      <HeadBanner heroBanner={banners && banners[0]}/>

      <section>
        <div>
          <section className="mx-auto max-w-7xl px-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-24 dark:border-gray-800">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                {products.length} result{products.length === 1 ? '' : 's'}
              </h1>
              {/* Product Sort */}
              <ProductSort />
            </div>

            <div aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className={cn("grid grid-cols-1 gap-x-8 gap-y-10", product.length > 0 ? 'lg:grid-cols-4' : 'lg:grid-cols-[1fr_3fr]')}>

                <div className="hidden lg:block">
                  {/* Product filters */} 
                  <ProductFilters /> 
                </div>

                {/* Product grid */}
                <ProductGrid products={products} />
              </div>
            </div>
            
          </section>
        </div>

      </section>
    </main>
  )
}


