// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import BookList from "./features/books/BookList";
import BookForm from "./features/books/BookForm";
import BorrowForm from "./features/borrows/BorrowForm";
import BorrowSummary from "./features/borrows/BorrowSummary";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import ViewBook from "./features/books/viewBook";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="books" element={<BookList />} />
        <Route path="create-book" element={<BookForm />} />
        <Route path="edit-book/:id" element={<BookForm />} />
        <Route path="view-book/:id" element={<ViewBook />} />
        <Route path="borrow/:bookId" element={<BorrowForm />} />
        <Route path="borrow-summary" element={<BorrowSummary />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
