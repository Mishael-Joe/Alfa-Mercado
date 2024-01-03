import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <section className="bg-green-50 dark:bg-gray-900">
            <div className="flex justify-center min-h-screen">
                <div className="hidden bg-cover lg:block lg:w-2/5 bg-[url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')]" >
                </div>

                <div className="flex items-center justify-center w-full max-w-3xl p- mx-auto lg:px-12 lg:w-3/5">
                    <div className="w-full flex items-center justify-center flex-col">
                        <h1 className="text-2xl font-semibold tracking-wider text-gray-800 py-5 capitalize dark:text-white">
                            WELCOME TO <span className="text-green-500">ALFA-MERCADO</span>
                        </h1>

                        <SignUp />
                    </div>
                </div>
            </div>
        </section>
  );
}