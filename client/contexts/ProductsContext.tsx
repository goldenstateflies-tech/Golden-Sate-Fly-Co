import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface Product {
  id: string;
  name: string;
  price: string;
  description?: string;
  badge?: string | null;
  image?: string; // main/cover image
  gallery?: string[]; // additional gallery images
  stock?: number;
}

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Omit<Product, "id">) => void;
  deleteProduct: (id: string) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Parachute Adams",
    price: "$2.99",
    description: "Classic dry fly pattern",
    badge: "Best Seller",
    stock: 45,
    gallery: [],
  },
  {
    id: "2",
    name: "Elk Hair Caddis",
    price: "$3.49",
    description: "Excellent caddis imitation",
    badge: "New",
    stock: 32,
    gallery: [],
  },
  {
    id: "3",
    name: "Woolly Bugger Assortment",
    price: "$12.99",
    description: "Versatile nymph patterns",
    badge: "Premium",
    stock: 18,
    gallery: [],
  },
  {
    id: "4",
    name: "Royal Wulff Pack",
    price: "$8.99",
    description: "Dry fly assortment",
    badge: null,
    stock: 27,
    gallery: [],
  },
];

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem("gsProducts");
    return stored ? JSON.parse(stored) : DEFAULT_PRODUCTS;
  });

  // Persist to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("gsProducts", JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, product: Omit<Product, "id">) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...product, id } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}
