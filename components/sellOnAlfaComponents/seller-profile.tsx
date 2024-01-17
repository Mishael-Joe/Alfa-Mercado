"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
  FormDescription
} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { redirect } from "next/navigation";
import { sellerInfoValidation } from "@/lib/validations/seller-info-validation";
import { useToast } from "@/components/ui/use-toast";
import { CheckCheck, Loader } from "lucide-react";

function AboutSellerAndProduct() {
    const [showInfo, setShowInfo] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const { toast } = useToast();
    const { isSignedIn, user } = useUser();
    if (!isSignedIn) redirect('/sign-in');
    // if (isSignedIn) console.log(user);

    const sellerFullName = user.fullName ? user.fullName : '';
    const sellerPrimaryEmailAddress = user.primaryEmailAddress?.emailAddress ? user.primaryEmailAddress?.emailAddress : '';
    const sellerPrimaryPhoneNumber = user.phoneNumbers[0].phoneNumber ? user.phoneNumbers[0].phoneNumber : '';

    const form = useForm<z.infer<typeof sellerInfoValidation>>({
        resolver: zodResolver(sellerInfoValidation),
        defaultValues: {
            sellerName: sellerFullName,
            sellerEmail: sellerPrimaryEmailAddress,
            sellerPhoneNumber: sellerPrimaryPhoneNumber,
        },
    });

    

    async function onSubmit(values: z.infer<typeof sellerInfoValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // console.log(values)
        setisLoading(val => !val)
        const sellerParams = {
            seller: values.sellerName,
            email: values.sellerEmail,
            phoneNumber: values.sellerPhoneNumber,
            businessName: values.businessName,
            productName: values.productName,
            productDescription: values.productDescription,
            productCategory: values.productCategory,
            productPrice: values.productPrice,
            qualitiesAvailable: values.qualitiesAvailable,
        }

        try {
            const response = await fetch('/api/sellerInfo', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(sellerParams),
            });
            
            const res = response;
            // console.log(res.status);

            if (res.status === 200) {
                setisLoading(val => !val)
                toast({
                    title: `Successfull`,
                    description: `Message sent Successfully`,
                });
                
                toast({
                    title: `Further Instructions.`,
                    description: `To complete this process, Please check your email for further instructions`,
                });

                setShowInfo(val => !val);
            } else {
                toast({
                    title: `Failed`,
                    description: `An error occurred. Please try again. `,
                });
                setisLoading(val => !val)
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
        
    }

    return (
        <section className="max-w-3xl mx-auto my-5 px-6 h-full">
            {!showInfo ? (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">

                {/* seller Name */}
                    <FormField
                    control={form.control}
                    name="sellerName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                                <Input type='text' placeholder="Joe Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    {/* seller Email */}
                    <FormField
                    control={form.control}
                    name="sellerEmail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your E-mail</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="joesmith35@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    {/* seller Phone Number */}
                    <FormField
                    control={form.control}
                    name="sellerPhoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Phone Number</FormLabel>
                            <FormControl>
                                <Input type='text' placeholder="090******35" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    {/* Business Name */}
                    <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Business Name</FormLabel>
                            <FormControl>
                                <Input type='text' placeholder="Your Company or Organization's Business Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    {/* Product Name */}
                    <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input type='text' placeholder="Product Name..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    {/* Product description */}
                    <FormField
                    control={form.control}
                    name="productDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Description</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder="Product Description..."
                                rows={10}
                                {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Brief Description of Your Product.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    {/* Product Category  */}
                    <FormField
                    control={form.control}
                    name="productCategory"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Category</FormLabel>

                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Product Category" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    <SelectItem value="School Supplies">School Supplies</SelectItem>
                                    <SelectItem value="Fashion">Fashion</SelectItem>
                                    <SelectItem value="Body Care Products">Body Care Products</SelectItem>
                                    <SelectItem value="Phone Accessories">Phones Accessories</SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    {/* Product Price */}
                    <FormField
                    control={form.control}
                    name="productPrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Price</FormLabel>
                            <FormControl>
                                <Input {...field} type="number"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    {/* Qualities Available */}
                    <FormField
                    control={form.control}
                    name="qualitiesAvailable"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantities Available</FormLabel>
                            <FormControl>
                                <Input {...field} type="number"/>
                            </FormControl>
                            <FormDescription>
                                This Shouldn't be less than 10.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    
                    <Button type="submit" className="items-end w-full bg-purple-500 hover:bg-purple-600">
                        {!isLoading && 'Submit'}
                        {isLoading && <Loader className=" animate-spin w-5 h-5 mr-4"/>} {isLoading && 'Please wait...'}
                    </Button>
                </form>
            </Form>
            ) : (
                <div className="flex items-center flex-col">
                <CheckCheck className="h-28 w-28 text-green-500 my-5"/>
                <div className="border rounded-md py-4 px-6">
                    <p>
                        Thank you for considering a partnership with Alfa-Mercado. We appreciate your interest, 
                        and our team will review your proposal promptly. If we find that there is a potential for collaboration, 
                        we will reach out to you to discuss further details.
                    </p>
                    
                    <p className="pt-4">
                        Further Instructions:
                    </p>

                    <p className="pt-2">
                        Please ensure to check your E-mail and follow the instructions carefully.
                    </p>
                </div>
                </div>
            )}
        </section>
    )
}

export default AboutSellerAndProduct