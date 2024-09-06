import { getBooksById } from "@/http/api";
import { Book } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const DownloadButton = ({ fileLink }: { fileLink: string }) => {
  const handleDownload = () => {
    window.open(fileLink, "_blank");
  };

  return (
    <button
      onClick={handleDownload}
      className="text-white bg-blue-500 px-4 py-2 rounded-md"
    >
      Download
    </button>
  );
};

const BookInfo = () => {
  const { bookId } = useParams<{ bookId: string }>();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: book,
    isLoading,
    isError,
    error,
  } = useQuery<Book>({
    queryKey: ["book", bookId],
    queryFn: () => getBooksById(bookId!),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message}</p>;
  }

  if (!book) {
    return <p>No book found</p>;
  }

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <img
            src={book.coverImage}
            alt={book.title}
            className="rounded-md object-cover"
            width="200"
            height="300"
          />
          <div>
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <p className="text-lg font-medium">by {book.author.name}</p>
            <p className="text-sm italic text-gray-600">
              Published on: {new Date(book.createdAt).toLocaleDateString()}
            </p>
            <div className="mt-2">
              <span className="inline-block bg-blue-100 text-blue-600 px-2 py-1 rounded">
                {book.genre}
              </span>
            </div>
            <p className="mt-4">{book.description}</p>

            <div className="mt-4 flex gap-2">
              <DownloadButton fileLink={book.file} />
              {/* Add more actions like Edit here if necessary */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookInfo;
