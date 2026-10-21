import { z } from "zod"

export const filtermodalSchema = z.object({
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
  })
})