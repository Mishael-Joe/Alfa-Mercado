import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity"

import { ProductGallery } from "@/components/product-gallery"
import { ProductInfo } from "@/components/product-info"
import { ProductSpecification } from "@/components/product-specification"; 

interface Props {
  params: {
    slug: string,
  }
}

export default async function Page({ params }: Props) {
  const product = await client.fetch(groq `*[(_type == "fashion" || _type == "body-care-product" || _type == "phone-accessories" || _type == "school-supplies") && slug.current == "${params.slug}"][0] {
    _id,
    _createdAt,
    "id": _id,
    _type,
    name,
    sku,
    images,
    price,
    currency,
    description,
    specifications,
    company,
    sizes,
    categories,
    colors,
    "slug": slug.current
  }`)
  // console.log('Product', product)


  return (
    <main className="mx-auto max-w-6xl sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-3xl lg:max-w-none">
        {/* Product */}
        <div className="pb-20 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
          {/* Product gallery */}
          <ProductGallery product={product} />
          {/* Product info */}
          <ProductInfo product={product} />
        </div>

        {/* Product Specification */}
        <ProductSpecification product={product} />
      </div>
    </main>
  )
}
