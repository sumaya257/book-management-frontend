/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from "react-router-dom";
import { useCreateBorrowMutation } from "./borrowApi";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

type BorrowFormType = {
  quantity: number;
  dueDate: string;
};

export default function BorrowForm() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const [createBorrow, { isLoading }] = useCreateBorrowMutation();

  const [form, setForm] = useState<BorrowFormType>({
    quantity: 1,
    dueDate: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!bookId) {
      setError("Book ID is missing.");
      return;
    }

    try {
      await createBorrow({ bookId, ...form }).unwrap();
      toast.success("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch (err: any) {
      const message = err?.data?.message || "Something went wrong.";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto grid gap-4 bg-zinc-900 p-6 rounded-lg border border-zinc-700 shadow-md"
    >
      <h2 className="text-2xl font-semibold text-purple-400">Borrow Book</h2>

      <div className="grid gap-2">
        <Label htmlFor="quantity" className="text-white">
          Quantity
        </Label>
        <Input
          id="quantity"
          type="number"
          name="quantity"
          min={1}
          value={form.quantity}
          onChange={handleChange}
          className="bg-zinc-800 text-white"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="dueDate" className="text-white">
          Due Date
        </Label>
        <Input
          id="dueDate"
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="bg-zinc-800 text-white"
          required
        />
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white"
      >
        {isLoading ? "Borrowing..." : "Borrow"}
      </Button>
    </form>
  );
}
