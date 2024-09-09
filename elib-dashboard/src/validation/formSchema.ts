import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters",
  }),
  genre: z.string().min(2, {
    message: "Genre must be at least 2 characters",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters",
  }),
  price: z.string().min(1, {
    message: "Price must be at least $1",
  }),
  coverImage: z.instanceof(FileList).refine((file) => {
    return file.length === 1;
  }, "Cover Image is Required"),
  file: z.instanceof(FileList).refine((file) => {
    return file.length === 1;
  }, "Book PDF is Required"),
});
export default formSchema;
