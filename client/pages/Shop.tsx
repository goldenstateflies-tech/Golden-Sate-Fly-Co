import Layout from "@/components/Layout";
import { useProducts } from "@/contexts/ProductsContext";

const productImages = {
  "Parachute Adams": "linear-gradient(135deg, #8B7355 0%, #654321 100%)",
  "Elk Hair Caddis": "linear-gradient(135deg, #CD853F 0%, #A0522D 100%)",
  "Woolly Bugger Assortment": "linear-gradient(135deg, #2F4F4F 0%, #1C1C1C 100%)",
  "Royal Wulff Pack": "linear-gradient(135deg, #DC143C 0%, #8B0000 100%)",
};

export default function Shop() {
  const { products } = useProducts();
  const defaultImages: { [key: string]: string } = {
    ...productImages,
  };

  const getImageForProduct = (name: string) => {
    return defaultImages[name] || "linear-gradient(135deg, #8B7355 0%, #654321 100%)";
  };

  return (
    <Layout>
      <section className="py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="font-display text-5xl font-bold text-foreground mb-4">
              Shop All Flies
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse our complete selection of hand-tied fishing flies
            </p>
          </div>

          {products.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-4xl">🛍️</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                No Products Available
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Check back soon for our fly selection!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, idx) => (
                <div
                  key={product.id}
                  className="group cursor-pointer hover:shadow-lg transition-shadow rounded-xl overflow-hidden"
                >
                  <div
                    className="relative h-64 rounded-xl mb-4 overflow-hidden bg-cover bg-center"
                    style={{
                      backgroundImage: product.image
                        ? `url(${product.image})`
                        : `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100"/></svg>')`,
                      backgroundColor: getImageForProduct(product.name),
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    {product.badge && (
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                        {product.badge}
                      </div>
                    )}
                    {product.stock !== undefined && product.stock < 10 && product.stock > 0 && (
                      <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Low Stock
                      </div>
                    )}
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white font-semibold bg-destructive px-4 py-2 rounded">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    )}
                    <p className="text-primary font-semibold">{product.price}</p>
                    {product.stock !== undefined && (
                      <p className="text-xs text-muted-foreground">
                        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
