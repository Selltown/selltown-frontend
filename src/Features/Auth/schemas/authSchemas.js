import { z } from "zod"

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Full name is required")
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name must be less than 50 characters")
      .regex(/^[a-zA-Z\s\-']+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),

    phone_number: z
      .string()
      .trim()
      .min(1, "Phone number is required")
      .regex(
      /^(?:024|054|053|055|059|023|020|050|026|056|027|057)\d{7}$/, 
      "Enter a valid Ghanaian number"
    ),

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be less than 64 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain an uppercase letter, lowercase letter, number, and special character"
      ),

    role: z.enum(["customer", "artisan"], {
        errorMap: () => ({ message: "Please select a valid role (Customer or Artisan)"})
    })
  })

export const artisanDetailsSchema = z.object({
  craft: z
  .string()
  .min(1, "Select your craft"),
  
  location: z.object({
    full_address: z.string(),
    name: z.string().optional(),
    city: z.string().optional(),
    region: z.string().optional(),
    place_id: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  })
  .nullable()
  .refine((value) => value !== null, {
    message: "Location is required"
  } )
})

export const loginSchema = z.object({
    phone_number: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(
      /^(?:024|054|053|055|059|023|020|050|026|056|027|057)\d{7}$/, 
      "Enter a valid Ghanaian number"
    ),
  
      password: z
      .string()
      .min(1, "Password is required")
})

// export const forgotPasswordSchema = z.object({
//     phone_number: z.
//     string()
//     .trim()
//     .min(1, "Phone number is required")
//     .regex(
//         /^(?:024|054|053|055|059|023|020|050|026|056|027|057)\d{7}$/, 
//         "Enter a valid Ghanaian number"    
//     )
// })  


// export const otpSchema = z.object({
//   otp: z
//   .string()
//   .length(6, "Code must be exactly 6 digits")
//   .regex(/^\d{6}$/, "Code must contain digits only")
// })

// export const setPasswordSchema = z.object({
//     password: z
//       .string()
//       .min(1, "Password is required")
//       .min(8, "Password must be at least 8 characters")
//       .max(64, "Password must be less than 64 characters")
//       .regex(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//         "Password must contain an uppercase letter, lowercase letter, number, and special character"
//       ),
//     confirmPassword: z
//     .string()
//     .min(1, "Please confirm your password")
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// })