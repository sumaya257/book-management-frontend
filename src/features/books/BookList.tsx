import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Trash2,
  Pencil,
  BookOpen,
  Eye
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useDeleteBookMutation, useGetBooksQuery } from "./booksApi";
import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type Book = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
};

export default function BookList() {
  const { data: books = [], error, isLoading } = useGetBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [deleteBook] = useDeleteBookMutation();
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const navigate = useNavigate();

  if (isLoading) return <p className="text-center text-purple-300">Loading books...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-purple-400">📚 Book List</h1>

      {/* backend error alert */}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load books. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      <div className="overflow-x-auto rounded-lg border border-zinc-700">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-400 text-white">
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Available</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {books.map((book: Book) => (
              <TableRow key={book._id} className="hover:bg-zinc-800">
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell>{book.available ? "Yes" : "No"}</TableCell>
                <TableCell className="flex flex-wrap justify-center gap-2">
                  {/* Edit */}
                  <Button
                    size="icon"
                    className="bg-zinc-700 hover:bg-zinc-600 text-white"
                    onClick={() => navigate(`/edit-book/${book._id}`)}
                  >
                    <Pencil size={16} />
                  </Button>

                  {/* View */}
                  <Button
                    size="icon"
                    className="bg-blue-700 hover:bg-blue-600 text-white"
                    onClick={() => navigate(`/view-book/${book._id}`)}
                  >
                    <Eye size={16} />
                  </Button>

                  {/* Borrow */}
                  <Button
                    size="icon"
                    className={`text-white ${book.copies === 0 ? "bg-gray-500 cursor-not-allowed" : "bg-emerald-700 hover:bg-emerald-600"}`}
                    onClick={() => navigate(`/borrow/${book._id}`)}
                    disabled={book.copies === 0}
                  >
                    <BookOpen size={16} />
                  </Button>


                  {/* Delete Confirmation Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => setSelectedBookId(book._id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-zinc-900 border-zinc-700">
                      <DialogHeader>
                        <DialogTitle className="text-red-600">Are you sure?</DialogTitle>
                      </DialogHeader>
                      <p className="text-zinc-300 text-sm">
                        This action will permanently delete the book.
                      </p>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedBookId(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            if (selectedBookId) {
                              deleteBook(selectedBookId);
                              setSelectedBookId(null);
                            }
                          }}
                        >
                          Confirm Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
