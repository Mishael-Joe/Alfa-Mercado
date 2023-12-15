"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { siteConfig } from "@/config/site"

const FirstTimeVisitor = () => {
    // State to track if the user is a first-time visitor
    const [isFirstTimeVisitor, setIsFirstTimeVisitor] = useState(true);
    // State to control if the sign-up prompt should be shown
    const [showSignUpPrompt, setShowSignUpPrompt] = useState(false);
    const [ischecked, setIschecked] = useState(false);
  
    useEffect(() => {
      // Check if the user is a first-time visitor by checking if their
      // browser cookie has the "first_time_visitor" key.
      const isFirstTimeVisitorCookie = localStorage.getItem('first_time_visitor');
      if (isFirstTimeVisitorCookie === null) {
        //setIsFirstTimeVisitor(false);
        localStorage.setItem('first_time_visitor', 'true');
      } else {
        setIsFirstTimeVisitor(true);
      }
  
      // Set a timer to show the sign-up prompt after 5 seconds
      const timer = setTimeout(() => {
        setShowSignUpPrompt(isFirstTimeVisitor);
      }, 5000);
  
      // Clear the timer if the component unmounts or if isFirstTimeVisitor changes
      return () => clearTimeout(timer);
    }, [isFirstTimeVisitor]);
  
    const handleSignUp = () => {
      // Handle the sign-up logic here
      // Redirect or show the sign-up page/component
      // For now, we'll just hide the sign-up prompt
      setShowSignUpPrompt(false);
    };
  
    const handleClose = () => {
      setShowSignUpPrompt(false);
      // Additional logic to handle closing the FirstTimeVisitor component
      // For example, you can set a flag in localStorage to prevent it from appearing again on subsequent visits
      localStorage.setItem('hide_first_time_visitor', 'true');
    };
  
    if (showSignUpPrompt) {
      // Render the sign-up prompt if showSignUpPrompt is true
      return (
        <Dialog open={showSignUpPrompt}>

          <DialogContent className="sm:max-w-md">

            <DialogHeader>
              <DialogTitle>{siteConfig.name}</DialogTitle>
              <DialogDescription>
                We have recently updated our terms and conditions. By continuing to use this site, you are agreeing to the new terms. 
                Please review the updated <span className=" font-bold text-blue-600 underline"> <Link href={'/T&C'} className="text-blue-600 underline italic">Terms and Conditions</Link> </span> to ensure you understand the changes.
              </DialogDescription>
            </DialogHeader>

            <div className="">
              <div className="flex flex-row gap-4">
            
                <Checkbox 
                  id="terms" 
                  onClick={() => setIschecked((value) => !value)}
                  checked={ischecked} 
                />
                
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>
              
            </div>

            <DialogFooter className="sm:justify-start">
              <DialogClose onClick={() => setShowSignUpPrompt(false)} asChild>
                <Button type="button" variant="default" disabled={!ischecked}>
                  Continue
                </Button>
              </DialogClose>
            </DialogFooter>
            
          </DialogContent>
          
        </Dialog>   
      );
    }
  
    // Return null if showSignUpPrompt is false
    return null;
  };

export default FirstTimeVisitor


// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"

// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form"
// import { Switch } from "@/components/ui/switch"
// import { toast } from "@/components/ui/use-toast"

// const FormSchema = z.object({
//   marketing_emails: z.boolean().default(false).optional(),
//   security_emails: z.boolean(),
// })

// export function SwitchForm() {
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       security_emails: true,
//     },
//   })

//   function onSubmit(data: z.infer<typeof FormSchema>) {
//     toast({
//       title: "You submitted the following values:",
//       description: (
//         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//         </pre>
//       ),
//     })
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
//         <div>
//           <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
//           <div className="space-y-4">
            
//             <FormField
//               control={form.control}
//               name="marketing_emails"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                   <div className="space-y-0.5">
//                     <FormLabel className="text-base">
//                       Marketing emails
//                     </FormLabel>
//                     <FormDescription>
//                       Receive emails about new products, features, and more.
//                     </FormDescription>
//                   </div>
                  
//                   <FormControl>
//                     <Switch
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="security_emails"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                   <div className="space-y-0.5">
//                     <FormLabel className="text-base">Security emails</FormLabel>
//                     <FormDescription>
//                       Receive emails about your account security.
//                     </FormDescription>
//                   </div>
//                   <FormControl>
//                     <Switch
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                       disabled
//                       aria-readonly
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//           </div>
//         </div>
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   )
// }
