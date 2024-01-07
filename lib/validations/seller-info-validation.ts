import * as z from 'zod';

export const sellerInfoValidation = z.object({
    sellerName: z.string().min(3, { message: 'Minimum 3 Characters'}).max(30),
    sellerEmail: z.string(),
    sellerPhoneNumber: z.string({
        required_error: "Required",
    }).min(11).max(14),
    businessName: z.string().min(3, { message: 'Minimum 3 Characters'}).max(30),
    productName: z.string().min(3, { message: 'Minimum 3 Characters'}).max(30),
    productDescription: z.string().min(50, { message: 'Minimum 50 Characters'}).max(1000),
    productCategory: z.string().min(3, { message: 'Minimum 3 Characters'}).max(15),
    productPrice: z.coerce.number().positive(),
    qualitiesAvailable: z.coerce.number().positive().min(10, { message: 'Quality cann\'t be less then 10'})
})