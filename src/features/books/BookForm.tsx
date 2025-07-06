/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useAddBookMutation,
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "./booksApi";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";  // <-- import toast from sonner

type BookFormType = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
};

export default function BookForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetBookByIdQuery(id!, { skip: !id });
  const [addBook] = useAddBookMutation();
  const [updateBook] = useUpdateBookMutation();

  const [form, setForm] = useState<BookFormType>({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
  });

  useEffect(() => {
    if (data) {
      setForm({
        title: data.title,
        author: data.author,
        genre: data.genre,
        isbn: data.isbn,
        description: data.description,
        copies: data.copies,
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bookToSubmit = {
      ...form,
      available: form.copies > 0,
    };

    try {
      if (id) {
        await updateBook({ id, ...bookToSubmit }).unwrap();
        toast.success(`Book "${form.title}" updated successfully!`);
      } else {
        await addBook(bookToSubmit).unwrap();
        toast.success(`Book "${form.title}" added successfully!`);
      }
      navigate("/books");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 max-w-lg mx-auto p-6 bg-zinc-900 text-white rounded-lg border border-zinc-700 shadow"
    >
      <h2 className="text-2xl font-semibold text-purple-400 text-center">
        {id ? "Update Book" : "Add New Book"}
      </h2>

      {/* Title */}
      <div className="grid gap-1">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter title"
          className="bg-zinc-800 text-white"
          required
        />
      </div>

      {/* Author */}
      <div className="grid gap-1">
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Enter author"
          className="bg-zinc-800 text-white"
          required
        />
      </div>

      {/* Genre */}
      <div className="grid gap-1">
        <Label htmlFor="genre">Genre</Label>
        <Input
          id="genre"
          name="genre"
          value={form.genre}
          onChange={handleChange}
          placeholder="Enter genre"
          className="bg-zinc-800 text-white"
          required
        />
      </div>

      {/* ISBN */}
      <div className="grid gap-1">
        <Label htmlFor="isbn">ISBN</Label>
        <Input
          id="isbn"
          name="isbn"
          value={form.isbn}
          onChange={handleChange}
          placeholder="Enter ISBN"
          className="bg-zinc-800 text-white"
          required
        />
      </div>

      {/* Description */}
      <div className="grid gap-1">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter description"
          className="bg-zinc-800 text-white"
          rows={4}
          required
        />
      </div>

      {/* Copies */}
      <div className="grid gap-1">
        <Label htmlFor="copies">Copies</Label>
        <Input
          id="copies"
          name="copies"
          type="number"
          value={form.copies}
          onChange={handleChange}
          min={0}
          className="bg-zinc-800 text-white"
          required
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="mt-2 bg-purple-700 hover:bg-purple-600">
        {id ? "Update Book" : "Add Book"}
      </Button>
    </form>
  );
}
