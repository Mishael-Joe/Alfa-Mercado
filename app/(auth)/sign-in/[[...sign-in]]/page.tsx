import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <section className="">
        <div className="">
            <div className="flex justify-center h-screen">
                <div className="hidden bg-cover md:block md:w-2/4 bg-[url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)]">
                    <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                        <div>
                        <h2 className="text-4xl text-slate-100 font-bold sm:text-3xl">ALFA-MERCADO</h2>

                        <p className="max-w-xl mt-3 text-gray-300">
                            Unique Online Store | Spend Less. Smile More
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                <SignIn />
                </div>
            </div>
        </div>
    </section>);
}