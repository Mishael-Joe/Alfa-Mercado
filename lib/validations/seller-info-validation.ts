import * as z from 'zod';

export const sellerInfoValidation = z.object({
    sellerName: z.string().min(3, { message: 'Minimum 3 Characters'}).max(30),
    sellerEmail: z.string(),
    sellerPhoneNumber: z.number({
        required_error: "Required",
    }).min(11).max(11),
    sellerBusinessName: z.string().min(3, { message: 'Minimum 3 Characters'}).max(30),
    sellerProductName: z.string().min(3, { message: 'Minimum 3 Characters'}).max(30),
    sellerProductDescription: z.string().min(50, { message: 'Minimum 3 Characters'}).max(1000),
    sellerProductCategory: z.string().min(3, { message: 'Minimum 3 Characters'}).max(15),
    sellerProductPrice: z.number(),
})