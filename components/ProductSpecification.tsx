
export function ProductSpecification({ product }: any) {
    // console.log('product.specifications.length',product)
    if (product.specifications.length === 0) return;

    return (
        <div className="mb-10 rounded-lg border-2 border-gray-200 bg-gray-100 px-4 py-6 shadow dark:border-gray-900 dark:bg-black sm:p-6 lg:p-8">
            <h2 className="text-lg font-medium pb-3">
                Specifications:
            </h2>

            <div className=" border p-4 rounded-md shadow-2xl">
                {product.specifications.map((specification: any) => (
                    <ul className="py-3 list-inside">
                        <li className="list-disc">{specification}</li>
                    </ul>
                ))}
            </div>
        </div>
    )
}
