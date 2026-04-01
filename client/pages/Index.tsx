import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { useProducts } from "@/contexts/ProductsContext";

const productImages = {
  "Parachute Adams": "linear-gradient(135deg, #8B7355 0%, #654321 100%)",
  "Elk Hair Caddis": "linear-gradient(135deg, #CD853F 0%, #A0522D 100%)",
  "Woolly Bugger Assortment": "linear-gradient(135deg, #2F4F4F 0%, #1C1C1C 100%)",
  "Royal Wulff Pack": "linear-gradient(135deg, #DC143C 0%, #8B0000 100%)",
};

export default function Index() {
  const { products, isLoading } = useProducts();
  const defaultImages: { [key: string]: string } = {
    ...productImages,
  };

  const getImageForProduct = (name: string) => {
    return defaultImages[name] || "linear-gradient(135deg, #8B7355 0%, #654321 100%)";
  };

  const testimonials = [
    {
      name: "Mike Rodriguez",
      text: "These flies have transformed my dry fly fishing. Caught more trout in a week than all of last month.",
      rating: 5,
    },
    {
      name: "Sarah Chen",
      text: "The attention to detail is incredible. Every fly is perfectly weighted and tied. Worth every penny.",
      rating: 5,
    },
    {
      name: "Tom Williams",
      text: "Golden State Fly Co. is now my only source. These are the best hand-tied flies I've ever used on the water.",
      rating: 5,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-block mb-4 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                <span className="text-sm font-medium text-primary">✨ New Collection Available</span>
              </div>
              
              <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Golden State
                <span className="block text-primary">Fly Co.</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                Hand-tied fishing flies crafted with precision and passion. Premium materials and expert craftsmanship for the discerning angler in California and beyond.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="animate-slide-up relative h-96 md:h-full flex items-center justify-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Ff1249bb6ca8c47b98bb5431c04b7046e%2F6a92d43dc9c548f28362cbdd1fc0a3c7?format=webp&width=800&height=1200"
                alt="Golden State Fly Co. Logo"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured Collection
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover our most sought-after pieces
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, idx) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group cursor-pointer animate-fade-in hover:shadow-lg transition-shadow rounded-xl overflow-hidden"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div
                  className="relative h-64 rounded-xl mb-4 overflow-hidden bg-cover bg-center"
                  style={{
                    backgroundImage: product.image
                      ? `url(${product.image})`
                      : `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="${getImageForProduct(product.name).split("(")[1]?.split("%")[0] || "%23999"}" width="100" height="100"/></svg>')`,
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
                  <p className="text-primary font-semibold">{product.price}</p>
                  {product.stock !== undefined && (
                    <p className="text-xs text-muted-foreground">
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
          )}

          <div className="mt-12 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-12 text-center">
            Why Choose Golden State Fly Co.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-primary/20 flex items-center justify-center">
                <span className="text-3xl">🎣</span>
              </div>
              <h3 className="font-display font-bold text-lg mb-3">Expert Crafted</h3>
              <p className="text-secondary-foreground/80">
                Hand-tied by experienced fly tiers with decades of angling knowledge
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-primary/20 flex items-center justify-center">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-display font-bold text-lg mb-3">Premium Materials</h3>
              <p className="text-secondary-foreground/80">
                Only the finest fur, feathers, and thread for maximum durability and action
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-primary/20 flex items-center justify-center">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="font-display font-bold text-lg mb-3">Fast Delivery</h3>
              <p className="text-secondary-foreground/80">
                Quick shipping so you can get on the water faster
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
            Loved by Our Community
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl font-bold text-primary-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Get new fly patterns, seasonal tips, and exclusive subscriber discounts delivered to your inbox
            </p>

            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-foreground text-primary font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>

            <p className="text-xs text-primary-foreground/70 mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
