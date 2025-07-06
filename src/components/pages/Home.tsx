// src/pages/Home.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, PlusCircle, ListChecks } from "lucide-react";
import BookList from "@/features/books/BookList";

export default function Home() {
  return (
    <section className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-4">
        Welcome to MyLibrary 📚
      </h1>
      <p className="text-zinc-300 mb-8 text-lg max-w-xl mx-auto">
        Manage your books, track borrowings, and keep your collection organized — all in one place.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
        <Button variant="default" className="bg-purple-600 hover:bg-purple-700" asChild>
          <Link to="/books">
            <BookOpen className="mr-2" size={18} />
            View All Books
          </Link>
        </Button>

        <Button variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-800" asChild>
          <Link to="/create-book">
            <PlusCircle className="mr-2" size={18} />
            Add New Book
          </Link>
        </Button>

        <Button variant="ghost" className="text-zinc-300 hover:text-purple-600" asChild>
          <Link to="/borrow-summary">
            <ListChecks className="mr-2" size={18} />
            Borrow Summary
          </Link>
        </Button>
      </div>

      {/* BookList Preview Section */}
      <div className="text-left mt-12 max-w-6xl mx-auto">
        <BookList />
      </div>
    </section>
  );
}
