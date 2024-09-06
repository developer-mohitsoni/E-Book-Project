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
  CardFooter,
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
import { getBooks } from "@/http/api";
import { Book } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { CirclePlus, Key, MoreHorizontal } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const BooksPage = () => {
  //todo: add loading spinner and error message
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  if (!isLoading) {
    console.log("data", data);
  }

  const handleEdit = (e: Event, bookId: string) => {
    e.stopPropagation();
    // navigate(`/dashboard/books/update/${bookId}`);
    console.log("Edit Book");
  };

  const handleDelete = (e: Event, bookId: string) => {
    e.stopPropagation();
    // navigate(`/dashboard/books/${bookId}`);
    console.log("Delete Book");
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
                        {book.author.name}
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
                            <DropdownMenuItem onClick={handleDelete}>
                              Delete
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
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default BooksPage;
