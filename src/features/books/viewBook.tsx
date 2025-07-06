
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBookByIdQuery } from './booksApi';

export default function ViewBook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: book, isLoading, error } = useGetBookByIdQuery(id!);

  if (isLoading)
    return <p className="text-center mt-10 text-gray-400">Loading book details...</p>;

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load book details. Please try again later.
      </p>
    );

  if (!book)
    return <p className="text-center mt-10 text-yellow-400">Book not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-zinc-900 text-white rounded-md shadow-md mt-6">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Copies:</strong> {book.copies}</p>
      <p><strong>Available:</strong> {book.available ? "Yes" : "No"}</p>
      <p className="mt-4 whitespace-pre-wrap">{book.description}</p>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
      >
        Back
      </button>
    </div>
  );
}
