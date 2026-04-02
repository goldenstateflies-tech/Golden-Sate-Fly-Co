import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="border-b border-border bg-background sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Ff1249bb6ca8c47b98bb5431c04b7046e%2F6a92d43dc9c548f28362cbdd1fc0a3c7?format=webp&width=800&height=1200"
            alt="Golden State Fly Co."
            className="w-10 h-10 object-contain"
          />
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
          <Link
            to="/cart"
            className="relative w-10 h-10 rounded-lg border border-border hover:bg-muted transition-colors flex items-center justify-center"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <Link
            to="/admin/login"
            className="px-3 py-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            title="Admin Panel"
          >
            ⚙️
          </Link>
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
