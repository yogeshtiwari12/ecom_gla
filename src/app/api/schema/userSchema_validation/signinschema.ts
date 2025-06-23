import * as z from "zod";

export const signInSchema  = z.object({

    name:z.
    string()
    .min(1, "Name is required"),

    email:z.string()
    .email("Invalid email address")
    .min(1, "Email is required"),
    
    
    password:z.string() 
    .min(8, "Password must be at least 6 characters long")
})