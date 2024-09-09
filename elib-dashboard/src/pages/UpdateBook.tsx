import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CircleX, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBooksById, updateBookById } from "@/http/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import formSchema from "@/validation/updatedFormSchema";

const UpdateBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: book, isLoading } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => getBooksById(bookId!),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: book?.title || "", // Default values from the fetched book
      genre: book?.genre || "",
      description: book?.description || "",
      price: book?.price || "",
    },
    // Update form when the book data is fetched
    values: {
      title: book?.title || "",
      genre: book?.genre || "",
      description: book?.description || "",
      price: book?.price || "",
    },
  });

  const coverImageRef = form.register("coverImage");
  const fileRef = form.register("file");

  const mutation = useMutation({
    mutationFn: (updatedData: FormData) => updateBookById(bookId!, updatedData),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["books"]);
      await queryClient.refetchQueries(["books"]);
      console.log("Book Updated Successfully");
      navigate("/dashboard/books");
    },
    onError: (error) => {
      console.error("Error updating book:", error);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    //  Only append values if the user has entered something new, otherwise keep previous data
    if (values.title && values.title !== book?.title) {
      formData.append("title", values.title);
    } else {
      formData.append("title", book?.title || "");
    }

    if (values.genre && values.genre !== book?.genre) {
      formData.append("genre", values.genre);
    } else {
      formData.append("genre", book?.genre || "");
    }

    if (values.description && values.description !== book?.description) {
      formData.append("description", values.description);
    } else {
      formData.append("description", book?.description || "");
    }

    if (values.price && values.price !== book?.price) {
      formData.append("price", values.price);
    } else {
      formData.append("price", book?.price || "");
    }

    if (values.coverImage?.[0]) {
      formData.append("coverImage", values.coverImage[0]);
    }

    if (values.file?.[0]) {
      formData.append("file", values.file[0]);
    }

    mutation.mutate(formData);
  }

  if (isLoading) {
    return <div>Loading book details...</div>;
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/books">Books</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Edit</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center gap-7">
              <Link to={"/dashboard/books"}>
                <Button variant={"destructive"}>
                  <span className="ml-2">Cancel</span>
                </Button>
              </Link>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && (
                  <LoaderCircle className="animate-spin" />
                )}
                <span className="ml-2">Update</span>
              </Button>
            </div>
          </div>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Edit Book</CardTitle>
              <CardDescription>
                Update the details of the book below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input type="text" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <FormControl>
                        <Input type="text" className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea className="w-full min-h-32" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={() => (
                    <FormItem>
                      <FormLabel>Upload New Cover Image</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          type="file"
                          {...coverImageRef}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="file"
                  render={() => (
                    <FormItem>
                      <FormLabel>Upload New Book PDF</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          type="file"
                          accept="application/pdf"
                          {...fileRef}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default UpdateBook;
