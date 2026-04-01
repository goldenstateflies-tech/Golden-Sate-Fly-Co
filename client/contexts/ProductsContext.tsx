import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface Product {
  id: string;
  name: string;
  price: string;
  description?: string;
  badge?: string | null;
  image?: string;
  gallery?: string[];
  stock?: number;
}

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: string, product: Omit<Product, "id">) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  buyProduct: (id: string, quantity: number) => Promise<boolean>;
  isLoading: boolean;
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
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeDatabase();
  }, []);

  const initializeDatabase = async () => {
    try {
      // Check if products table exists and has data
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(1);

      if (error) {
        console.log("Creating products table...");
        // If table doesn't exist, create it with default products
        await createProductsTable();
      } else if (data && data.length > 0) {
        // Table exists and has data, use it
        subscribeToProducts();
      } else {
        // Table exists but is empty, seed with defaults
        await seedDefaultProducts();
        subscribeToProducts();
      }
    } catch (err) {
      console.error("Database initialization error:", err);
      // Fallback to localStorage
      loadFromLocalStorage();
    }
  };

  const createProductsTable = async () => {
    try {
      // Try to seed with default products
      await seedDefaultProducts();
      subscribeToProducts();
    } catch (err) {
      console.error("Error creating products:", err);
      loadFromLocalStorage();
    }
  };

  const seedDefaultProducts = async () => {
    try {
      const { error } = await supabase.from("products").insert(DEFAULT_PRODUCTS);
      if (error) throw error;
      setProducts(DEFAULT_PRODUCTS);
    } catch (err) {
      console.error("Error seeding default products:", err);
      loadFromLocalStorage();
    }
  };

  const subscribeToProducts = () => {
    try {
      // Initial load
      supabase
        .from("products")
        .select("*")
        .then(({ data, error }) => {
          if (error) throw error;
          if (data) {
            setProducts(data as Product[]);
            setIsLoading(false);
          }
        });

      // Subscribe to real-time changes
      const subscription = supabase
        .channel("products")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "products" },
          (payload) => {
            if (payload.eventType === "INSERT") {
              setProducts((prev) => [...prev, payload.new as Product]);
            } else if (payload.eventType === "UPDATE") {
              setProducts((prev) =>
                prev.map((p) =>
                  p.id === (payload.new as Product).id
                    ? (payload.new as Product)
                    : p
                )
              );
            } else if (payload.eventType === "DELETE") {
              setProducts((prev) =>
                prev.filter((p) => p.id !== (payload.old as Product).id)
              );
            }
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    } catch (err) {
      console.error("Error subscribing to products:", err);
      setIsLoading(false);
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem("gsProducts");
      const data = stored ? JSON.parse(stored) : DEFAULT_PRODUCTS;
      setProducts(data);
    } catch (err) {
      setProducts(DEFAULT_PRODUCTS);
    }
    setIsLoading(false);
  };

  const addProduct = async (product: Omit<Product, "id">) => {
    try {
      const newProduct = {
        ...product,
        id: Date.now().toString(),
      };

      const { error } = await supabase
        .from("products")
        .insert([newProduct]);

      if (error) throw error;
    } catch (err) {
      console.error("Error adding product:", err);
      // Fallback to localStorage
      const newProduct = { ...product, id: Date.now().toString() };
      setProducts((prev) => [...prev, newProduct]);
      localStorage.setItem(
        "gsProducts",
        JSON.stringify([...products, newProduct])
      );
    }
  };

  const updateProduct = async (id: string, product: Omit<Product, "id">) => {
    try {
      const { error } = await supabase
        .from("products")
        .update(product)
        .eq("id", id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updating product:", err);
      // Fallback to localStorage
      const updated = products.map((p) =>
        p.id === id ? { ...product, id } : p
      );
      setProducts(updated);
      localStorage.setItem("gsProducts", JSON.stringify(updated));
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) throw error;
    } catch (err) {
      console.error("Error deleting product:", err);
      // Fallback to localStorage
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      localStorage.setItem("gsProducts", JSON.stringify(updated));
    }
  };

  const buyProduct = async (id: string, quantity: number): Promise<boolean> => {
    try {
      const product = products.find((p) => p.id === id);
      if (!product || !product.stock || product.stock < quantity) {
        return false;
      }

      const newStock = product.stock - quantity;
      const { error } = await supabase
        .from("products")
        .update({ stock: newStock })
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (err) {
      console.error("Error buying product:", err);
      return false;
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        buyProduct,
        isLoading,
      }}
    >
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
