import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="border-b border-border bg-background sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
            <span className="font-display font-bold text-primary-foreground text-lg">GS</span>
          </div>
          <span className="hidden sm:inline font-display font-bold text-lg text-foreground">Golden State Fly Co.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium text-sm">
            Home
          </Link>
          <Link to="/shop" className="text-foreground hover:text-primary transition-colors font-medium text-sm">
            Shop
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium text-sm">
            About
          </Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium text-sm">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button className="w-10 h-10 rounded-lg border border-border hover:bg-muted transition-colors flex items-center justify-center">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 17l-4 4m0 0l-4-4m4 4V3"
              />
            </svg>
          </button>
          <button className="w-10 h-10 rounded-lg border border-border hover:bg-muted transition-colors flex items-center justify-center">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden w-10 h-10 rounded-lg border border-border hover:bg-muted transition-colors flex items-center justify-center"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3">
          <Link
            to="/"
            className="block text-foreground hover:text-primary transition-colors font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="block text-foreground hover:text-primary transition-colors font-medium"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="block text-foreground hover:text-primary transition-colors font-medium"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block text-foreground hover:text-primary transition-colors font-medium"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
