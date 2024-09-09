import { z } from "zod";

const formSchema = z.object({
  title: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 2, {
      message: "Title must be at least 2 characters if entered",
    }),
  genre: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 2, {
      message: "Genre must be at least 2 characters if entered",
    }),
  description: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 2, {
      message: "Description must be at least 2 characters if entered",
    }),
  price: z
    .string()
    .optional()
    .refine((val) => Number(val) >= 0, {
      message: "Price must be a positive number",
    }),
  coverImage: z
    .instanceof(FileList)
    .optional()
    .refine((file) => (file as FileList).length === 0 || (file as FileList).length === 1, {
      message: "Cover Image is required if selected",
    }),
  file: z
      .instanceof(FileList)
      .optional()
      .refine((file) => (file as FileList).length === 0 || (file as FileList).length === 1, {
        message: "Book PDF is required if selected",
      }),
});

export default formSchema;
