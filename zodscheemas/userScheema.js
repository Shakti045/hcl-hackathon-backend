import { z } from 'zod';

export const UserSchema = {
    body: z.object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        email: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    }),
    query: z.object({
        referralCode: z.string().optional(),
    }),
    params: z.object({
        userId: z.string().uuid("Invalid user ID format"),
    })
};

export const queerySchema = z.object({fromBic:z.string("Source Bic Is Required"),srcBic:z.string("Destination Bic Is Required")});
