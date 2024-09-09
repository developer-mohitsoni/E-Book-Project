import { Badge } from "@/components/ui/badge";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteBookById, getBooks } from "@/http/api";
import { Book } from "@/types";
import copyToClipboard from "@/utils/CopyClipboard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CirclePlus, LoaderCircle, MoreHorizontal } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const BooksPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  const deleteMutation = useMutation({
    mutationFn: (bookId: string) => deleteBookById(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
    },
  });

  if (!isLoading) {
    console.log("data", data);
  }

  const handleEdit = (e: Event, bookId: string) => {
    e.stopPropagation();
    navigate(`/dashboard/books/update/${bookId}`);
    console.log("Edit Book");
  };

  const handleDelete = (e: React.MouseEvent, bookId?: string) => {
    e.stopPropagation();
    if (!bookId) {
      console.error("bookId is undefined");
      return;
    }

    deleteMutation.mutate(bookId);
  };

  const handleShare = (e: React.MouseEvent, book: Book) => {
    e.stopPropagation();
    const bookUrl = `${window.location.origin}/dashboard/books/${book._id}`;
    if (navigator.share) {
      navigator
        .share({
          title: book.title,
          text: `Check out this book: ${book.title} by ${book?.author.name}`,
          url: bookUrl,
        })
        .then(() => console.log("Share successful"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      copyToClipboard(bookUrl);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Books</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Link to={"/dashboard/books/create"}>
          <Button>
            <CirclePlus size={20} />
            <span className="ml-2">Add Book</span>
          </Button>
        </Link>
      </div>
      <Card className="">
        <CardHeader>
          <CardTitle>Books</CardTitle>
          <CardDescription>
            Manage your books and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead className="hidden md:table-cell">
                  Author Name
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((book: Book) => {
                return (
                  <Link
                    to={`/dashboard/books/${book._id}`}
                    key={book._id}
                    className="contents"
                  >
                    <TableRow>
                      <TableCell className="hidden sm:table-cell hover:cursor-pointer">
                        <img
                          alt={book.title}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={book.coverImage}
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium hover:cursor-pointer">
                        {book.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{book.genre}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {book?.author.name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {book.createdAt}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={(e: Event) => {
                                handleEdit(e, book._id);
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e: React.MouseEvent) =>
                                handleShare(e, book)
                              }
                            >
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e: Event) => handleDelete(e, book._id)}
                            >
                              {deleteMutation.isPending ? (
                                <span>Deleting...</span>
                              ) : (
                                <span>Delete</span>
                              )}
                              {deleteMutation.isPending && (
                                <LoaderCircle className="animate-spin ml-2" />
                              )}
                              {/* Show loading spinner */}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </Link>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default BooksPage;
