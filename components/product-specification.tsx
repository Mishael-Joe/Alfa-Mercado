
export function ProductSpecification({ product }: any) {
    // console.log('product.specifications.length',product)
    if (product.specifications === null) return;

    return (
        <div className="mb-10 rounded-lg border-2 border-gray-200 bg-gray-100 px-4 py-6 shadow dark:border-gray-900 dark:bg-black sm:p-6 lg:p-8">
            <h2 className="text-lg font-medium pb-3">
                Specifications:
            </h2>

            <div className=" border p-4 rounded-md shadow-2xl">
                <ul className="py-3 list-inside" >
                    {product.specifications.map((specification: any, i: number) => (
                        <li className="list-disc" key={i}>{specification}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
