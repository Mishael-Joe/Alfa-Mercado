import HeadBanner from '@/components/banner'
import { cn } from "@/lib/utils"
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity"
// import dynamic from 'next/dynamic'

import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/product-sort"
// const ComponentC = dynamic(() => import('../components/C'), { ssr: false })

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
  const { color, category, size, search } = searchParams
  // const { date = 'desc', price } = searchParams; //we make use of object distructuring here with a default date set to descending
  // const priceOrder = price ? `| order(price ${price})` : ''
  // const dateOrder = date ? `| order(_createdAt ${date})` : ''

  const priceOrder = searchParams.price ?  `| order(price ${searchParams.price})` : ''  // we are not using object destructuring here
  const dateOrder = searchParams.date ? `| order(_createdAt ${searchParams.date})` : ''  // we are not using object destructuring here

  const order = `${priceOrder} ${dateOrder}`

  const productFilter = `_type == "product"`
  const categoryFilter = category ? `&& "${category}" in categories` : ``
  const colorFilter = color ? `&& "${color}" in colors` : ``
  const sizeFilter = size ? `&& "${size}" in sizes` : ``
  const searchFilter = search ? `&& [name, categories] match "${search}**"` : ``

  const filter = `*[${productFilter}${categoryFilter}${colorFilter}${sizeFilter}${searchFilter}]`

  const banner = '*[_type == "banner"]';
  const product = groq `${filter} ${order} {
    _id,
    name,
    currency,
    sku,
    price,
    images,
    description,
    _createdAt,
    "slug": slug.current
  }`;

  const banners = await client.fetch(banner)
  const products = await client.fetch(product)

  // console.log(searchParams)
 
  return (
    <main className="min-h-screen px-5 md:px-4 py-4">
      {/* <HeadBanner heroBanner={banners && banners[0]}/> */}

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