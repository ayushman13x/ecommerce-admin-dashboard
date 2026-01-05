import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  category: z.string().min(1, "Please select a category"),
  stock: z.coerce.number().int().nonnegative("Stock cannot be negative"),
});

export type ProductFormData = z.infer<typeof productSchema>;