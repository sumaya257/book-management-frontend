
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="bg-zinc-800 border-b border-zinc-700">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-purple-400">
          📚 MyLibrary
        </Link>
        <nav className="flex gap-2">
          <NavLink to="/books">
            {({ isActive }) => (
              <Button variant={isActive ? "default" : "ghost"} className="text-white">
                All Books
              </Button>
            )}
          </NavLink>
          <NavLink to="/create-book">
            {({ isActive }) => (
              <Button variant={isActive ? "default" : "ghost"} className="text-white">
                Add Book
              </Button>
            )}
          </NavLink>
          <NavLink to="/borrow-summary">
            {({ isActive }) => (
              <Button variant={isActive ? "default" : "ghost"} className="text-white">
                Borrow Summary
              </Button>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
