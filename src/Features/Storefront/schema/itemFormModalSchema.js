import { z } from "zod";

export const itemSchema = z.object({
  name: z.string().min(2, "Item name must be at least 2 characters"),
  price: z.coerce.number().positive("Enter a price greater than 0"),
  description: z.string().min(10, "Add a short description (at least 10 characters)"),
  status: z.string().min(1, "Please select a status"),
});