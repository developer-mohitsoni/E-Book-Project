import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBooks } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { Book } from "@/types";

const HomePage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading books</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to E-Book Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((book: Book) => (
          <Card key={book._id} className="w-full shadow-md">
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
              <CardDescription>by {book.author.name}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-start">
              <div className="w-full h-60 relative overflow-hidden rounded-md mb-4">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-full flex justify-center mb-4">
                <span className="bg-black text-white text-sm font-medium px-3 py-1 rounded-full">
                  {book.genre}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
